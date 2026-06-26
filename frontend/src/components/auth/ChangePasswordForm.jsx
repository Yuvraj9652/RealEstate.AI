import { useState } from "react";

import Input from "../common/Input";
import Button from "../common/Button";

import { changePassword } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { removeTokens, getRefreshToken } from "../../utils/token";
import { logout } from "../../store/authSlice";
import { logoutUser } from "../../api/authApi";

function ChangePasswordForm() {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({

        old_password: "",
        new_password: "",
        confirm_password: "",

    });

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({

            ...previous,

            [name]: value,

        }));

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setLoading(true);

        setErrors({});

        try {

            const response = await changePassword(formData);

            alert(response.data.message);

            try {

                await logoutUser(getRefreshToken());

            } catch (error) {

                console.log(error);

            }

            removeTokens();

            dispatch(logout());

            navigate("/login");

        }

        catch (error) {

            if (error.response?.data) {

                setErrors(error.response.data);

            }

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            <h2>Change Password</h2>

            <Input
                label="Old Password"
                type="password"
                name="old_password"
                value={formData.old_password}
                onChange={handleChange}
                error={errors.old_password}
            />

            <Input
                label="New Password"
                type="password"
                name="new_password"
                value={formData.new_password}
                onChange={handleChange}
                error={errors.new_password}
            />

            <Input
                label="Confirm Password"
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                error={errors.confirm_password}
            />

            <Button
                type="submit"
                disabled={loading}
            >
                {loading ? "Updating..." : "Change Password"}
            </Button>

        </form>

    );

}

export default ChangePasswordForm;