const mongoose=require("mongoose")
const photoSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    imageUrl:{
      type:String,
      required:true
    },
    publicId:{
        type:String,
        required:true
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})
const Photo=mongoose.model("Photo",photoSchema)
module.exports={Photo}