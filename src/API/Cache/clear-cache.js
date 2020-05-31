const clearAllCache = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('lastJwtTokenStoredTime');
    localStorage.removeItem('username');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('address');
}

export {
    clearAllCache
};