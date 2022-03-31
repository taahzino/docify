import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { setToken } from "../utils/setToken";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const cookies = new Cookies();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();

    const Authorization = `Bearer ${cookies.get("token")}`;

    const login = async ({ email, password }) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/users/login`,
                {
                    email,
                    password,
                }
            );

            setToken(response.data.token);

            const user = response.data.user;

            if (user && user._id && user.email) {
                setCurrentUser(user);
            }

            return {
                type: "success",
                ...response,
            };
        } catch (error) {
            return {
                type: "error",
                ...error.response,
            };
        }
    };

    const logout = () => {
        cookies.remove("token");
        cookies.remove("Docify");
        setCurrentUser(null);
    };

    const signup = async ({ name, email, phone, password, password2 }) => {
        try {
            const response = await axios.post(
                "http://localhost:4000/api/users",
                {
                    name,
                    email,
                    phone,
                    password,
                    password2,
                }
            );

            return {
                type: "success",
                ...response,
            };
        } catch (error) {
            return {
                type: "error",
                ...error.response,
            };
        }
    };

    const getMe = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/api/users/me`,
                {
                    headers: { Authorization },
                }
            );

            setCurrentUser(response.data.user);

            return {
                type: "success",
                ...response,
            };
        } catch (error) {
            logout();
        }
    };

    const value = {
        signup,
        login,
        logout,
        getMe,
        Authorization,
        currentUser,
        setCurrentUser,
    };

    useEffect(() => {
        (async () => {
            await getMe();
        })();
    }, []);

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
