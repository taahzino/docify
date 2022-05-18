import "../signup.html";
import "./global";
import axios from "axios";
import { setAlert, removeAlert } from "./alerts";

const signupForm = document.querySelector("#signupForm");
const errorMsg = document.querySelector("#errorMsg");
const successMsg = document.querySelector("#successMsg");

const sendRequest = (data) => {
    axios
        .post("http://localhost:4000/api/users", data)
        .then(function (response) {
            console.log(response);
            setAlert(successMsg, response.data.message, () => {
                setTimeout(() => {
                    window.location.href = "/";
                }, 1500);
            });
        })
        .catch(function (error) {
            setAlert(errorMsg, error.response.data.message);
        });
};

const submitHandler = (e) => {
    try {
        e.preventDefault();
        removeAlert([errorMsg, successMsg]);

        const name = signupForm["name"].value.trim();
        const email = signupForm["email"].value.trim();
        const phone = signupForm["phone"].value.trim();
        const password = signupForm["password"].value.trim();
        const password2 = signupForm["password2"].value.trim();

        if (
            name.length === 0 ||
            email.length === 0 ||
            phone.length === 0 ||
            password.length === 0 ||
            password2.length === 0
        ) {
            throw new Error("All the fields are required!");
        }

        if (password !== password2) {
            throw new Error("Passwords do not match!");
        }

        sendRequest({
            name,
            email,
            phone,
            password,
        });
    } catch (error) {
        setAlert(errorMsg, error.message);
    }
};

signupForm.addEventListener("submit", submitHandler);
