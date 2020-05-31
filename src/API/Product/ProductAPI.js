import { API } from 'aws-amplify';
import { getJwtToken } from '../Cache/cognito-user-cache';

class ProductAPI {
    apiName = 'ProductAPI';
    get = async (type, categoryId, productId) => {
        let queryStringParameters = {};
        if (categoryId !== undefined) {
            queryStringParameters['categoryId'] = categoryId;
        }
        if (productId !== undefined) {
            queryStringParameters['productId'] = productId;
        }
        const path = '/master/get/customer/' + type;
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
        return response.data.data;
    }
}

const productApi = new ProductAPI();
export default productApi;