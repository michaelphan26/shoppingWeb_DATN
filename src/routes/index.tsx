import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App from '../App';
import Login from '../app/auth/login';
import Register from '../app/auth/register';
import Cart from '../app/cart';
import Checkout from '../app/checkout';
import Menu from '../app/menu';
import OrderCompleted from '../app/order-completed';
import Product from '../app/product';
import Profile from '../app/profile';
import Search from '../app/search';
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
          <Route exact path={Url.Cart} component={Cart} />
          <Route exact path={Url.Checkout} component={Checkout} />
          <Route exact path={Url.OrderCompleted} component={OrderCompleted} />
          <Route exact path={Url.Profile} component={Profile} />
          <Route path={Url.Search} component={Search} />
        </Switch>
      </Router>
    </div>
  );
};

export default Routes;
