import request from 'supertest';
import app from '../server.js';
import * as db from '../models/index.js';
import { sql } from '../server.js';
import { jest } from '@jest/globals';


const { User } = db.models;

describe('GET /api/users', () => {
  beforeAll(async () => {
    // Authenticate and sync database before tests
    await sql.authenticate();
    await sql.sync();
  });

  afterAll(async () => {
    // Close the database connection after all tests
    await sql.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should return all users', async () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];
    jest.spyOn(User, 'findAll').mockResolvedValue(mockUsers);

    const res = await request(app).get('/api/users');

    expect(res.statusCode).toBe(200);
    expect(res.body.users).toEqual(mockUsers);
    expect(User.findAll).toHaveBeenCalledTimes(1);
  });

});


