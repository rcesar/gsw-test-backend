import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required:true },
    oldBalance: { type: Number, required: true },
    value: { type: Number, required: true },
    createAt: { type: Date, default: Date.now }
});

const Withdraw = mongoose.model('Withdraw', schema);
export default Withdraw;