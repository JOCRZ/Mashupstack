import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function checkAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { token } = useSelector((state) => state.auth);

    if (!token) {
      return <Navigate to="/login" replace />;
    }

    return <Component {...props} />;
  };
}

export default checkAuth;
