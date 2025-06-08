// PrivateRoute.js
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  return user?.access_token ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
