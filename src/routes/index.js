const AuthRouter = require('./authRoute');
const TextRouter = require('./textRoute');
const UserRouter = require('./userRoute');

module.exports = (app) => {
    app.use('/auth', AuthRouter);
    app.use('/text', TextRouter);
    app.use('/user', UserRouter());
}