require('dotenv-safe').config();
const app = require("./app");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running @ http://localhost:${PORT} 🚀🔥`);
})

/*
function add(a, b) {
    return a + b;
}

const add2 = add();

const add3 = (a, b) => {
    return a + b;
}

const express2 = function(port, callback) {
    console.log(`setting up an express server on port - ${port}`);
    callback();
}

express2(1234, () => {console.log('jimbrootasnnns');})
*/
