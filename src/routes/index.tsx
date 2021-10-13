import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from '../App';
import Login from '../app/auth/login';
import Register from '../app/auth/register';
import Menu from '../app/menu';
import Product from '../app/product';
import { Url } from '../common/util/enum';

const Routes = () => {
  return (
    <div className="App" id="wrapper">
      <Router>
        <Switch>
          <Route exact path={Url.Home} component={Menu} />
          <Route exact path={Url.Login} component={Login} />
          <Route exact path={Url.Register} component={Register} />
          <Route path={Url.ProductDetail} component={Product} />
        </Switch>
      </Router>
    </div>
  );
};

export default Routes;
