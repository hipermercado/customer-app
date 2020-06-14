import { clearAddressCache } from "./address-cache";
import { clearProductCache } from "./product-cache";
import { clearCart, getCart } from "./cart-cache";
import { clearCategoryCache } from "./category-cache";

const clearAllCache = () => {
    getCart().then(cart => {
        localStorage.clear();
        localStorage.setItem('cart', JSON.stringify(cart));
    }).catch(err => console.log(err));
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