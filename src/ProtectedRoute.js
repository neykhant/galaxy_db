import {Navigate, Outlet} from 'react-router-dom';

function PrivateRoute({isLogged}){
    return isLogged ? <Outlet/> : <Navigate to="/admin/sale" />
}

export default PrivateRoute;