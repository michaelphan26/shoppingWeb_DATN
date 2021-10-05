import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from '../App';

const Routes = () => {
  return (
    <div className="App" id="wrapper">
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
        </Switch>
      </Router>
    </div>
  );
};

export default Routes;
