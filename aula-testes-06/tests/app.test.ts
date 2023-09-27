import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("should return 200 /event", async () => {
    const { statusCode, body } = await api.get("/event");

    expect(statusCode).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        image: expect.any(String),
        date: expect.any(String),
      })
    );
  });
});
