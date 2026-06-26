import axiosInstance from "./axiosInstance";

export const registerBuyer = (data) =>
    axiosInstance.post("/auth/register/buyer/", data);

export const loginUser = (data) =>
    axiosInstance.post("/auth/login/", data);

export const getProfile = () =>
    axiosInstance.get("/auth/profile/");


export const logoutUser = (refreshToken) =>
    axiosInstance.post("/auth/logout/", {
        refresh: refreshToken,
    });

export const updateProfile = (data) =>
    axiosInstance.put("/auth/profile/update/", data);

export const changePassword = (data) =>
    axiosInstance.post(
        "/auth/change-password/",
        data
    );