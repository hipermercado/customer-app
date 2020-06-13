import { clearAddressCache } from "./address-cache";
import { clearProductCache } from "./product-cache";
import { clearCart } from "./cart-cache";
import { clearCategoryCache } from "./category-cache";

const clearAllCache = () => {
    let cart;
    if (localStorage.getItem('cart') !== null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
    localStorage.clear();
    localStorage.setItem('cart', JSON.stringify(cart));
}

const clearSeviceCache = () => {
    clearAddressCache();
    clearProductCache();
    clearCategoryCache();
    clearAddressCache();
}

export {
    clearAllCache,
    clearSeviceCache
};