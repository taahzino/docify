import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [cookies, setCookie] = useCookies();

    const Authorization = `Bearer ${cookies["token"]}`;

    const getMe = async () => {
        try {
            const response = await axios.get(
                "http://localhost:4000/api/users/me",
                {
                    headers: {
                        Authorization
                    }
                }
            );

            setCurrentUser(response.data);

            return {
                type: "success",
                status: response.status,
                data: response.data
            };
        } catch (error) {
            setCurrentUser(null);
            if (error.response) {
                return {
                    type: "error",
                    status: error.response.status || 0,
                    data: error.response.data || 0
                };
            } else {
                return { type: "error", data: { message: error.message } };
            }
        }
    };

    const login = async ({ email, password }) => {
        try {
            const response = await axios.post(
                "http://localhost:4000/api/users/login",
                {
                    email,
                    password
                }
            );

            const now = new Date();
            let time = now.getTime();
            time += 86400 * 1000;
            now.setTime(time);

            setCookie("token", response.data.token, {
                expire: now.toUTCString(),
                path: "/"
            });

            const user = { ...response.data };
            delete user.message;

            setCurrentUser(user);

            return {
                type: "success",
                status: response.status,
                data: response.data
            };
        } catch (error) {
            return {
                type: "error",
                status: error.response.status,
                data: error.response.data
            };
        }
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
                    password2
                }
            );

            return {
                type: "success",
                status: response.status,
                data: response.data
            };
        } catch (error) {
            return {
                type: "error",
                status: error.response.status,
                data: error.response.data
            };
        }
    };

    const value = { signup, login, getMe, Authorization, currentUser };

    useEffect(() => {
        (async () => {
            await getMe();
        })();
    }, []);

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
