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
        const [candidate] = await userModel.getUser(email);

        //если есть
        if(candidate){

            return res.status(400).send({
                statusText: 'Пользователь с таким email уже существует. Попробуйте еще раз!!!'
            });

        }else{
            //кэшируем пароль и создаем нового пользователя
            const hashPassword = await bcrypt.hash(password, 5);
            const user = await userModel.create(name, email, phone, hashPassword);

            // сразу для пользователя создаем корзину
            const cart = await cartModel.create(user); // надо проверить как возвращается user id

            return res.status(200).send({
                statusText: 'Вы успешно зарегистрировались'
            });
        }
    }

    async login (req, res){

        try{
            const {email, password} = req.body;
            //проверяем существует ли пользователь с таки login
            const user = await userModel.getUser(email);

            if(user.length === 0){
                return res.status(400).send({
                    statusText: 'Пользователь не найден с таким login. Попробуйте еще раз или зарегистрируйтесь!!!'
                });
            }
            // если логин - ок, проверяем пароль - совпадает ли он с тем что ввел пользователь
            let comparePassword = bcrypt.compareSync(password, user[0].password );
            if(!comparePassword){
                return res.status(400).send({
                    statusText: 'Неверный пароль!!!'
                });
            }
            const token = generateJwt(user[0].email_user, password);
            return res.json({user: user[0].email_user, token});
        }catch(error){
            return res.status(400).send({
                statusText: 'Упсс'
            });
        }
    }

    async getUser( req, res){
        const {login} = req.body;
        const [user] = await userModel.getUser(login);
        return res.json(user);
    }
   async updateUser( req, res){
       const userNewInfo = req.body;
       const data = await userModel.updateUser(userNewInfo);
       return res.json(data);
   }

}

module.exports = new UserController();
