const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");
const redis = require("redis");

const app = express();
const redis_client = redis.createClient(process.env.REDIS_URL);

const GROUPS_REDIS_KEY = "groups";
const DEFAULT_STATE = [{members: [], addMemberName: ''}];

app.set("port", process.env.PORT || 3001);
app.use(bodyParser.json());

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/api/groups", (req, res) => {
  redis_client.get(GROUPS_REDIS_KEY, (err, reply) => {
    if (err !== null) {
      res.json({"error": err});
    }
    else if (reply === null) {
      res.json(DEFAULT_STATE);
    }
    else {
      res.json(JSON.parse(reply));
    }
  })
});

app.post("/api/groups", (req, res) => {
  redis_client.set(GROUPS_REDIS_KEY, JSON.stringify(req.body), (err, reply) => {
    res.json({"status": reply});
  });
})

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
