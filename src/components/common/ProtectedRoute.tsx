import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = () =>{
    const {isAuthenticated } = useAuth();
console.log("isAuthenticated:", isAuthenticated);
    if(!isAuthenticated){
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default ProtectedRoute