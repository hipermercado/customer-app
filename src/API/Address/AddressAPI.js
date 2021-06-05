import Amplify, { Auth, API } from 'aws-amplify';
import { getJwtToken, getUserName } from '../Cache/cognito-user-cache';

class AddressAPI {
    apiName = 'AddressAPI-Ramsons';
    getAddressForCurrentUser = async () => {
        let queryStringParameters = {};
        const userId = await getUserName();
        if (userId === undefined) {
            Auth.signOut();
        }
        queryStringParameters = {
            'userId':  userId
        }
    
        const path = '/get/';
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
        const address = response.data.data;
        console.log(response.data.data);
        if (address.length > 0) {
            return address[0]; 
        }
        return {};
    }

    add = async (body) => {
        const userId = await getUserName();
        if (userId === undefined) {
            Auth.signOut();
        }
        body.userId = userId;
        const path = '/add'; 
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
            body: body,
            response: true,
        };

        const response = await API.post(this.apiName, path, myInit);
        console.log(response);
        return response;
    }
}

const addressApi = new AddressAPI();
export default addressApi;