import productApi from '../Product/ProductAPI'

const getProductForCategory = async (categoryId) => {
    const TTL = 1000 * 60 * 60; // in milliseconds
    const dataKey = 'product-' + categoryId;
    const timeKey = 'product-' + categoryId + "-time";

    if (localStorage.getItem(timeKey) === null || new Date().getTime() - localStorage.getItem(timeKey) > TTL) {
        localStorage.removeItem(dataKey);
    }

    if (localStorage.getItem(dataKey) === null || JSON.parse(localStorage.getItem(dataKey)).length === 0 ||
            JSON.parse(localStorage.getItem(dataKey)).length === 0) {
        try {
            const products = await productApi.get('all', categoryId);
            console.log(products);
            localStorage.setItem(timeKey, new Date().getTime());
            localStorage.setItem(dataKey, JSON.stringify(products));
        } catch (error) {
            console.log(error);
        }
    }
    return JSON.parse(localStorage.getItem(dataKey));
}

const getProduct = async (categoryId, productId) => {
    const TTL = 1000 * 60 * 60;; // in milliseconds, 1000 * sec * min * hour * day * year
    const dataKey = 'product-' + categoryId + "-" + productId;
    const timeKey = 'product-' + categoryId + "-" + productId + "-time";

    if (localStorage.getItem(timeKey) === null || new Date().getTime() - localStorage.getItem(timeKey) > TTL) {
        localStorage.removeItem(dataKey);
    }

    if (localStorage.getItem(dataKey) === null || JSON.parse(localStorage.getItem(dataKey)).length === 0) {
        try {
            const products = await productApi.get('single', categoryId, productId);
            console.log(products);
            if (products.length > 0) {
                const product = products[0];
                localStorage.setItem(timeKey, new Date().getTime());
                localStorage.setItem(dataKey, JSON.stringify(product));
            }
        } catch (error) {
            console.log(error);
        }
    }
    return JSON.parse(localStorage.getItem(dataKey));
}

const clearProductCache = () => {
    let arr = []; 
    for (let i = 0; i < localStorage.length; i++){
        if (localStorage.key(i).substring(0,7) == 'product') {
            arr.push(localStorage.key(i));
        }
    }

    for (let i = 0; i < arr.length; i++) {
        localStorage.removeItem(arr[i]);
    }
}

export {
    getProductForCategory,
    getProduct,
    clearProductCache
};