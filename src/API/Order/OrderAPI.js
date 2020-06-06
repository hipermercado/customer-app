import { API } from 'aws-amplify';
import { clearCart } from '../Cache/cart-cache';

class OrderAPI {
    apiName = 'OrderAPI';
    getAllOrders = async () => {
        
    }

    createOrder = async (userId, products, totalQuantity, totalPrice) => {
        clearCart();
    }
}

const productApi = new ProductAPI();
export default productApi;