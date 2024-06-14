const mongoose = require('mongoose');
const { removeVersionKey } = require('../../configs/db.plugin');
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    }
})

categorySchema.plugin(removeVersionKey);
const Category = mongoose.model("categories", categorySchema);

module.exports = { categorySchema, Category };