import request from "supertest";

import app from "../app.js";

describe("Ticket Authorization", () => {
  it("should reject unauthenticated access", async () => {
    const response = await request(app).get("/api/tickets");

    expect(response.status).toBe(401);
  });
});
