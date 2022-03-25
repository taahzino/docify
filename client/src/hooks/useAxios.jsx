import axios from "axios";

const { REACT_APP_SERVER_URL: SERVER_URL } = process.env;

export const useAxios = async (method, path, data = {}, Authorization) => {
    try {
        const response = await axios({
            method,
            url: `${SERVER_URL}${path}`,
            data: {
                ...data
            },
            headers: {
                Authorization
            }
        });

        return {
            type: "success",
            status: response.status,
            data: response.data
        };
    } catch (error) {
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
