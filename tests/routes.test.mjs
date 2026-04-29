import assert from "node:assert/strict";
import test from "node:test";
import request from "supertest";
import app from "../src/app.js";

test("renders the home page", async () => {
  const response = await request(app).get("/");
  assert.equal(response.status, 200);
  assert.match(response.text, /Taskify/);
  assert.match(response.text, /\/dashboard/);
});

test("renders the dashboard and privacy pages", async () => {
  const dashboard = await request(app).get("/dashboard");
  const privacy = await request(app).get("/privacy");

  assert.equal(dashboard.status, 200);
  assert.match(dashboard.text, /task-form/);
  assert.equal(privacy.status, 200);
  assert.match(privacy.text, /Privacy/i);
});

test("redirects signup and login flows to the dashboard", async () => {
  const signup = await request(app).post("/signup").send({ email: "student@example.com" });
  const login = await request(app).post("/login").send({ email: "student@example.com", password: "password123" });

  assert.equal(signup.status, 303);
  assert.match(signup.headers.location, /\/dashboard/);
  assert.equal(login.status, 303);
  assert.match(login.headers.location, /\/dashboard/);
});

test("exposes a health endpoint", async () => {
  const response = await request(app).get("/api/health");
  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { status: "ok" });
});
