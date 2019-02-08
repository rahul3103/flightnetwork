import React, { Component } from 'react';
import Collector from './components/collector';
import SearchBar from './components/search';
import Movie from './components/mov';
import List from './components/list';

import './App.css';

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

class Routes extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div>
          <header className="header-basic">
            <div className="header-limiter">
              <h1>
                <NavLink activeClassName="selected" exact to="/">
                  Home |{' '}
                </NavLink>
              </h1>
              <h1>
                <NavLink activeClassName="selected" exact to="/list">
                  Movies List
                </NavLink>
              </h1>
              <Route exact path="/" component={SearchBar} />
              <nav />
            </div>
          </header>

          <Route exact path="/" component={Collector} />
          <Route exact path="/movie/:movie" component={Movie} />
          <Route exact path="/list" component={List} />
        </div>
      </Router>
    );
  }
}

export default Routes;
