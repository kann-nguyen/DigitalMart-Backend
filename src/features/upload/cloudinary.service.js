const cloudinary = require('cloudinary').v2;
const config = require('../../configs/config');

cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
    secure: true
})

module.exports = {
    uploadToCloudinary: async (buffer) => {
        // console.log(typeof buffer);
        const uploadResult = await new Promise((resolve) => {
            cloudinary.uploader.upload_stream({
                folder: 'digital-mart',
                use_filename: true
            }, (error, uploadResult) => {
                return resolve(uploadResult);
            }).end(buffer)
        })
        console.log(uploadResult);
        return uploadResult.url;
    }
}