import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import UserSettings from "./components/UserSettings/UserSettings";
import Message from "./components/Message/Message";
import Quiz from "./components/Quiz/Quiz";
import Question from "./components/Quiz/Question";
import SelectInterests from "./components/Register/SelectInterests";

export default (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/home" component={Home} />
    <Route path="/profile" component={Profile} />
    <Route path="/usersettings" component={UserSettings} />
    <Route path="/message/:matchId" component={Message} />
    <Route path="/quiz/:finishedQuiz" component={Quiz} />
    <Route path="/question/:questionID" component={Question} />
    <Route path="/selectinterests" component={SelectInterests} />
  </Switch>
);
