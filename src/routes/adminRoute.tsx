import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { Url } from '../common/util/enum';
import { RootState } from '../models/store';

interface Props extends RouteProps {
  path: Url;
}
const AdminRoute = (props: Props) => {
  const { exact, component, path } = props;
  const account = useSelector((state: RootState) => state.accountReducer);
  const isAuthenticated = account.email ? true : false;
  const isAdmin =
    account.role_name.toLowerCase() === 'admin' ||
    account.role_name.toLowerCase() === 'quản trị'
      ? true
      : false;

  return isAuthenticated && isAdmin ? (
    <Route exact={exact} component={component} path={path} />
  ) : (
    <Redirect to={`${Url.Login}?next=${props.location?.pathname}`} />
  );
};

export default AdminRoute;
