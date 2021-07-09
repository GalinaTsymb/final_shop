const orderModel = require('../models/orderModel');
const cartModel = require('../models/cartModel');

class OrderController {

    async createOrder(req, res){
        const orderInfo = req.body;
        const idOrder = await orderModel.create(orderInfo);
        console.log('ordre', idOrder);
        return res.json(idOrder);
    }
    async createOrderDetails(req, res) {
        const orderDetails = req.body;
        const data = await orderModel.createOrderDetails(orderDetails);
        if(data) await cartModel.deleteCartDetails(orderDetails.cartId);
        return res.json(data);
    }
    async getUserOrders(req, res) {
        const {id_user} = req.body;
        const data = await orderModel.getUserOrders(id_user);
        return res.json(data);
    }
    async getOrderDetails(req,res){
        const {id_order} = req.body;
        const data = await orderModel.getOrderDetails(id_order);
        return res.json(data);
    }
}

module.exports = new OrderController();
