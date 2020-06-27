import { clearCart } from '../Cache/cart-cache';
import Amplify, { Auth, API } from 'aws-amplify';
import { getJwtToken, getUserName } from '../Cache/cognito-user-cache';

class OrderAPI {
    apiName = 'OrdersAPI';

    getOrdersFromPastXMilliseconds = async (deltaTime) => {
        let queryStringParameters = {};
        const userId = await getUserName();
        if (userId === undefined) {
            Auth.signOut();
        }

        if (deltaTime) {
            const timeStamp = Date.now() - deltaTime;
            queryStringParameters = {
                'userId':  userId,
                'timeStamp': timeStamp.toString()
            }
        } else {
            queryStringParameters = {
                'userId':  userId,
            }
        }

        const path = '/master/get/';
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
        const orders = response.data.data;
        console.log(response.data.data);
        return orders;
    }

    getOrdersForPastWeek = async () => {
        return this.getOrdersFromPastXMilliseconds(7 * 24 * 60 * 60 * 1000);
    }

    createOrder = async (products, address, deliveryFee) => {
        console.log(products);
        const userId = await getUserName();
        if (userId === undefined) {
            Auth.signOut();
        }
        const path = '/master/add'; 
        let jwtToken;
        try {
            jwtToken = await getJwtToken();
        } catch(error) {
            localStorage.removeItem('jwtToken');
            jwtToken = await getJwtToken();
        }

        const transformedAddress = {...address};
        if (transformedAddress.isDefault) {
            delete transformedAddress.isDefault;
        }
        if (transformedAddress.userId) {
            delete transformedAddress.userId;
        }

        const transformedProducts = products.map(product => {
            if (product.inventory) {
                delete transformedAddress.inventory;
            }
            if(product.userId) {
                delete product.userId;
            }
            product.quantity = product.quantity.toString();
            return product;
        })

        const body = {
            userId: userId,
            products: transformedProducts,
            address: transformedAddress,
            deliveryFee: deliveryFee
        }

        console.log(body);

        const myInit = {
            headers: {
                Authorization: jwtToken,
            },
            body: body,
            response: true,
        };

        const response = await API.post(this.apiName, path, myInit);
        console.log(response);
        clearCart();
        return response;
    }
}

const orderApi = new OrderAPI();
export default orderApi;