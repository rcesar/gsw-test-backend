import express from 'express';

import WithdrawsModel from "../models/withdraws";
import AccountsModel from "../models/accounts";
import WithdrawsController from "../controllers/withdraws";

const router = express.Router(); 

const Account = new WithdrawsController(WithdrawsModel, AccountsModel);

router.get('/', (req, res) => Account.get(req,res));
router.get('/:id', (req, res) => Account.getById(req,res));
router.post('/', (req, res) => Account.create(req, res));

export default router;