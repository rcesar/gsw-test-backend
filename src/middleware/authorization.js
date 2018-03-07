import jwt from 'jsonwebtoken';
import i18n from 'i18n';
import secret from '../config/secrets';


export default (req, res, next) => {
    
    var token = req.headers['authorization'];
    
    if (token) {        
        jwt.verify(token, secret.superSecret, function (err, decoded) {
            if (err) {
                return res.status(400).send({ message: i18n.__('validation').token_wrong, code:'token_wrong' });
            } else {
                // if everything is good, save to request for use in other routes
                req.userId = decoded.userId;
                next();
            }
        });

    } else {
        return res.status(403).send({
            code:'token_not_provided',
            message: i18n.__('validation').token_not_provided
        });
    }
};