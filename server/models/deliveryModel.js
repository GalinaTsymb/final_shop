const dataBase = require('../config/db.config');
const ApiError = require('../error/ApiError');

class DeliveryModel {
    async getAll(){
        try{
            const delivery = await dataBase.promise()
                .query(`SELECT * FROM deliveries`);
            return delivery[0];

        }catch (error) {
            return ApiError.badRequest('Request not found');
        }
    }
}

module.exports = new DeliveryModel();
