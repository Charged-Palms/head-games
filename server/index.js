const express = require("express");
const massive = require("massive");
const app = express();
require("dotenv").config();
const session = require("express-session");
const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;
const authCtrl = require("./controller/authController");
const userCtrl = require("./controller/userController");
const quizCtrl = require("./controller/quizzesController");
const socketIO = require('socket.io')
const http = require('http').Server(app)
const io = socketIO(http)
const axios = require('axios')

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

app.get("/auth/session", authCtrl.getSession);
app.post("/auth/register", authCtrl.register);
app.post("/auth/login", authCtrl.login);
app.delete("/auth/logout", authCtrl.logout);
app.get("/api/matches", userCtrl.userMatches);
app.get("/api/users/cards", userCtrl.getCardInfo);

// app.get('/api/users/:matchee_id')
app.get("/api/users/matches", userCtrl.userMatches);
app.put("/api/users/bio", userCtrl.updateBio);
//app.put('/api/users/matches/:user_id', userCtrl.addMatch)
app.get('/api/users/match/:id', userCtrl.matchDetails)
app.get('/api/users/quizprofile', userCtrl.quizProfiles)

app.get("/api/quizzes/topics", quizCtrl.getTopics);
app.get("/api/quizzes/questions", quizCtrl.getQuestions);
app.get("/api/quizzes/questions/topics", quizCtrl.getQuestionsByTopic);

app.get("/api/messages/:match_id", userCtrl.messages);
app.post("/api/messages/:match_id", userCtrl.sendMessage);

// const getApiAndEmit = async socket => {
//   // const db = app.get("db");
//   // console.log(db.user_matches(req.session.user.user_id).then(res => {console.log(res)}))
//   const res = await axios.get(`http://localhost:5555/api/messages/14`); // Getting the data from DarkSky
//   // console.log(res)
//   io.sockets.emit("FromAPI", res.data); // Emitting a new message. It will be consumed by the client
// };

// io.on("connection", socket => {
//   console.log("New client connected");

//   socket.on("FromAPI", socket => {
//     // console.log('FromAPI', socket)
//     getApiAndEmit(socket);
//   });

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

// massive(CONNECTION_STRING).then(db => {
//   app.set("db", db);
//   app.listen(SERVER_PORT, () =>
//     console.log(`'DingleBerry Chargin ${SERVER_PORT} Palms`)
//   );
// });

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  const server = http.listen(SERVER_PORT, () => {
    console.log("server is running on port", server.address().port);
  });
});
