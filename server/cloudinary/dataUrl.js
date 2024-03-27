const dataUriParser= require('datauri/parser')
const path = require('path')

const getUri = (file) =>{
    const parser = new dataUriParser()
    const extName = path.extname(file.originalname).toString()
    return parser.format(extName,file.buffer).content;
}

module.exports = {getUri}