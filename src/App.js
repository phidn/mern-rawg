import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import history from './utils/history'

export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/games/:genres" component={Home}/>
        <Route exact path="/login" component={Login}/>
      </Switch>
    </Router>
  )
}
