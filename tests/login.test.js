import request from "supertest";
import app from "../server.js";
import * as db from "../models/index.js";
import bcrypt from "bcrypt";
import { sql } from "../server.js";
import { expect, it, jest } from "@jest/globals";

const { User } = db.models;

describe("POST /api/login", () => {
  beforeAll(async () => {
    await sql.authenticate();
    await sql.sync();
  });

  afterAll(async () => {
    await sql.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should allow a valid user to login", async () => {
    const mockUser = [
      {
        id: 1,
        email: "test112141@example.com",
        password: "testst",
      },
      {
        id: 2,
        email: "test@example.com",
        password: "test",
      },
    ];
    jest.spyOn(User, "findOne").mockResolvedValue(mockUser);
    jest.spyOn(bcrypt, "compare").mockResolvedValue(true);

    const res = await request(app)
      .post("/api/login")
      .send({ email: mockUser.email, password: "test" });

    expect(res.statusCode).toBe(200);
    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalled();
  });

  it("Should not allow user with an invalid email address", async () => {
    jest.spyOn(User, "findOne").mockResolvedValue(null);

    const result = await request(app)
      .post("/api/login")
      .send({ email: "unknown@example.com", password: "doesnotmatter" });

    expect(result.statusCode).toBe(400);
    expect(result.body.message).toBe("null cannot be found!");
  });

  it("Should not allow user with an invalid password", async () => {

    jest.spyOn(User, "findOne").mockResolvedValue({
      id: 1,
      email: "test112141@example.com",
      password: "password"
    });
    jest.spyOn(bcrypt, "compare").mockResolvedValue(false);

    const result = await request(app).post("/api/login").send({ email: "test112141@example.com", password: "unkown_password" });

    expect(result.statusCode).toBe(400);
  });
});
