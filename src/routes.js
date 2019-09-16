import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import UserSettings from './components/UserSettings/UserSettings'
import Message from './components/Message/Message'
import Quiz from './components/Quiz/Quiz'
import GearTest from './components/SettingsButton/GearTest'



export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/home' component={Home} />
        <Route path='/profile' component={Profile} />
        <Route path='/usersettings' component={UserSettings} />
        <Route path='/message/:matchId' component={Message} />
        <Route path='/quiz' component={Quiz} />
        <Route path='/geartest' component={GearTest}/>
    </Switch>
)