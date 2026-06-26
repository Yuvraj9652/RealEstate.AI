import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ChangePassword from "../pages/auth/ChangePassword";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/profile/Profile";
import EditProfile from "../pages/profile/EditProfile";

function AppRoutes() {
    return (
        <Routes>

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />


            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/change-password"
                element={
                    <ProtectedRoute>
                        <ChangePassword />
                    </ProtectedRoute>
                }
            />


            <Route
                path="/profile/edit"
                element={
                    <ProtectedRoute>
                        <EditProfile />
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}

export default AppRoutes;

