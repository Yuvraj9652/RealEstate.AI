import { logoutUser } from "../api/authApi";
import { getRefreshToken, removeTokens } from "./token";

export const performLogout = async (dispatch, logoutAction, navigate) => {

    try {

        await logoutUser(getRefreshToken());

    } catch (error) {

        console.log(error);

    }

    removeTokens();

    dispatch(logoutAction());

    navigate("/login");

};