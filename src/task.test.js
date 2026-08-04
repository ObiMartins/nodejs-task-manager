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
});
	
const mongoose = require("mongoose");

afterAll(async () => {
    await mongoose.connection.close();
   });
