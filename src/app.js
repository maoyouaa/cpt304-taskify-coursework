const express = require("express");
const path = require("path");
require("dotenv").config();
const { urlencoded } = express;

const viewsPath = path.join(__dirname, "../views");
const staticPath = path.join(__dirname, "../static");
const app = express();
const port = process.env.PORT || 3000;

app.use("/static", express.static(staticPath));
app.use(express.json());
app.use(urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", viewsPath);
app.locals.appName = "Taskify";

app.get("/", (req, res) => {
  res.status(200).render("index", {
    pageTitle: "Taskify | Plan calmer workdays",
    pageName: "home",
  });
});

app.get("/signup", (req, res) => {
  res.status(200).render("signup", {
    pageTitle: "Taskify | Start your workspace",
    pageName: "signup",
  });
});

app.get("/dashboard", (req, res) => {
  res.status(200).render("dashboard/dashboard", {
    pageTitle: "Taskify | Team dashboard",
    pageName: "dashboard",
    maxTitleLength: 80,
    maxDetailsLength: 240,
    notice: req.query.notice || "",
  });
});

app.post("/signup", (req, res) => {
  res.redirect(303, "/dashboard?notice=welcome");
});

app.post("/login", (req, res) => {
  res.redirect(303, "/dashboard?notice=back");
});

app.get("/privacy", (req, res) => {
  res.status(200).render("privacy", {
    pageTitle: "Taskify | Privacy policy",
    pageName: "privacy",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
  });
}

module.exports = app;
