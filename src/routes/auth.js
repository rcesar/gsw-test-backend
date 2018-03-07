import express from 'express';

import AccountsModel from "../models/accounts";
import AuthController from "../controllers/auth";

const router = express.Router();

const Auth = new AuthController(AccountsModel);

router.post('/login/', (req, res) => Auth.login(req, res));
router.post('/sign/', (req, res) => Auth.sign(req, res));

export default router;