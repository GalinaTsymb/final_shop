const paymentModel = require('../models/paymentModel');

class PaymentController{

    async getAll(req, res){

        const payments = await paymentModel.getAll();
        return res.json(payments);
    }
}

module.exports = new PaymentController();
