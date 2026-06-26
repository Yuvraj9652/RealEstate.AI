import { Navigate } from "react-router-dom";

import { getAccessToken } from "../utils/token";

function ProtectedRoute({ children }) {

    const token = getAccessToken();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;