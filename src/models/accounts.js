import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    balance: { type: Number, required: true }
});

const Account = mongoose.model('Account', schema);
export default Account;