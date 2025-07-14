const { User } = require("../model/User")

const fetchUserById=async(req,res)=>{
    try {
        const {id}=req.user
        const user=await User.findById(id).exec()
        res.status(200).json({id:user._id,name:user.name,email:user.email ,role:user.role})
    } catch (error) {
        res.status(400).json({message:"User not found"})
    }
}
module.exports={
    fetchUserById
}