const { Popup } = require("../model/PopModel");


const popupController = async (req, res) => {
  try {
 
    const pops = await Popup.create(req.body);
    res.status(201).json({ message: "Popup created successfully", pops });
  } catch (error) {
    res.status(500).json({ message: "Failed to create popup", error: error.message });
  }
};


const updatePopupPostion = async (req, res) => {
  try {
    const popup = await Popup.findOne();
    if (!popup) {
      return res.status(404).json({ message: "Popup not found" });
    }

    // Only update provided fields
    if (req.body.position?.top) popup.position.top = req.body.position.top;
    if (req.body.position?.left) popup.position.left = req.body.position.left;
    if (req.body.position?.text) popup.position.text = req.body.position.text;

    await popup.save();
    res.status(200).json({ message: "Popup updated", popup });
  } catch (error) {
    res.status(500).json({ message: "Error updating popup", error });
  }
};

const getPosition=async(req,res)=>{
 try {
       const position=await Popup.find()
    res.status(200).json({success:true,position:position[0]})
 } catch (error) {
    res.status(401).json({success:false,error:error})
 }
}
module.exports = { popupController, updatePopupPostion ,getPosition};
