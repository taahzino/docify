import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { setCookie } from "../utils/setCookie";
import Cookies from "universal-cookie";

export const useXhr = (shouldRequest, method, url, data = {}) => {
    const [result, setResult] = useState();
    const [isFetched, setIsFetched] = useState(false);
    const { Authorization, logout } = useAuth();

    const cookies = new Cookies();

    const socketid = cookies.get("socketid");

    useEffect(() => {
        if (shouldRequest) {
            if (method === "get" || method === "delete") {
                axios[method](url, {
                    headers: { Authorization, socketid },
                    withCredentials: true,
                })
                    .then((response) => {
                        setResult({
                            type: "success",
                            ...response,
                        });

                        if (response.data.token) {
                            setCookie("token", response.data.token);
                        }
                    })
                    .catch((error) => {
                        if (error.response) {
                            setResult({ type: "error", ...error.response });
                            if (error.response.status === 401) {
                                setTimeout(() => {
                                    logout();
                                }, 3000);
                            }
                        } else {
                            setResult({
                                type: "error",
                                data: { message: "Something wrong happened" },
                            });
                        }
                    })
                    .then(() => {
                        setIsFetched(true);
                    });
            } else {
                axios[method](
                    url,
                    { ...data },
                    {
                        headers: { Authorization, socketid },
                        withCredentials: true,
                    }
                )
                    .then((response) => {
                        setResult({ type: "success", ...response });

                        if (response.data.token) {
                            setCookie("token", response.data.token);
                        }
                    })
                    .catch((error) => {
                        if (error.response) {
                            if (error.response.status === 401) {
                                setTimeout(() => {
                                    logout();
                                }, 3000);
                            }
                            setResult({ type: "error", ...error.response });
                        } else {
                            setResult({
                                type: "error",
                                data: { message: "Something wrong happened!" },
                            });
                        }
                    })
                    .then(() => {
                        setIsFetched(true);
                    });
            }
        }

        return () => {
            setIsFetched(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldRequest]);

    return isFetched && result;
};
