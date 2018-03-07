import express from 'express';

import AccountsModel from "../models/accounts";
import AccountsController from "../controllers/accounts";

const router = express.Router(); 

const Account = new AccountsController(AccountsModel);

router.get('/', (req, res) => Account.get(req,res));
router.get('/:id', (req, res) => Account.getById(req,res));
router.post('/', (req, res) => Account.create(req, res));
router.put('/:id', (req, res) => Account.update(req, res));
router.delete('/:id', (req, res) => Account.destroy(req, res));

export default router;