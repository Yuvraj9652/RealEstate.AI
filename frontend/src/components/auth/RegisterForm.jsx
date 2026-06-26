import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../common/Input";
import Button from "../common/Button";

import { registerBuyer } from "../../api/authApi";

function RegisterForm() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: "",
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

            await registerBuyer(formData);

            alert("Registration Successful!");

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

            <Input
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                error={errors.first_name}
            />

            <Input
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                error={errors.last_name}
            />

            <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
            />

            <Input
                label="Phone Number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                error={errors.phone_number}
            />

            <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
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
                {loading ? "Registering..." : "Register"}
            </Button>

        </form>

    );

}

export default RegisterForm;