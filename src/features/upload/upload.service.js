const { BadRequest } = require("../../utils/createError");
const { uploadToCloudinary } = require("./cloudinary.service");

module.exports = {
    uploadMultiFile: async (files) => {
        const urls = await Promise.all(files.map(async (file) => {
            try {
                const url = await uploadToCloudinary(file.buffer);
                return url;
            } catch (err) {
                console.log("upload error: ", err);
                return null;
            }
        }));
        return urls.filter(url => url !== null);
    },
    uploadSingleFile: async (file) => {
        if (!file) throw BadRequest("File is empty");
        const url = await uploadToCloudinary(file.buffer);
        return url;
    }
}

