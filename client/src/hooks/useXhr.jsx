import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { setToken } from "../utils/setToken";

export const useXhr = (shouldRequest, method, url, data = {}) => {
    const [result, setResult] = useState();
    const [isFetched, setIsFetched] = useState(false);
    const { Authorization, logout } = useAuth();

    useEffect(() => {
        if (shouldRequest) {
            if (method === "get" || method === "delete") {
                axios[method](url, {
                    headers: { Authorization },
                })
                    .then((response) => {
                        setResult({
                            type: "success",
                            ...response,
                        });

                        if (response.data.token) {
                            setToken(response.data.token);
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
                        headers: { Authorization },
                    }
                )
                    .then((response) => {
                        setResult({ type: "success", ...response });

                        if (response.data.token) {
                            setToken(response.data.token);
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
    }, [shouldRequest]);

    return isFetched && result;
};
