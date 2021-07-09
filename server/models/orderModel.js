const dataBase = require('../config/db.config');
const ApiError = require('../error/ApiError');

class OrderModel{

    async create(orderInfo){

        try{
            const order = await dataBase.promise().query(`INSERT INTO orders( id_user, id_payment, id_delivery, status ) VALUES (${orderInfo.id_user},${orderInfo.id_payment}, ${orderInfo.id_delivery}, '${orderInfo.status}')`);

            return order[0].insertId;
        }catch(error){
            return ApiError.badRequest('Request not found');
        }
    }

    async createOrderDetails(orderDetails){

        const orderItem = [];
        for(let i = 0; i < orderDetails.cartItems.length; i++)
            orderItem[i] = [
                orderDetails.order,
                orderDetails.cartItems[i].id_prod,
                orderDetails.cartItems[i].qty,
                +orderDetails.cartItems[i].price_prod
            ];

       try{

           const [order] = await dataBase.promise().query(`INSERT INTO order_details( id_order, id_product, qty, price ) VALUES ?`, [orderItem]);
           const updateOrders = await dataBase.promise().query('CALL updateOrders');
            return order;

        }catch(error){
            return ApiError.badRequest('Request not found');
        }
    }

    async getUserOrders(id_user){
        try{
            const [orders] = await dataBase.promise().query(`SELECT * FROM orders WHERE id_user = ${id_user}`);
            return orders;
        }catch(error){
            return ApiError.badRequest('Request not found');
        }
    }

    async getOrderDetails(id_order){
        try{
            const [orderDetails] = await dataBase.promise().query(`SELECT Pr.name_prod, Pr.image, OD.qty, OD.price, OD.summa FROM order_details as OD JOIN products as Pr WHERE id_order = ${id_order} AND OD.id_product = Pr.id_prod`);

            return orderDetails;
        }catch(error){
            return ApiError.badRequest('Request not found');
        }
    }
}

module.exports = new OrderModel();
