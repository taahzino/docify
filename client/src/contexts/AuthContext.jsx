import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useAxios } from "../hooks/useAxios";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();

    const cookies = new Cookies();

    const Authorization = `Bearer ${cookies.get("token")}`;

    const getMe = async () => {
        const result = await useAxios(
            "get",
            `${process.env.REACT_APP_SERVER_URL}/api/users/me`,
            {},
            Authorization
        );

        if (result.type === "success") {
            setCurrentUser(result.data);
        } else {
            setCurrentUser(null);
        }

        return result;
    };

    const login = async ({ email, password }) => {
        console.log({ email, password });
        try {
            const result = await useAxios(
                "post",
                `${process.env.REACT_APP_SERVER_URL}/api/users/login`,
                {
                    email,
                    password,
                }
            );

            const expiryTime = new Date();
            let time = expiryTime.getTime();
            time += 86400 * 1000;
            expiryTime.setTime(time);

            document.cookie = `token=${result.data.token}; expires=${expiryTime}; path=/`;

            const user = { ...result.data };
            delete user.message;

            if (user && user._id && user.email) {
                setCurrentUser(user);
            }

            return result;
        } catch (error) {
            console.log(54445);
            console.log(error);
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
                status: response.status,
                data: response.data,
            };
        } catch (error) {
            return {
                type: "error",
                status: error.response.status,
                data: error.response.data,
            };
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
