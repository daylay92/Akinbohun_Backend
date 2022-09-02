const { faker } = require('@faker-js/faker');
const supertest = require('supertest');
const expect = require('chai').expect;
const app = require('../../app');
const { addUser } = require('../../services/user');
const constants = require('../../utils/constants');
const request = supertest.agent(app);

describe('Comment Integration tests', () => {
  const emptyPayload = {
    profileId: 1
  };
  let userId;
  before(async () => {
    const user = await addUser({ name: faker.name.firstName() });
    userId = user.id;
  });

  describe('POST /api/v1/comments', () => {
    it('should not create comment if non of title, description, mbti, zodaic or enneagram is provided', async () => {
      const res = await request
        .post('/api/v1/comments')
        .send({ ...emptyPayload, authorId: userId });
      expect(res.status).to.eql(400);
      expect(res.body.status).to.eql('fail');
      expect(res.body.message).to.eql(
        'One of mbti, ennegram, zodiac, title, description must be provided'
      );
    });
    it('should not create comment if the author ID is not provided', async () => {
      const res = await request.post('/api/v1/comments').send({ ...emptyPayload, mbti: 'Invalid' });
      expect(res.status).to.eql(400);
      expect(res.body.status).to.eql('fail');
      expect(res.body.message).to.eql(`The author's ID is required`);
    });
    it('should not create comment if at invalid mbti is provided', async () => {
      const res = await request
        .post('/api/v1/comments')
        .send({ authorId: userId, mbti: 'Invalid', ...emptyPayload });
      expect(res.status).to.eql(400);
      expect(res.body.status).to.eql('fail');
    });

    it('should not create comment if at invalid zodiac is provided', async () => {
      const res = await request
        .post('/api/v1/comments')
        .send({ authorId: userId, mbti: 'ESFJ', zodiac: 'iwe', ...emptyPayload });
      expect(res.status).to.eql(400);
      expect(res.body.status).to.eql('fail');
    });

    it('should not create comment if at invalid ennegram is provided', async () => {
      const res = await request
        .post('/api/v1/comments')
        .send({ authorId: userId, mbti: 'ESFJ', zodiac: 'Leo', ennegram: 'Invalid', ...emptyPayload });
      expect(res.status).to.eql(400);
      expect(res.body.status).to.eql('fail');
    });

    it('should successfully create a comment if valid request data is provided', async() => {
      const res = await request
        .post('/api/v1/comments')
        .send({ authorId: userId,  zodiac: 'Leo', ...emptyPayload });
      expect(res.status).to.eql(201);
      expect(res.body.status).to.eql('success');
    })
  });
});
