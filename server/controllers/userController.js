const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
const userModel = require('../models/userModel');
const cartModel = require('../models/cartModel');

/**
 * generate Jwt token
 * @param id
 * @param email
 * @returns {undefined|*}
 */
const generateJwt = (email, password) => {
   return jwt.sign({ email, password }, SECRET_KEY, {expiresIn: '24h'})
};

class UserController{

    async registration(req , res, next){

        const {name, email, password, phone } = req.body;

        if(!name || !email || !phone  || !password){
            return next(ApiError.badRequest('Неккоректный name или telephone или email или password'));
        }
        //проверяем есть ли в базе такой уже пользователь
        const candidate = await userModel.getUser(email);
        //если есть
        if(candidate.email){
            return next(ApiError.badRequest('Пользователь с таким login уже существует'));
        }
        //кэшируем пароль и создаем нового пользователя
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await userModel.create(name, email, phone, hashPassword);

        // сразу для пользователя создаем корзину
        const cart = await cartModel.create(user); // надо проверить как возвращается user id

        return res.json(200);
    }

    async login (req, res, next){
        const {email, password} = req.body;

        //проверяем существует ли пользователь с таки login
        const user = await userModel.getUser(email);

        if(!user){
            return next(ApiError.internal('Пользователь не найден с таким login'));
        }
        // если логин - ок, проверяем пароль - совпадает ли он с тем что ввел пользователь
        let comparePassword = bcrypt.compareSync(password, user[0].password );
        if(!comparePassword){
            return next(ApiError.internal('Указан неверный пароль'));
        }
        const token = generateJwt(user[0].email_user, password);
        return res.json({token});
    }

    async getUser( req, res){

        const {email} = req.body;

        const user = await userModel.getUser(email);

        return res.json(user);
    }

}

module.exports = new UserController();
