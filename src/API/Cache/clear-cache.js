const clearAllCache = () => {
    let cart;
    if (localStorage.getItem('cart') !== null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
    localStorage.clear();
    localStorage.setItem('cart', JSON.stringify(cart));
}

export {
    clearAllCache
};