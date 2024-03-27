const {Schema, model} = require("mongoose")

const postSchema = new Schema({
    title: {
        type: String,
        required:true
    },
    category: {
        type: String,
        enum:["Agriculture","Business","Education","Entertainment","Art","Investment","Weather","Uncategorized"],
        message:"Value is not supported"
    },
    description: {
        type: String,
        required:true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    thumbnail:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
},{timestamps:true})

module.exports = model("Posts",postSchema)