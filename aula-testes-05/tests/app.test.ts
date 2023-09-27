import supertest from "supertest";
import app, { fibonacciSequence } from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("should return 200 when ask /health", async () => {
    const { status, text } = await api.get("/health");
    expect(status).toBe(200);
    expect(text).toBe("OK!");
  });

  it("should return 400 when no elements where passed /fibonacci", async () => {
    const { statusCode, text } = await api.get("/fibonacci");
    expect(statusCode).toBe(400);
    expect(text).toBe("Bad Request");
  });

  it("should return 400 when element is not a number /fibonacci", async () => {
    const { statusCode, text } = await api.get("/fibonacci/?elements=[]");
    expect(statusCode).toBe(400);
    expect(text).toBe("Bad Request");
  });

  it("should return 400 when element less than 1 /fibonacci", async () => {
    const { statusCode, text } = await api.get("/fibonacci/?elements=0");
    expect(statusCode).toBe(400);
    expect(text).toBe("Bad Request");
  });

  it("should return 200 when valid elements /fibonacci", async () => {
    const { status, body } = await api.get("/fibonacci/?elements=12");

    const result = fibonacciSequence(12);

    expect(status).toBe(200);
    expect(body).toEqual(expect.arrayContaining(result));
  });
});
