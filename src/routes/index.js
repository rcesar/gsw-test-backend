import express from 'express';
import accountsRoute from './accounts';
import withdrawRoute from './withdraws';
import authRoute from './auth';
import authorization from '../middleware/authorization';
const router = express.Router();

router.use('/api/accounts', authorization, accountsRoute);
router.use('/api/withdraw', authorization, withdrawRoute);
router.use('/api/auth', authRoute);
router.get('/', (req, res) => res.send('Hello World!'));

export default router;