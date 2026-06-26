import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getProfile } from "../../api/authApi";
import { performLogout } from "../../utils/logout";
import { logout } from "../../store/authSlice";

function Dashboard() {

    const [user, setUser] = useState(null);


    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const response = await getProfile();

                setUser(response.data);

            }

            catch (error) {

                console.log(error);

            }

        };

        fetchProfile();

    }, []);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {

        await performLogout(
            dispatch,
            logout,
            navigate
        );

    };

    if (!user) {

        return <h2>Loading...</h2>;

    }

    return (

        <div style={{ padding: "40px" }}>

            <h1>Dashboard</h1>

            <hr />

            <h2>
                Welcome {user.first_name}
            </h2>

            <p>
                <strong>Name :</strong> {user.first_name} {user.last_name}
            </p>

            <p>
                <strong>Email :</strong> {user.email}
            </p>

            <p>
                <strong>Phone :</strong> {user.phone_number}
            </p>

            <p>
                <strong>Role :</strong> {user.role}
            </p>

            <br />

            <button
                onClick={() => navigate("/profile/edit")}
            >
                Edit Profile
            </button>

            <button
                onClick={() => navigate("/change-password")}
                style={{ marginLeft: "15px" }}
            >
                Change Password
            </button>

            <button
                onClick={handleLogout}
                style={{ marginLeft: "15px" }}
            >
                Logout
            </button>

        </div>

    );

}

export default Dashboard;