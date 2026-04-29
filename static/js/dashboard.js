import "./site.js";
import { DEFAULT_LOCALE, getStoredLocale, t } from "./modules/i18n.mjs";
import {
  createTask,
  deleteTask,
  filterTasks,
  getMetrics,
  groupTasks,
  isDuplicateTask,
  persistTasks,
  safeLoadTasks,
  updateTaskStatus,
  upsertTask,
} from "./modules/task-store.mjs";

const limits = window.TASKIFY_BOOTSTRAP || { maxTitleLength: 80, maxDetailsLength: 240 };
const form = document.getElementById("task-form");
const boardGrid = document.getElementById("board-grid");
const message = document.getElementById("form-message");
const submitButton = document.getElementById("submit-button");
const resetButton = document.getElementById("reset-button");
const metrics = {
  total: document.getElementById("metric-total"),
  progress: document.getElementById("metric-progress"),
  completed: document.getElementById("metric-completed"),
};
const filtersForm = document.getElementById("filter-form");

let state = {
  tasks: [],
  filters: { search: "", status: "all", priority: "all" },
  locale: getStoredLocale(window.localStorage) || DEFAULT_LOCALE,
};

function showMessage(key, tone = "neutral") {
  if (!message) {
    return;
  }

  message.textContent = t(state.locale, key);
  message.classList.toggle("is-error", tone === "error");
}

function fillForm(task) {
  form.elements.taskId.value = task?.id || "";
  form.elements.title.value = task?.title || "";
  form.elements.details.value = task?.details || "";
  form.elements.status.value = task?.status || "todo";
  form.elements.priority.value = task?.priority || "high";
  form.elements.owner.value = task?.owner || "";
  form.elements.dueDate.value = task?.dueDate || "";
  submitButton.textContent = task ? t(state.locale, "dashboard.updateButton") : t(state.locale, "dashboard.submitButton");
}

function resetForm() {
  form.reset();
  form.elements.taskId.value = "";
  form.elements.status.value = "todo";
  form.elements.priority.value = "high";
  submitButton.textContent = t(state.locale, "dashboard.submitButton");
}

function createActionButton(labelKey, handler) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = labelKey === "dashboard.delete" ? "text-button" : "ghost-button";
  button.textContent = t(state.locale, labelKey);
  button.addEventListener("click", handler);
  return button;
}

function renderTask(task) {
  const card = document.createElement("article");
  card.className = "task-card";

  const header = document.createElement("div");
  header.className = "task-card-header";

  const title = document.createElement("h3");
  title.textContent = task.title;

  const priority = document.createElement("span");
  priority.className = `priority-chip priority-${task.priority}`;
  priority.textContent = t(state.locale, `priority.${task.priority}`);

  header.append(title, priority);

  const details = document.createElement("p");
  details.textContent = task.details || " ";

  const meta = document.createElement("div");
  meta.className = "task-meta";

  if (task.owner) {
    const owner = document.createElement("span");
    owner.textContent = `${t(state.locale, "dashboard.ownerLabel")}: ${task.owner}`;
    meta.appendChild(owner);
  }

  if (task.dueDate) {
    const due = document.createElement("span");
    due.textContent = `${t(state.locale, "dashboard.dateLabel")}: ${task.dueDate}`;
    meta.appendChild(due);
  }

  const actions = document.createElement("div");
  actions.className = "task-actions";

  actions.append(
    createActionButton("dashboard.edit", () => {
      fillForm(task);
      form.elements.title.focus();
      showMessage("dashboard.formMessageUpdated");
    })
  );

  if (task.status === "todo") {
    actions.append(
      createActionButton("dashboard.moveToDoing", async () => {
        await moveTask(task.id, "doing", "dashboard.formMessageStatusDoing");
      })
    );
  }

  if (task.status === "doing") {
    actions.append(
      createActionButton("dashboard.moveToDone", async () => {
        await moveTask(task.id, "done", "dashboard.formMessageStatusDone");
      })
    );
  }

  if (task.status === "done") {
    actions.append(
      createActionButton("dashboard.moveToTodo", async () => {
        await moveTask(task.id, "todo", "dashboard.formMessageStatusTodo");
      })
    );
  }

  actions.append(
    createActionButton("dashboard.delete", async () => {
      const next = deleteTask(state.tasks, task.id);
      await saveTasks(next, "dashboard.formMessageDeleted");
      if (form.elements.taskId.value === task.id) {
        resetForm();
      }
    })
  );

  card.append(header, details, meta, actions);
  return card;
}

function renderBoard() {
  const filtered = filterTasks(state.tasks, state.filters);
  const grouped = groupTasks(filtered);
  const columns = [
    { key: "todo", label: "dashboard.columnTodo" },
    { key: "doing", label: "dashboard.columnDoing" },
    { key: "done", label: "dashboard.columnDone" },
  ];

  boardGrid.replaceChildren();

  columns.forEach((column) => {
    const section = document.createElement("section");
    section.className = "board-column";
    section.setAttribute("aria-labelledby", `${column.key}-heading`);

    const header = document.createElement("div");
    header.className = "column-header";

    const heading = document.createElement("h2");
    heading.id = `${column.key}-heading`;
    heading.textContent = t(state.locale, column.label);

    const count = document.createElement("span");
    count.className = "column-count";
    count.textContent = String(grouped[column.key].length);

    header.append(heading, count);
    section.appendChild(header);

    if (grouped[column.key].length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = t(state.locale, "dashboard.emptyState");
      section.appendChild(empty);
    } else {
      grouped[column.key].forEach((task) => section.appendChild(renderTask(task)));
    }

    boardGrid.appendChild(section);
  });

  const metricState = getMetrics(state.tasks);
  metrics.total.textContent = String(metricState.total);
  metrics.progress.textContent = String(metricState.doing);
  metrics.completed.textContent = String(metricState.done);
}

async function saveTasks(tasks, messageKey) {
  try {
    submitButton.disabled = true;
    resetButton.disabled = true;
    await new Promise((resolve) => window.setTimeout(resolve, 120));
    persistTasks(window.localStorage, tasks);
    state.tasks = tasks;
    renderBoard();
    showMessage(messageKey);
  } catch (error) {
    showMessage("dashboard.formMessagePersistenceError", "error");
  } finally {
    submitButton.disabled = false;
    resetButton.disabled = false;
  }
}

async function moveTask(taskId, nextStatus, messageKey) {
  const nextTasks = updateTaskStatus(state.tasks, taskId, nextStatus);
  await saveTasks(nextTasks, messageKey);
}

function handleFilterChange() {
  state.filters = {
    search: filtersForm.elements.search.value,
    status: filtersForm.elements.status.value,
    priority: filtersForm.elements.priority.value,
  };
  renderBoard();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const created = createTask(
    {
      id: form.elements.taskId.value || undefined,
      createdAt: state.tasks.find((task) => task.id === form.elements.taskId.value)?.createdAt,
      title: form.elements.title.value,
      details: form.elements.details.value,
      status: form.elements.status.value,
      priority: form.elements.priority.value,
      owner: form.elements.owner.value,
      dueDate: form.elements.dueDate.value,
    },
    limits
  );

  if (!created.ok) {
    showMessage("dashboard.formMessageInvalid", "error");
    form.elements.title.focus();
    return;
  }

  if (isDuplicateTask(state.tasks, created.value)) {
    showMessage("dashboard.formMessageDuplicate", "error");
    return;
  }

  const isEditing = Boolean(form.elements.taskId.value);
  const nextTasks = upsertTask(state.tasks, created.value);
  await saveTasks(nextTasks, isEditing ? "dashboard.formMessageUpdated" : "dashboard.formMessageSaved");
  resetForm();
});

resetButton.addEventListener("click", () => {
  resetForm();
  showMessage("dashboard.formMessageReset");
});

filtersForm.addEventListener("input", handleFilterChange);
filtersForm.addEventListener("change", handleFilterChange);

window.addEventListener("taskify:locale-change", (event) => {
  state.locale = event.detail || DEFAULT_LOCALE;
  renderBoard();
  showMessage("dashboard.formMessageReset");
});

const loaded = safeLoadTasks(window.localStorage);
state.tasks = loaded.tasks;
if (!loaded.ok) {
  showMessage("dashboard.formMessageLoadError", "error");
}
renderBoard();
resetForm();
