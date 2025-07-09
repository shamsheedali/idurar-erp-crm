import { createRequest, createResponse } from 'node-mocks-http';
import { GET } from '@/app/api/projects/route';

jest.mock('@/models/Project', () => ({
  Project: {
    find: jest.fn(() => Promise.resolve([{ _id: '123', name: 'Test Project' }])),
    countDocuments: jest.fn(() => Promise.resolve(1)),
  },
}));

describe('GET /api/projects', () => {
  it('should return a list of projects', async () => {
    const req = createRequest({ method: 'GET', url: 'http://localhost/api/projects' });
    const res = createResponse();

    await GET(req, res);

    const data = res._getJSONData();

    expect(res._getStatusCode()).toBe(200);
    expect(data.data.projects).toBeInstanceOf(Array);
    expect(data.data.projects.length).toBe(1);
    expect(data.data.projects[0].name).toBe('Test Project');
  });
});
