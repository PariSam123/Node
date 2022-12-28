const http = require('http');

const server = http.createServer((req, res) => {
    console.log("Parija Jamatia");
})
server.listen(4000);