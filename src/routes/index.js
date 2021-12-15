const TextRouter = require('./textRoute');
const UserRouter = require('./userRoute');

module.exports = (app) => {
    app.use('/auth', TextRouter);
    app.use('/text', TextRouter);
    app.use('/user', UserRouter);
}