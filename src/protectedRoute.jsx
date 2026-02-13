import { useAuth } from "./context/AuthContext.jsx";
import { Navigate , Outlet} from "react-router-dom";
function protectedRoute() {
    const { user, isAunthenticated } = useAuth();
    console.log("User:", user, "isAunthenticated:", isAunthenticated);

    if (!isAunthenticated) return <Navigate to="/" replace />;
    
    return (
        <Outlet />
    )
}

export default protectedRoute