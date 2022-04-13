export const setCookie = (key, value) => {
    const expiryTime = new Date();
    let time = expiryTime.getTime();
    time += 86400 * 1000 * 30;
    expiryTime.setTime(time);

    document.cookie = `${key}=${value}; expires=${expiryTime}; path=/`;
};
