const profiles = require('./assets/profile');
const Profile = require('../models/profile');

const seedProfile = async () =>  {
    const options = profiles.map((profile) => ({
        updateOne: {
          filter: { name: profile.name },
          update: { $set: profile },
          upsert: true,
        },
      }));
   await Profile.bulkWrite(options);
   console.log('Profiles seeded successfully');
}


module.exports = async () => {
    // add all seed functions here
    await seedProfile();
    console.log('Seeding successfully completed');
}