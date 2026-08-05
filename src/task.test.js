const request = require("supertest");
const app = require("./app");

describe("Health Check API", () => {
  test("GET /health should return status OK", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Task Manager API is running",
      status: "OK"
    });
  });
});

describe("Task API", () => {
  test("POST /tasks should create a new task", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({
        title: "Learn Jest",
        description: "Write automated tests"
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe("Learn Jest");
    expect(response.body.description).toBe("Write automated tests");
    expect(response.body.completed).toBe(false);
  });

  test("GET /tasks should return all tasks", async () => {
    const response = await request(app).get("/tasks");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

test("GET /tasks/:id should return a task", async () => {
  // Create a task first
  const createResponse = await request(app)
    .post("/tasks")
    .send({
      title: "Read API Docs",
      description: "Testing GET by ID"
    });

  // Save the new task's ID
  const taskId = createResponse.body._id;

  // Retrieve the task using its ID
  const response = await request(app).get(`/tasks/${taskId}`);

  expect(response.statusCode).toBe(200);
  expect(response.body._id).toBe(taskId);
  expect(response.body.title).toBe("Read API Docs"); 
 });

test("PUT /tasks/:id should update a task", async () => {
  // Create a task first
  const createResponse = await request(app)
    .post("/tasks")
    .send({
      title: "Old Title",
      description: "Old Description"
    });

  // Save the task ID
  const taskId = createResponse.body._id;

  // Update the task
  const response = await request(app)
    .put(`/tasks/${taskId}`)
    .send({
      title: "New Title",
      completed: true
    });

  // Verify the response
  expect(response.statusCode).toBe(200);
  expect(response.body.title).toBe("New Title");
  expect(response.body.completed).toBe(true);
 });

  test("DELETE /tasks/:id should delete a task", async () => {
  // Create a task
  const createResponse = await request(app)
    .post("/tasks")
    .send({
      title: "Delete Me",
      description: "This task will be deleted"
    });

  // Save its ID
  const taskId = createResponse.body._id;

  // Delete the task
  const response = await request(app)
    .delete(`/tasks/${taskId}`);

  // Verify the response
  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body.message).toBe("Task deleted successfully");
 });
});

const mongoose = require("mongoose");

afterAll(async () => {
  await mongoose.connection.close();
});
