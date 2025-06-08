// PrivateRoute.js
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  return !user ? children : <Navigate to="/dashboard" replace />;
};

export default PublicRoute;
