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
        let categories = [];
        try {
            categories = await categoryAPI.get('all');
            console.log(categories);
        } catch (error) {
            console.log(error);
        }
        localStorage.setItem(timeKey, new Date().getTime());
        localStorage.setItem(dataKey, JSON.stringify(categories));
    }
    return JSON.parse(localStorage.getItem(dataKey));
}

const clearCategoryCache = () => {
    let arr = []; 
    for (let i = 0; i < localStorage.length; i++){
        if (localStorage.key(i).substring(0,10) == 'categories') {
            arr.push(localStorage.key(i));
        }
    }

    for (let i = 0; i < arr.length; i++) {
        localStorage.removeItem(arr[i]);
    }
}

export {
    getAllCategories,
    clearCategoryCache
};