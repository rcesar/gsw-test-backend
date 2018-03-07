import withdrawService from '../services/withdraw';
import i18n from 'i18n';

class WithdrawsController {
  constructor(Withdraw, Account) {
    this.Withdraw = Withdraw;
    this.Account = Account;
  };

  async get (req, res){
      try {
        res.send(await this.Withdraw.find({account_id:req.userId}).sort({createAt: -1}));  
      } catch (error) {
        res.status(400).send({err:error.message});
      }
  }

  async getById (req, res){
      try {
        res.send(await this.Withdraw.findOne({ _id: req.params.id, account_id: req.userId}));  
      } catch (error) {
        res.status(400).send({err:error.message});
      }
  }

  async create(req, res){
      try{
        const user = await this.Account.findOne({_id:req.userId});

        if(req.body.value > user.balance)
          return res.status(400).send({ message: i18n.__('validation').balance_insuficient, code:'balance_insuficient'});          
        
        if (!withdrawService.validateValue(req.body.value))
          return res.status(400).send({ message: i18n.__('validation').not_available_money_bills, code:'not_available_money_bills'})
        
        const notes = withdrawService.getNotes(req.body.value);

        let data = Object.assign({}, req.body, { account_id: req.userId, oldBalance: user.balance});
        const withdraw = new this.Withdraw(data);
        await withdraw.save();
        user.balance -= req.body.value;
        await user.save();
        res.status(201).send({newBalance:user.balance, withdrawValue:req.body.value, notes});
      } catch (error){ 
        res.status(400).send({ err: error.message });
      }
  }
};

export default WithdrawsController