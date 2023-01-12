import './App.css';
// api : fc6d2e29e0804d9f8bb43431ed20e7ab

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default class App extends Component {
  pageSize = 15;
  apiKey = "fc6d2e29e0804d9f8bb43431ed20e7ab" //process.env.REACT_APP_NEWS_API

state = {
  progress:0
}

setProgress = (progress) =>{
 this.setState({progress: progress})
}

  render() {
    return (
      <div>
        <Router>
       <Navbar/>
       <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}
      />
       <Switch>
          <Route exact path="/"><News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="in" category="general"/></Route>
          <Route exact path="/Business"><News setProgress={this.setProgress} apiKey={this.apiKey} key="Business" pageSize={this.pageSize} country="in" category="Business"/></Route>
          <Route exact path="/Entertainment"><News setProgress={this.setProgress} apiKey={this.apiKey} key="Entertainment" pageSize={this.pageSize} country="in" category="Entertainment"/></Route>
          <Route exact path="/General"><News setProgress={this.setProgress} apiKey={this.apiKey} key="General" pageSize={this.pageSize} country="in" category="General"/></Route>
          <Route exact path="/Health"><News setProgress={this.setProgress} apiKey={this.apiKey} key="Health" pageSize={this.pageSize} country="in" category="Health"/></Route>
          <Route exact path="/Science"><News setProgress={this.setProgress} apiKey={this.apiKey} key="Science" pageSize={this.pageSize} country="in" category="Science"/></Route>
          <Route exact path="/Sports"><News setProgress={this.setProgress} apiKey={this.apiKey} key="Sports" pageSize={this.pageSize} country="in" category="Sports"/></Route>
          <Route exact path="/Technology"><News setProgress={this.setProgress} apiKey={this.apiKey} key="Technology" pageSize={this.pageSize} country="in" category="Technology"/></Route>

        </Switch>
       </Router>
      </div>
    )
  }
}