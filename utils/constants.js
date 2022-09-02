module.exports = {
  DEFAULT_PROFILE_IMAGE: 'https://soulverse.boo.world/images/1.png',
  INTERNAL_SERVER_ERROR: 'Oops, something broke on the server!!!',
  defaultSchemaOptions: {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  },
  MBTI: [
    'INTP',
    'INTJ',
    'ENFJ',
    'INTJ',
    'INTP',
    'ENTP',
    'ENTJ',
    'ISFP',
    'ISFJ',
    'ESFP',
    'ESFJ',
    'ISTP',
    'ISTJ',
    'ESTP',
    'ESTJ'
  ],
  enneagram: [
    '1w2',
    '2w3',
    '3w2',
    '3w4',
    '4w3',
    '4w5',
    '5w4',
    '5w6',
    '6w5',
    '6w7',
    '7w6',
    '7w8',
    '8w7',
    '8w9',
    '9w8',
    '9w1'
  ],
  zodiac: [
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpio',
    'Sagittarius',
    'Capricorn',
    'Aquarius',
    'Pisces'
  ],
  commentSortByField : {
      BEST: 'best',
      RECENT: 'recent'
  },
BAD_REQUEST: 'Validation failed, check data',
SUCCESS_RESPONSE_MESSAGE: 'The request was successful',
};
