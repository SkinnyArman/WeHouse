import request from 'supertest';
import express from 'express';

const app = express();

app.get('/', (_req, res) => {
  res.json({ message: 'Welcome to WeHouse API' });
});

describe('Server', () => {
  it('should return welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Welcome to WeHouse API' });
  });
}); 