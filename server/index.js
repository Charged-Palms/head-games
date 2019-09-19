const express = require("express");
const massive = require("massive");
const app = express();
require("dotenv").config();
const session = require("express-session");
const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET, __TWILIO_ACCOUNT_SID, __TWILIO_AUTH_TOKEN } = process.env;
const authCtrl = require("./controller/authController");
const userCtrl = require("./controller/userController");
const quizCtrl = require("./controller/quizzesController");
const socketIO = require('socket.io')
const server = app.listen(SERVER_PORT, () =>
  console.log(`GO SOCKETS ON ${SERVER_PORT}`)
);
const io = socketIO(server)
const twilio = require('twilio')
//accountSid for twilio
const accountSid = __TWILIO_ACCOUNT_SID
//authToken for Twilio
const authToken = __TWILIO_AUTH_TOKEN
//creating new client for twilio
const client = new twilio(accountSid, authToken)
//bringing in middleware cors
const cors = require('cors')

app.use(express.json());
app.use(express.static(`${__dirname}/../build`));
//middleware cors blocks browser from restricting any data
app.use(cors())

app.use("/static", express.static("./media"));
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

app.get("/api/users/matches", userCtrl.userMatches);
app.put("/api/users/bio", userCtrl.updateBio);
app.put('/api/users/matches/:user_id', userCtrl.addMatch)
app.get('/api/users/match/:id', userCtrl.matchDetails)
app.get('/api/users/quizprofile', userCtrl.quizProfiles)

app.get("/api/quizzes/topics", quizCtrl.getTopics);
app.get("/api/quizzes/questions", quizCtrl.getQuestions);
app.get("/api/quizzes/questions/:matchee_id", quizCtrl.getQuestionsByTopic);
app.get('/api/quizzes/topics/:matchee_id', quizCtrl.getTopicName)

app.get("/api/messages/:match_id", userCtrl.messages);
app.post("/api/messages/:match_id", userCtrl.sendMessage);

//sending twilio text
app.get('/send-text', (req,res) => {
  //getting values, passed via the query string
  const { recipient, textmessage } = req.query 
  client.messages.create({
    body: textmessage,
    to: "+1" + recipient,
    from: '+12183668232' //from twilio
  }).then((message) => console.log(message.body))
})

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
});

io.on("connection", socket => {
  
  socket.on("join chat", data => {
    socket.join(data.room);
  });

  socket.on('emit to room socket', data => {
    socket.emit('room response', data)
  })

  socket.on('blast to room socket', data => {
    io.to(data.room).emit('room response', data)
  })

    socket.on("disconnect", () => {
  });
  

});
