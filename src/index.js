require('dotenv-safe').config();
const app = require("./app");

const _PORT = process.env.PORT || 3000;
app.listen(_PORT, () => {
    console.log(`server running @ http://localhost:${_PORT} 🚀🔥`);
})