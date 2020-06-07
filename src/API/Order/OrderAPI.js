import { API } from 'aws-amplify';
import { clearCart } from '../Cache/cart-cache';

class OrderAPI {
    apiName = 'OrderAPI';
    getAllOrders = async () => {
        
    }

    createOrder = async (products, address, deliveryFee) => {
        console.log(products);
        clearCart();
    }
}

const orderApi = new OrderAPI();
export default orderApi;