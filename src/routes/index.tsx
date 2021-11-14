import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminCategory from '../app/admin/category';
import AdminCompany from '../app/admin/company';
import AdminDashboard from '../app/admin/dashboard';
import AdminIO from '../app/admin/ioProduct';
import AdminIOType from '../app/admin/ioType';
import AdminProduct from '../app/admin/product';
import AdminReceipt from '../app/admin/receipt';
import AdminReceiptType from '../app/admin/receiptType';
import AdminRole from '../app/admin/role';
import AdminStatistic from '../app/admin/statistic';
import AdminUser from '../app/admin/user';
import Login from '../app/auth/login';
import Register from '../app/auth/register';
import Cart from '../app/cart';
import Category from '../app/category';
import Checkout from '../app/checkout';
import Menu from '../app/menu';
import OrderCompleted from '../app/order-completed';
import Product from '../app/product';
import Profile from '../app/profile';
import Receipt from '../app/receipt';
import Search from '../app/search';
import { Url } from '../common/util/enum';
import AdminRoute from './adminRoute';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';

const Routes = () => {
  return (
    <div className="App" id="wrapper">
      <Router>
        <Switch>
          <PublicRoute exact path={Url.Home} component={Menu} />
          <PublicRoute exact path={Url.Login} component={Login} />
          <PublicRoute exact path={Url.Register} component={Register} />
          <PublicRoute path={Url.ProductDetail} component={Product} />
          <PublicRoute exact path={Url.Cart} component={Cart} />
          <PrivateRoute exact path={Url.Checkout} component={Checkout} />
          <PrivateRoute
            exact
            path={Url.OrderCompleted}
            component={OrderCompleted}
          />
          <PrivateRoute exact path={Url.Profile} component={Profile} />
          <PublicRoute path={Url.Search} component={Search} />
          <PrivateRoute exact path={Url.Receipt} component={Receipt} />
          <PublicRoute path={Url.Category} component={Category} />

          <AdminRoute
            exact
            path={Url.AdminDashboard}
            component={AdminDashboard}
          />
          <AdminRoute
            exact
            path={Url.AdminCategory}
            component={AdminCategory}
          />
          <AdminRoute
            exact
            path={Url.AdminReceiptType}
            component={AdminReceiptType}
          />
          <AdminRoute exact path={Url.AdminIOType} component={AdminIOType} />
          <AdminRoute exact path={Url.AdminRole} component={AdminRole} />
          <AdminRoute exact path={Url.AdminCompany} component={AdminCompany} />
          <AdminRoute exact path={Url.AdminAccount} component={AdminUser} />
          <AdminRoute exact path={Url.AdminReceipt} component={AdminReceipt} />
          <AdminRoute exact path={Url.AdminProduct} component={AdminProduct} />
          <AdminRoute exact path={Url.AdminIO} component={AdminIO} />
          <AdminRoute
            exact
            path={Url.AdminStatistic}
            component={AdminStatistic}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default Routes;
