import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export const useXhr = (method, url, data = {}, headersconfig) => {
    const [result, setResult] = useState();
    const [isFetched, setIsFetched] = useState(false);

    const { Authorization } = useAuth();

    useEffect(() => {
        console.log(Authorization);

        if (method === "get") {
            axios[method](url, {
                headers: { Authorization, ...headersconfig },
            })
                .then((response) => {
                    setResult({
                        type: "success",
                        ...response,
                    });
                })
                .catch((error) => {
                    setResult({ type: "error", ...error });
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
                    setResult({ type: "success", response });
                })
                .catch((error) => {
                    setResult({ type: "error", error });
                })
                .then(() => {
                    setIsFetched(true);
                });
        }

        return () => {
            setIsFetched(false);
        };
    }, []);

    return isFetched && result;
};
