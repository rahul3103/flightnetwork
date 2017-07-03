import React, { Component } from 'react';
import Collector from './components/collector'
import SearchBar from './components/search'
import Movie from './components/movie'
import List from './components/list'


import './App.css';


import { BrowserRouter as Router, Route, NavLink }from 'react-router-dom';

class Routes extends Component {

  render() {
    return (
      <Router>
      <div>
        
        <Route exact path="/" component={SearchBar} />

        <Route exact path="/" component={Collector} />
        <Route exact path="/movie/:movie" component={Movie} />
        <Route exact path="/list" component={List} />

      </div>
      </Router>
    );
  }
}

export default Routes;
