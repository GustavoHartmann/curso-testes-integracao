import app from "../src/app";
import supertest from "supertest";

const server = supertest(app);

describe("test endpoint health", () => {
  it("/health", async () => {
    const result = await server.get("/health");

    expect(result.statusCode).toEqual(200);
  });
});
