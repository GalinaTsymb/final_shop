const deliveryModel = require('../models/deliveryModel');

class DeliveryController{

    async getAll(req, res){

        const delivery = await deliveryModel.getAll();
        return res.json(delivery);
    }
}

module.exports = new DeliveryController();
