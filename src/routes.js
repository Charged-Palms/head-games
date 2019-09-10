import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'




export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/home' component={Home} />
        <Route path='/profile' component={Profile} />
    </Switch>
)