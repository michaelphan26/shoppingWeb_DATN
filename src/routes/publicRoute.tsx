import { Route, RouteProps } from 'react-router-dom';
import { Url } from '../common/util/enum';

interface Props extends RouteProps {
  path: Url;
}
const PublicRoute = (props: Props) => {
  const { exact, component, path } = props;
  return <Route exact={exact} component={component} path={path} />;
};

export default PublicRoute;
