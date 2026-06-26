import { useEffect, useState } from "react";

import { getProfile } from "../../api/authApi";

function Profile() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const fetchData = async () => {

            const response = await getProfile();

            setUser(response.data);

        };

        fetchData();

    }, []);

    if (!user)
        return <h2>Loading...</h2>;

    return (

        <div style={{ padding: "40px" }}>

            <h1>Profile</h1>

            <hr />

            <p>First Name : {user.first_name}</p>

            <p>Last Name : {user.last_name}</p>

            <p>Email : {user.email}</p>

            <p>Phone : {user.phone_number}</p>

            <p>Role : {user.role}</p>

        </div>

    );

}

export default Profile;