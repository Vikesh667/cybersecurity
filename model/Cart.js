const mongoose=require("mongoose")


const cartSchema=new mongoose.Schema({
    quantity:{
        type:Number,
        required:true,
    },
    product:{
       type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:"User",required:true
    }
})
const Cart= new mongoose.model("Cart",cartSchema)
module.exports =Cart