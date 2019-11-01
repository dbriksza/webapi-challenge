/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, you might want to read it really slow, don't worry be happy
in every line there may be trouble, but if you worry you make it double, don't worry, be happy
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, be happy
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just API…
I need this code, just don't know where, perhaps should make some middleware, don't worry, be happy

Go code!
*/
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

const projectRouter = require("./data/project-router");
const actionRouter = require("./data/action-router");

function logger(req, res, next) {
  console.log(
    `a ${req.method} requst to \n${require("url").parse(
      req.url
    )} was made at: ${new Date()}`
  );
  next();
}

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(logger);

server.get("/api", cors(), (req, res) => {
  res.send("Welcome to Daniel's Sprint API");
});

server.use("/api/projects", cors(), projectRouter);
server.use("/api/actions", cors(), actionRouter);

server.listen(1337, () =>
  console.log("\n=====API Running on port 1337=====\n")
);
