const dataBase = require('../config/db.config');
const ApiError = require('../error/ApiError');

class PaymentModel {
    async getAll(){
        try{
            const payments = await dataBase.promise()
                .query(`SELECT * FROM payment`);
            return payments[0];

        }catch (error) {
            return ApiError.badRequest('Request not found');
        }
    }
}

module.exports = new PaymentModel();
