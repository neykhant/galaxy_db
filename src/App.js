import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Admin from "./layouts/Admin";
import "./App.css";
import Login from "./pages/Login";
import Sale from "./pages/Sale";
import AuthRoute from "./routers/AuthRoute";
import { connect } from "react-redux";
import PrivateRoute from "./routers/PrivateRoute";
import PrintSale from "./pages/sales/PrintSale";

//organicapi.92134691-30-20190705152935.webstarterz.com
const App = ({ auth }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <AuthRoute auth={auth}>
              <Admin />
            </AuthRoute>
          }
        />
        <Route
          path="/admin/sale"
          element={
            <AuthRoute auth={auth}>
              <Sale />
            </AuthRoute>
          }
        />
        <Route
          path="/admin/sale/:id"
          element={
            <AuthRoute auth={auth}>
              <PrintSale />
            </AuthRoute>
          }
        />

        <Route
          path="/auth/login"
          element={
            <PrivateRoute auth={auth}>
              <Login />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

const mapStateToProps = (store) => ({
  auth: store.auth
});

export default connect(mapStateToProps)(App);
