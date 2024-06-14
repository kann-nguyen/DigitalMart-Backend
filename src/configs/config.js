require('dotenv').config();

const config = {
    mongo: {
        uri: process.env.MONGO_URI
    },
    redis: {
        password: process.env.REDIS_PASSWORD,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        username: process.env.REDIS_USERNAME
    },
    jwt: {
        secretKey: process.env.SECRET_KEY,
        ACC_TOKEN_TTL: '5h',
        REF_TOKEN_TTL: '10h'
    },
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET
    },
    email: {
        appPassword: process.env.APP_PASSWORD
    },
    jobQueue: {
        queueName: 'imageProcessQueue'
    },
    payment: {
        vnp_Url: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
        vnp_TmnCode: '922PVKMW',
        vnp_HashSecret: '1E1WMFKY9G8PGM2F8V6WSUU0AD7A471W',
        vnp_ReturnUrl: 'http://127.0.0.1/api/payment/vnpay_return'
    }
}

module.exports = config;