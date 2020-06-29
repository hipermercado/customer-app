import { API } from 'aws-amplify';
import { getJwtToken } from '../Cache/cognito-user-cache';

class CategoryAPI {
    apiName = 'CategoryAPI';
    get = async (type, categoryId) => {
        let queryStringParameters = {};
        if (categoryId !== undefined) {
            queryStringParameters = {
                'categoryId': categoryId 
            }
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
            queryStringParameters: queryStringParameters // OPTIONAL
        };
        
        const response = await API.get(this.apiName, path, myInit);
        console.log(response.data.data);
        let categories = response.data.data;
        if (categories && Object.keys(categories).length === 0 && categories.constructor === Object) {
            categories = [];
        }
        return categories;
    }
}

const categoryApi = new CategoryAPI();
export default categoryApi;