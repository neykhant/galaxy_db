import { Navigate } from "react-router-dom";

const PrivateRoute = ({ auth, children }) => {
  if (auth.isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default PrivateRoute;
