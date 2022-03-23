export const setAlert = (alert, msg, callback) => {
    alert.style.display = "block";
    if (alert == errorMsg) {
        alert.innerHTML = "<b>Error: </b>" + msg;
    } else {
        alert.innerHTML = "<b>Success: </b>" + msg;
    }

    if (callback) {
        callback();
    }
};

export const removeAlert = (alerts) => {
    alerts.forEach((alert) => {
        alert.style.display = "none";
    });
};
