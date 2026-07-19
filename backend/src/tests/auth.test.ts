import request from "supertest";

import app from "../app.js";

describe("Authentication", () => {
  it("should register user", async () => {
    const response = await request(app).post("/api/auth/register").send({
      name: "Akash",
      email: "akash@test.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.token).toBeDefined();
    expect(response.body.data.user.email).toBe("akash@test.com");
    expect(response.body.data.user.password).toBeUndefined();
  });
});
