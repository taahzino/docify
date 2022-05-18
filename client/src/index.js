import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./styles/global.css";
import "./fonts/VarelaRound.css";
import "./fonts/Ubuntu.css";
import "./fonts/Poppins.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
