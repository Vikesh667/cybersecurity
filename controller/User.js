const { User } = require("../model/User")


const fetchAllUser=async(req,res)=>{
    try {
         const user=await User.find().exec()
         res.status(200).json({success:true,user})
    } catch (error) {
        res.status(400).json({message:"User not found"})
    }
}
const fetchUserById=async(req,res)=>{
    try {
        const {id}=req.user
        const user=await User.findById(id).exec()
        res.status(200).json({id:user._id,name:user.name,email:user.email ,role:user.role})
    } catch (error) {
        res.status(400).json({message:"User not found"})
    }
}
const getUserById=async(req,res)=>{
    try {
        const {id}=req.params
        const user=await User.findById(id).exec()
         res.status(200).json({id:user._id,name:user.name,email:user.email ,role:user.role})
    } catch (error) {
         res.status(400).json({message:"User not found"})
         console.log(error)
    }
}
const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {...req,body};
    if(req.file){
     updateData.image=req.file.path
    }
    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user); 
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: `User ${deletedUser.email} deleted successfully` });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports={
    fetchUserById,
    fetchAllUser,
    deleteUser,
    getUserById,
    updateUserById
}