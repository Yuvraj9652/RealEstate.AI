import { useEffect, useState } from "react";

import { getProfile, updateProfile } from "../../api/authApi";

import Input from "../common/Input";
import Button from "../common/Button";

function ProfileForm() {

    const [formData, setFormData] = useState({

        first_name: "",
        last_name: "",
        phone_number: "",

    });

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({});

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const response = await getProfile();

                setFormData({

                    first_name: response.data.first_name,

                    last_name: response.data.last_name,

                    phone_number: response.data.phone_number,

                });

            }

            catch (error) {

                console.log(error);

            }

        };

        fetchProfile();

    }, []);

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

            const response = await updateProfile(formData);

            alert(response.data.message);

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

            <h2>Edit Profile</h2>

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
                label="Phone Number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                error={errors.phone_number}
            />

            <Button
                type="submit"
                disabled={loading}
            >
                {loading ? "Updating..." : "Update Profile"}
            </Button>

        </form>

    );

}

export default ProfileForm;