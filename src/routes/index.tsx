import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from '../App';
import Login from '../app/auth/login';
import Menu from '../app/menu';
import Product from '../app/product';

const Routes = () => {
  return (
    <div className="App" id="wrapper">
      <Router>
        <Switch>
          <Route exact path="/" component={Menu} />
          <Route exact path="/login" component={Login} />
          <Route path="/product/:id" component={Product} />
        </Switch>
      </Router>
    </div>
  );
};

export default Routes;
