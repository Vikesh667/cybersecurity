const { Message } = require("../model/Message");

const userMessage = async (req, res) => {
  try {
    const io = req.app.get("io");
    const message = await Message.create(req.body);

    if (!message) {
      res.status(300).json({ error: "Something went wrong" });
    }
    io.emit("message", message);
    res.status(200).json({ message: "Your message is submited", message });
  } catch (error) {
    res.status(300).json({ error: "Somthing went wrong" });
  }
};
const getAllMessage = async (req, res) => {
  try {
    const message = await Message.find();
    if (!message) {
      res.status(301).json({ message: "Message not found" });
    }
    res.status(200).json({ message });
  } catch (error) {}
};
const deleteMessage=async(req,res)=>{
   try {
    const {id}=req.params
    const deletedMessages=await Message.findByIdAndDelete(id)
    if(!deletedMessages){
      res.status(301).json({message:"Something wrong while deleting the message"})
    }
    res.status(201).json({message:"The message is deleted successfully"})
   } catch (error) {
     res.status(404).json({error:error})
   }
}

module.exports = { userMessage, getAllMessage ,deleteMessage};
