import MaxConcurrent from "../services/maxConcurrent";
import i18n from 'i18n';

export default (req, res, next) => {
    if(MaxConcurrent.newConnection()){
        next();
    }else{
        res.status(400).send({message:i18n.__('connection').many_operations_in_proccess})
    }
}