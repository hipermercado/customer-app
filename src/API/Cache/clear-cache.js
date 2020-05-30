const clearAllCache = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('lastJwtTokenStoredTime');
    localStorage.removeItem('username');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('loginTime');
    localStorage.removeItem('address');
}

export {
    clearAllCache
};