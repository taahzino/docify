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
            if (method === "get") {
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
                        setResult({ type: "error", ...error });
                        if (error.response.status === 401) {
                            setTimeout(() => {
                                logout();
                            }, 3000);
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
                        const response = error.response;
                        if (response.status === 401) {
                            setTimeout(() => {
                                logout();
                            }, 3000);
                        }
                        setResult({ type: "error", ...response });
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
