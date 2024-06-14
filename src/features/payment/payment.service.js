const querystring = require('qs')
const crypto = require("crypto");
const moment = require('moment-timezone');

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}
// function generateRandomNumberString(length) {
//     let result = '';
//     const characters = '0123456789';
//     for (let i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return result;
// }

module.exports = {
    createPaymentUrl: (orderId, amount) => {
        let ipAddr = '127.0.0.1';
        let tmnCode = '922PVKMW'
        let secretKey = '1E1WMFKY9G8PGM2F8V6WSUU0AD7A471W'
        let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'
        let vnpReturnUrl = 'http://localhost:8000/api/payment/return-pay'
        let vnpTxnRef = orderId
        let vnpOrderInfo = `Thanh toán đơn hàng mã ${orderId}`
        let vnpAmount = amount * 100
        let bankCode = ''
        let vnpLocale = 'vn'
        let vnpIpAddr = ipAddr
        let currCode = 'VND'
        let date = moment().tz('Asia/Ho_Chi_Minh');
        console.log(date);
        var vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Amount'] = vnpAmount;
        // vnp_Params['vnp_Merchant'] = ''
        vnp_Params['vnp_CreateDate'] = date.format('YYYYMMDDHHmmss');
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_IpAddr'] = vnpIpAddr;
        vnp_Params['vnp_Locale'] = vnpLocale;
        vnp_Params['vnp_OrderInfo'] = vnpOrderInfo;
        vnp_Params['vnp_OrderType'] = 100000;
        vnp_Params['vnp_ReturnUrl'] = vnpReturnUrl;
        vnp_Params['vnp_ExpireDate'] = date.add(15, 'minutes').format('YYYYMMDDHHmmss')
        vnp_Params['vnp_TxnRef'] = vnpTxnRef;
        console.log(vnp_Params['vnp_CreateDate'])
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);

        let signData = querystring.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
        console.log(signed);
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
        return vnpUrl;
    },
    getOrderIdAndTransactionStatus: (params) => {
        return {
            orderId: params['vnp_TxnRef'],
            status: params['vnp_TransactionStatus']
        }
    }
}