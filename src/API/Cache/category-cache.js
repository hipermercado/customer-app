import categoryAPI from '../Category/CategoryAPI'

const getAllCategories = async () => {
    const TTL = 1000 * 60 * 60 * 3; // in milliseconds
    const dataKey = 'categories';
    const timeKey = 'categories-time';

    if (localStorage.getItem(timeKey) === null || new Date().getTime() - localStorage.getItem(timeKey) > TTL) {
        localStorage.removeItem(dataKey);
    }

    if (localStorage.getItem(dataKey) === null || localStorage.getItem(dataKey).length === 0 ||
            JSON.parse(localStorage.getItem(dataKey)).length === 0) {
        try {
            const categories = await categoryAPI.get('all');
            console.log(categories);
            localStorage.setItem(timeKey, new Date().getTime());
            localStorage.setItem(dataKey, JSON.stringify(categories));
        } catch (error) {
            console.log(error);
        }
    }
    return JSON.parse(localStorage.getItem(dataKey));
}

export {
    getAllCategories
};