import React, { useContext, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { setCookie } from "../utils/setCookie";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const cookies = new Cookies();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        cookies.get("currentUser") &&
            typeof cookies.get("currentUser") === "object" &&
            cookies.get("currentUser")._id &&
            cookies.get("currentUser").email
            ? cookies.get("currentUser")
            : null
    );

    const Authorization = `Bearer ${cookies.get("token")}`;

    const login = async ({ email, password }) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/users/login`,
                {
                    email,
                    password,
                },
                {
                    withCredentials: true,
                }
            );

            setCookie("token", response.data.token);

            const user = response.data.user;

            if (user && user._id && user.email) {
                setCurrentUser(user);
                setCookie("currentUser", JSON.stringify(user));
            }

            return {
                type: "success",
                ...response,
            };
        } catch (error) {
            if (error.message === "Network Error") {
                return {
                    type: "error",
                    data: {
                        message: "Something wrong happened! Try again later",
                    },
                };
            }
            return {
                type: "error",
                ...error.response,
            };
        }
    };

    const logout = () => {
        cookies.remove("token");
        cookies.remove("Docify");
        cookies.remove("currentUser");
        setCurrentUser(null);
    };

    const signup = async ({ name, email, phone, password, password2 }) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/users`,
                {
                    name,
                    email,
                    phone,
                    password,
                    password2,
                },
                {
                    withCredentials: true,
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

    const value = {
        signup,
        login,
        logout,
        Authorization,
        currentUser,
        setCurrentUser,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
