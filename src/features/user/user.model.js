const mongoose = require('mongoose');
const { hashPassword } = require('../../utils/auth');
const CONSTANT = require('../../utils/constant');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: CONSTANT.DEFAULT_AVATAR
    },
    phonenumber: {
        type: String,
        validate: {
            validator: function (v) {
                return /^0\d{9,10}$/.test(v)
            },
            message: props => `${props.value} is not a valid number!`
        }
    },
    email: {
        type: String,
        validate: {
            validator: function (v) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
        required: true
    },
    gender: {
        type: String,
        enum: {
            values: ["MALE", "FEMALE", "CUSTOM"],
            message: props => `${props.value} is not supported!`
        },
        // required: true
    },
    role: {
        type: String,
        enum: {
            values: ["CUSTOMER", "ADMIN"],
            message: props => `${props.value} is not supported`
        },
        default: "CUSTOMER",
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
        default: ''
    }
})

// userSchema.pre('save', async function (next) {
//     console.log("userModel", this);
//     if (this.isModified('password')) {
//         this.password = await hashPassword(this.password);
//     }
//     next();
// })

module.exports = User = mongoose.model('users', userSchema);