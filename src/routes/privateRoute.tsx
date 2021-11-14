import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { Url } from '../common/util/enum';
import { RootState } from '../models/store';

interface Props extends RouteProps {
  path: Url;
}
const PrivateRoute = (props: Props) => {
  const { exact, component, path } = props;
  const account = useSelector((state: RootState) => state.accountReducer);
  const isAuthenticated = account.email ? true : false;

  return isAuthenticated ? (
    <Route exact={exact} component={component} path={path} />
  ) : (
    <Redirect to={`${Url.Login}?next=${props.location?.pathname}`} />
  );
};

export default PrivateRoute;
