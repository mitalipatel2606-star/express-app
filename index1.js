const express = require("express");
const logger = require("morgan");
var http = require("http");
var app = express();

app.use(logger("short"));
app.use((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, world!");
});
app.listen(3000, () => {
    console.log("Server satrted at port 3000");
});
