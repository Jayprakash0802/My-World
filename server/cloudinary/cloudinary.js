const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const uploadThumbnail = {
    folder: 'MY_WORLD/thumbnail',
    allowedFormats: ['jpeg', 'png', 'jpg']
}
const uploadAvatar ={
    folder: 'MY_WORLD/avatar',
    allowedFormats: ['jpeg', 'png', 'jpg']

}

module.exports = {
    cloudinary,
    uploadThumbnail,
    uploadAvatar
}