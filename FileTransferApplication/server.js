const express = require("express");
const http = require("http");
const io = require("socket.io");
const bodyParser = require("body-parser");
const path = require("path");

const fs = require("fs");

const routes = require("./server/routes");
const config = require("./server/config.js");

class Server {
  constructor() {
    this.port = 5008;
    this.app = express();

    this.httpServer = http.createServer(this.app);
    this.socket = io(this.httpServer);
  }
  appconfig() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(express.static(path.join(__dirname, "build")));
    new config(this.app);
  }

  includeRoutes() {
    new routes(this.app, this.socket).routesConfig();
  }

  start() {
    this.appconfig();
    this.includeRoutes();

    this.httpServer.listen(8080, () => {
      console.log("server started on 8080 port");
    });

    this.httpsServer.listen(443, () => {
      console.log("server started on 443 port");
    });
  }
}

const server = new Server();
server.start();
