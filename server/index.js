const express = require("express");
const massive = require("massive");
const cors = require('cors')
require("dotenv").config();
const app = express();
const session = require("express-session");
const { CONNECTION_STRING, PORT, SESSION_SECRET } = process.env;

app.use(express.json());
app.use( express.static( `${__dirname}/../build` ) );
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
app.use(cors());

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  app.listen(PORT, () =>
    console.log(`'DingleBerry Chargin ${PORT} Palms`)
  );
});
