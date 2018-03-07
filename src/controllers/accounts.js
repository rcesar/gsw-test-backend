import i18n from 'i18n';

class AccountsController {
  constructor(Account) {
    this.Account = Account;
  };

  async get (req, res){
      try {
        res.send(await this.Account.find());  
      } catch (error) {
        res.status(400).send({err:error.message});
      }
  }

  async getById (req, res){
      try {
        res.send(await this.Account.findOne({_id:req.params.id}));  
      } catch (error) {
        res.status(400).send({err:error.message});
      }
  }

  async create(req, res){
      try{
          const account = new this.Account(req.body);
          const result = await this.Account.find({user:req.body.user});
          if(result.length > 0){
            return res.status(400).send({ message: i18n.__('validation').user_already_exists, code:'user_already_exists' });    
          }
          return res.status(201).send(await account.save());
      } catch (error){ 
        return res.status(400).send({ err: error.message });
      }
  }
  
  async update(req, res){
      try{
        const accountUpdate = await this.Account.findOneAndUpdate({ _id: req.params.id }, req.body); 
        res.status(200).send({_id:req.params.id, updated:req.body});
      } catch (error){ 
        res.status(400).send({ err: error.message });
      }
  }

  async destroy(req, res){
      try{
        const accountRemove = await this.Account.remove({ _id: req.params.id });
        if(accountRemove.n > 0)
          res.status(200).send({_id: req.params.id });
        else
          res.status(400).send({ message: i18n.__('validation').id_not_exists, code: 'id_not_exists' });
      } catch (error){ 
        res.status(400).send({ err: error.message });
      }
  }
};

export default AccountsController