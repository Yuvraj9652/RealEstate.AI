import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getAccessToken, removeTokens } from "../utils/token";
import { getProfile } from "../api/authApi";
import { loginSuccess, logout } from "../store/authSlice";

function useAuth() {
    const dispatch = useDispatch();

    useEffect(() => {
        const restoreSession = async () => {
            const token = getAccessToken();

            if (!token) return;

            try {
                const response = await getProfile();

                dispatch(
                    loginSuccess({
                        user: response.data,
                        access: token,
                    })
                );
            } catch (error) {
                removeTokens();
                dispatch(logout());
            }
        };

        restoreSession();
    }, [dispatch]);
}

export default useAuth;