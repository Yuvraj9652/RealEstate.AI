import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import Input from "../common/Input";
import Button from "../common/Button";

import { loginUser } from "../../api/authApi";

import { saveTokens } from "../../utils/token";

import {
    loginStart,
    loginSuccess,
    loginFailure,
} from "../../store/authSlice";

function LoginForm() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({

        email: "",
        password: "",

    });

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

        dispatch(loginStart());

        setErrors({});

        try {

            const response = await loginUser(formData);

            saveTokens(
                response.data.access,
                response.data.refresh
            );

            dispatch(
                loginSuccess(response.data)
            );

            navigate("/dashboard");

        }

        catch (error) {

            dispatch(
                loginFailure(error.response?.data)
            );

            setErrors(error.response?.data);

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
            />

            <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
            />

            <Button type="submit">

                Login

            </Button>

        </form>

    );

}

export default LoginForm;