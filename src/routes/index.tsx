import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminCategory from '../app/admin/category';
import AdminCompany from '../app/admin/company';
import AdminDashboard from '../app/admin/dashboard';
import AdminIOType from '../app/admin/ioType';
import AdminProduct from '../app/admin/product';
import AdminReceipt from '../app/admin/receipt';
import AdminReceiptType from '../app/admin/receiptType';
import AdminRole from '../app/admin/role';
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
          <Route exact path={Url.Receipt} component={Receipt} />
          <Route path={Url.Category} component={Category} />

          <Route exact path={Url.AdminDashboard} component={AdminDashboard} />
          <Route exact path={Url.AdminCategory} component={AdminCategory} />
          <Route
            exact
            path={Url.AdminReceiptType}
            component={AdminReceiptType}
          />
          <Route exact path={Url.AdminIOType} component={AdminIOType} />
          <Route exact path={Url.AdminRole} component={AdminRole} />
          <Route exact path={Url.AdminCompany} component={AdminCompany} />
          <Route exact path={Url.AdminAccount} component={AdminUser} />
          <Route exact path={Url.AdminReceipt} component={AdminReceipt} />
          <Route exact path={Url.AdminProduct} component={AdminProduct} />
        </Switch>
      </Router>
    </div>
  );
};

export default Routes;
