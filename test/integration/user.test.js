const { faker } = require('@faker-js/faker');
const supertest = require('supertest');
const expect = require('chai').expect;
const app = require('../../app');

const request = supertest.agent(app);

describe('User Integration tests', () => {
  let name = faker.name.firstName();

  describe('POST /api/v1/users', () => {
    it('should not create user if the name field is not provided', async () => {
      const res = await request.post('/api/v1/users').send();
      expect(res.status).to.eql(400);
      expect(res.body.status).to.eql('fail');
      expect(res.body.message).to.eql('The name field is required');
    });
    it('should successfully create a new user if a name is provided', async () => {
      const res = await request.post('/api/v1/users').send({ name });
      expect(res.status).to.eql(201);
      expect(res.body.status).to.eql('success');
      expect(res.body.data.name).to.eql(name);
    });

    it('should response with a 409 conflict error if an existing user name is used to create a user', async () => {
      const res = await request.post('/api/v1/users').send({ name });
      expect(res.status).to.eql(409);
      expect(res.body.status).to.eql('fail');
      expect(res.body.message).to.eql('An existing user with the same name already exists');
    });
  });
});
