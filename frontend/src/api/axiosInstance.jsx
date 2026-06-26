import axios from "axios";

import {
    getAccessToken,
    getRefreshToken,
    saveTokens,
    removeTokens,
} from "../utils/token";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {

    const token = getAccessToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

axiosInstance.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;

            try {

                const response = await axios.post(

                    `${import.meta.env.VITE_API_URL}/auth/refresh/`,

                    {
                        refresh: getRefreshToken(),
                    }

                );

                saveTokens(
                    response.data.access,
                    getRefreshToken()
                );

                originalRequest.headers.Authorization =
                    `Bearer ${response.data.access}`;

                return axiosInstance(originalRequest);

            } catch {

                removeTokens();

                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }

);

export default axiosInstance;