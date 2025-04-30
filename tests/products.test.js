import request from "supertest";
import app from "../server.js";
import * as db from "../models/index.js";
import { sql } from "../server.js";
import { expect, it, jest } from "@jest/globals";

const { Product } = db.models;

describe("GET /api/products", () => {
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


  it('Retrieve all products', async ()=> {

    jest.spyOn(Product,"findAll").mockResolvedValue(true);

    const result = await request(app).get("/api/products");
    expect(result.statusCode).toBe(200);
    expect(result.body.message).toBe("Products successfully retrieved!");

  });

  it('Retrieved all products by product id', async ()=> {
    const item = [{ id: 10 }];
    jest.spyOn(Product, 'findOne').mockResolvedValue({ where: { id: item.id }});

    const result = await request(app).get(`/api/products/${item[0]}`);

    expect(result.statusCode).toBe(200);
    expect(result.body.message).toBe("Successfully retrieved product");
  });
});
