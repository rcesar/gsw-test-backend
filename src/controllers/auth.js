import jwt from 'jsonwebtoken';
import i18n from 'i18n';
import secret from '../config/secrets';

class AuthController {
    constructor(Account) {
        this.Account = Account;
    };

    async login(req, res) {
        try {
            if(!req.body.user || !req.body.password){
                res.status(400).send({ message: i18n.__('validation').user_pass_not_provided, code:'user_pass_not_provided'});
                return;
            }
            let account = await this.Account.findOne({ user: req.body.user, password: req.body.password});
            // console.log(account);
            if(account){
                const payload = {
                    userId: account._id
                };
                var token = jwt.sign(payload, secret.superSecret, {
                    expiresIn: "30d" // expires in 30 days
                });
                // delete account.password;
                account.password = undefined;
                // return the information including token as JSON
                console.log(account);
                res.status(200).json({
                    user:account,
                    token: token
                });
            }else{
                res.status(400).send({ message: i18n.__('validation').user_pass_incorrect, code:'user_pass_incorrect'});
            }   
        } catch (error) {
            res.status(400).send({ err: error.message });
        }
    }

    async sign(req, res) {  
        try{
            const account = new this.Account(req.body);
            await account.save();
            this.login(req, res);
        } catch(error){
            res.status(400).send({err:error.message});
        }
    }

};

export default AuthController