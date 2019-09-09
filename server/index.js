const express = require("express");
const massive = require("massive");
const app = express();
require("dotenv").config();
const session = require("express-session");
const { CONNECTION_STRING, PORT, SESSION_SECRET } = process.env;

app.use(express.json());
app.use(express.static(`${__dirname}/../build`));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 10
    }
  })
);

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  app.listen(PORT, () => console.log(`'DingleBerry Chargin ${PORT} Palms`));
});
