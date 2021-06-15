const dataBase = require('../config/db.config');
const ApiError = require('../error/ApiError');

class UserModel {

    async create(name, email, phone, hashPassword){

        try{
            const user = await dataBase.promise().query(`INSERT INTO users(name_user, email_user, phone_user, password) VALUES('${name}','${email}','${phone}','${hashPassword}')`);

            return user[0].insertId;
        }catch(error){

            return ApiError.badRequest('Request not found');
        }
    }

    async getUser(email){

        try{
            const userLogin = await dataBase.promise().query(`SELECT * FROM users WHERE email_user = '${email}'`);
            return userLogin[0];
        }
        catch (error){
            return ApiError.badRequest('Request not found');
        }
    }


    update(){

    }

    delete(){

    }
}
module.exports = new UserModel();
