import { getUserName } from "./cognito-user-cache";
import { getProduct } from "./product-cache";

const dataKey = 'cart';
const getCart = async () => {
    if (localStorage.getItem(dataKey) === null || JSON.parse(localStorage.getItem(dataKey)).length === 0) {
        // TODO: Add getCart API call
        localStorage.setItem(dataKey, JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem(dataKey));
}

const getCartCountForProduct = async (productId) => {
    if (localStorage.getItem(dataKey) === null || JSON.parse(localStorage.getItem(dataKey)).length === 0) {
        await getCart();
    }
    const cartData = JSON.parse(localStorage.getItem(dataKey));
    const fetchedCartItem = cartData.filter(data => 
        data.productId === productId
    );
    return fetchedCartItem.length === 0 ? 0 : fetchedCartItem[0].quantity;
}

const clearCart = async () => {
    // TODO: Add delete entire cart API call
    localStorage.removeItem(dataKey);
}

const addToCart = async (productId, categoryId, quantity) => {
    let cartData = await getCart();
    console.log(quantity);
    if (quantity > 0) {
        const index = cartData.findIndex(cart => 
            cart.productId === productId
        );
        if (index > -1) {
            cartData[index].quantity = quantity;
            // TODO: update product in backend via API call
        } else {
            const userId = await getUserName();
            cartData.push({
                userId: userId,
                productId: productId,
                categoryId: categoryId,
                quantity: quantity
            });
            // TODO: add product to cart via API call
        }

        // pre-emptively fetches and stores product in local storage
        getProduct(categoryId, productId);
    } else {
        cartData = cartData.filter(cart =>
            cart.productId !== productId
        );
        // TODO: remove product from cart via delete API call
    }
    localStorage.setItem(dataKey,JSON.stringify(cartData));
}

const syncLocalCartToService = async () => {
    const cartData = await getCart();
    return cartData.map(data => {
        // TODO: Add batch add API call;
        console.log('syncing cart data to backend....')
        return data;
    });
}

const getTotalCartCount = async () => {
    const cart = await getCart();
    let cartCount  = 0;
    cart.map(cartItem => {
        cartCount = cartCount + cartItem.quantity;
    });
    return cartCount;
}

export {
    getCart,
    getCartCountForProduct,
    clearCart,
    addToCart,
    syncLocalCartToService,
    getTotalCartCount
};                                                                                             