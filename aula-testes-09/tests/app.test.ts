import supertest from "supertest";

import app from "./../src/app";
import prisma from "../src/database";

const api = supertest(app);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

const user1 = {
  email: "joaozinho@gmail.com",
  password: "1234",
};

const user2 = {
  email: "pedrinho@gmail.com",
  password: "1234",
};

describe("POST /users tests", () => {
  it("should create a user", async () => {
    const { statusCode } = await api.post("/users").send(user1);

    expect(statusCode).toBe(201);
  });

  it("should receive 409 when trying to create two users with same e-mail", async () => {
    await api.post("/users").send(user1);
    const { statusCode } = await api.post("/users").send(user1);

    expect(statusCode).toBe(409);
  });
});

describe("GET /users tests", () => {
  it("should return a single user", async () => {
    const { id } = await prisma.user.create({
      data: user1,
    });
    const { statusCode, body } = await api.get(`/users/${id}`);

    expect(statusCode).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        email: expect.any(String),
        password: expect.any(String),
      })
    );
  });

  it("should return 404 when can't find a user by id", async () => {
    const { statusCode } = await api.get("/users/1");

    expect(statusCode).toBe(404);
  });

  it("should return all users", async () => {
    await prisma.user.create({
      data: user1,
    });
    await prisma.user.create({
      data: user2,
    });

    const { statusCode, body } = await api.get("/users");

    expect(statusCode).toBe(200);
    expect(body).toEqual(
      expect.arrayContaining([
        {
          email: expect.any(String),
        },
        {
          email: expect.any(String),
        },
      ])
    );
  });
});
