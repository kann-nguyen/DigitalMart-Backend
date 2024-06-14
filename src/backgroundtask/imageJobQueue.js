const Queue = require('bull');
const config = require('../configs/config');
const UploadService = require('../features/upload/upload.service');
const productRepo = require('../features/product/product.repo');

const imageProcessQueue = new Queue(
    config.jobQueue.queueName,
    {
        redis: {
            port: config.redis.port,
            host: config.redis.host,
            password: config.redis.password
        }
    }
)

imageProcessQueue.process(async (job, done) => {
    console.log("processing job .........");
    const { productId, newImages, deletedImages } = job.data;
    let urls = [];
    if (newImages.length > 0) urls = await UploadService.uploadMultiFile(newImages);
    done(null, { productId: productId, urls: urls, deletedImages });
})

imageProcessQueue.on("completed", async (job, result) => {
    const { productId, urls, deletedImages } = result;
    await productRepo.updateProductImage(productId, urls, deletedImages);
    console.log("completed job !!!!!!!");
})
module.exports = {
    createProcessImageJob: async (productId, newImages, deletedImages) => {
        const newJob = {
            productId: productId,
            newImages: newImages,
            deletedImages: deletedImages
        };
        await imageProcessQueue.add(newJob);
        console.log("scheduled a job");
    },
} 