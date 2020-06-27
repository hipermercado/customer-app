import orderApi from '../Order/OrderAPI'

const dataKey = 'orders';
const timeKey = 'orders-time';

const getOrdersForPastWeek = async () => {
    const TTL = 1000 * 60 * 5; // in milliseconds

    if (localStorage.getItem(timeKey) === null || new Date().getTime() - localStorage.getItem(timeKey) > TTL) {
        localStorage.removeItem(dataKey);
    }

    if (localStorage.getItem(dataKey) === null || localStorage.getItem(dataKey).length === 0 ||
            JSON.parse(localStorage.getItem(dataKey)).length === 0) {
        let orders = [];
        try {
            orders = await orderApi.getOrdersForPastWeek();
            console.log(orders);
        } catch (error) {
            console.log(error);
        }
        localStorage.setItem(timeKey, new Date().getTime());
        localStorage.setItem(dataKey, JSON.stringify(orders));
    }
    return JSON.parse(localStorage.getItem(dataKey));
}

const clearOrdersCache = () => {
    localStorage.removeItem(dataKey);
    localStorage.removeItem(timeKey);
}


export {
    getOrdersForPastWeek,
    clearOrdersCache
};