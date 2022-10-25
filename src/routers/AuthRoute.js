import { Navigate } from "react-router-dom";

const AuthRoute = ({ auth, children }) => {
  if (!auth.isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default AuthRoute;
