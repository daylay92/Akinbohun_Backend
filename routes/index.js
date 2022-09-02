
const profileRouter = require('./profile');
const v1Router = require('./v1');

module.exports = (app) => {
app.use('/api/v1', v1Router);
app.use('/', profileRouter);
}