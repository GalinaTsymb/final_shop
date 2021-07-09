const dataBase = require('../config/db.config');
const ApiError = require('../error/ApiError');

class UserModel {

    async create(name, email, phone, hashPassword){

        try{
            const [user] = await dataBase.promise().query(`INSERT INTO users(name, email_user, phone, password) VALUES('${name}','${email}','${phone}','${hashPassword}')`);

            return user.insertId;
        }catch(error){

            return ApiError.badRequest('Request not found');
        }
    }

    async getUser(email){

        try{
            const user = await dataBase.promise().query(`SELECT * FROM users WHERE email_user = '${email}'`);
            return user[0];
        }
        catch (error){
            return ApiError.badRequest('Request not found');
        }
    }


    async updateUser(userNewInfo){

        try{
            const [updateUser] = await dataBase.promise().query(`UPDATE users SET name='${userNewInfo.name}', phone = '${userNewInfo.phone}' , surname = '${userNewInfo.surname}' , city = '${userNewInfo.city}', address = '${userNewInfo.address}',branchNP = ${userNewInfo.branchNP} WHERE id_user = '${userNewInfo.id_user}'`);

            return updateUser;
        }
        catch (error){
            return ApiError.badRequest('Request not found');
        }
    }

}
module.exports = new UserModel();
