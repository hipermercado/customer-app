import { API } from 'aws-amplify';
import { getJwtToken } from '../Cache/cognito-user-cache';

class ProductAPI {
    apiName = 'ProductAPI-Ramsons';
    get = async (type, categoryId, productId) => {
        let queryStringParameters = {};
        if (categoryId !== undefined) {
            queryStringParameters['categoryId'] = categoryId;
        }
        if (productId !== undefined) {
            queryStringParameters['productId'] = productId;
        }
        const path = '/get/customer/' + type;
        let jwtToken;
        try {
            jwtToken = await getJwtToken();
        } catch(error) {
            localStorage.removeItem('jwtToken');
            jwtToken = await getJwtToken();
        }
        const myInit = {
            headers: {
                Authorization: jwtToken,
            },
            response: true,
            queryStringParameters: queryStringParameters
        };
        
        const response = await API.get(this.apiName, path, myInit);
        console.log(response.data.data);
        let products = response.data.data;
        if (products && Object.keys(products).length === 0 && products.constructor === Object) {
            products = [];
        }
        return response.data.data;
    }
}

const productApi = new ProductAPI();
export default productApi;