import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Users from './Users';
import Activities from './Activities';

export default function App() {
  return (
    <Router>
      <div className="container mt-4">
        <nav className="mb-3">
          <Link to="/users" className="btn btn-outline-primary mr-2">Users</Link>
          <Link to="/activities" className="btn btn-outline-secondary">Activities</Link>
        </nav>

        <Switch>
          <Route path="/users" component={Users} />
          <Route path="/activities" component={Activities} />
          <Route path="/" exact component={Users} />
        </Switch>
      </div>
    </Router>
  );
}
