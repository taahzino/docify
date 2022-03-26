import axios from "axios";

export const useAxios = async (method, url, data = {}, Authorization = "") => {
    try {
        const response = await axios({
            method,
            url,
            data: {
                ...data,
            },
            headers: {
                Authorization,
            },
        });

        return {
            type: "success",
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        if (error.response) {
            return {
                type: "error",
                status: error.response.status || 0,
                data: error.response.data || 0,
            };
        } else {
            return { type: "error", data: { message: error.message } };
        }
    }
};
