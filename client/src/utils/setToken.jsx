export const setToken = (token) => {
    const expiryTime = new Date();
    let time = expiryTime.getTime();
    time += 86400 * 1000 * 30;
    expiryTime.setTime(time);

    document.cookie = `token=${token}; expires=${expiryTime}; path=/`;
};
