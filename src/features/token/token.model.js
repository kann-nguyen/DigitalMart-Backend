const mongoose = require('mongoose');
const { removeVersionKey } = require('../../configs/db.plugin');
const { Schema } = mongoose;

const tokenSchema = new Schema({
    refreshToken: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    }
})

tokenSchema.plugin(removeVersionKey)
const Token = mongoose.model('tokens', tokenSchema);
module.exports = Token;