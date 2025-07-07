const request = require('supertest');
const app = require('../src/app'); // your Express app entry point
const mongoose = require('mongoose');
const Query = mongoose.model('Query');

let createdId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Query API Endpoints', () => {
  it('should create a new query', async () => {
    const res = await request(app)
      .post('/api/query/create')
      .send({
        client: 'test-client-id',
        number: 1001,
        status: 'Open',
        description: 'Test query description',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    createdId = res.body.result._id;
  });

  it('should read a query by ID', async () => {
    const res = await request(app).get(`/api/query/read/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.result._id).toBe(createdId);
  });

  it('should update a query', async () => {
    const res = await request(app)
      .patch(`/api/query/update/${createdId}`)
      .send({ status: 'Closed' });

    expect(res.statusCode).toBe(200);
    expect(res.body.result.status).toBe('Closed');
  });

  it('should add a note to the query', async () => {
    const res = await request(app)
      .post(`/api/query/${createdId}/notes/create`)
      .send({ notes: [{ text: 'Follow-up needed' }] });

    expect(res.statusCode).toBe(200);
    expect(res.body.result.notes.length).toBeGreaterThan(0);
  });

  it('should delete a note from the query', async () => {
    const query = await Query.findById(createdId);
    const noteId = query.notes[0].noteId;

    const res = await request(app).delete(`/api/query/${createdId}/notes/delete/${noteId}`);
    expect(res.statusCode).toBe(200);
  });
});
