const http = require("http");
require("dotenv").config(); // using .env file
const PORT = process.env.PORT || 4000;
const util = require("util");
const url = require("url");
const router = require("./router/router")
const fs = require("fs");
const cookie = require("cookie");

const server = http.createServer((req, res) => {


    // chia router
    let parseUrl = url.parse(req.url, true);
    let path = parseUrl.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '');
    let chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : router["notfound"];
    chosenHandler(req, res);

});

// server listening on port
server.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`);
})

