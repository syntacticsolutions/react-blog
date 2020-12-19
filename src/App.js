import React from 'react';
import Navigation from './components/navigation'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Algos from './pages/algos'
import Cloud from './pages/cloud'
import Health from './pages/health'
import Home from './pages/home'
import Login from './pages/login'
import Post from './pages/post'
import WebDev from './pages/web-dev'
import EditPost from './pages/edit-post'

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Switch>

          <Route path='/algos' component={Algos} />
          <Route path='/cloud' component={Cloud} />
          <Route path='/health' component={Health} />
          <Route path='/login' component={Login} />
          <Route path='/post/:id' component={Post} />
          <Route path="/web-dev" component={WebDev} />
          <Route path="/edit-post" component={EditPost} />
          <Route path='/' component={Home} />
          <Route component={() => 404} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
