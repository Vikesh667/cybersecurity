const { Photo } = require("../model/Marquee");

const getAllMarqueImage=async(req,res)=>{
   try {
      const marquees=await Photo.find()
      if(!marquees){
        res.status(401).json({error:"Marquee image is not found"})
      }else{
        res.status(202).json({success:true,marquees})
      }
   } catch (error) {
     res.status(301).json({error:"Something wrong while fetching"})
   }
}
const imageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }
    const { title } = req.body;
    const newPhoto = new Photo({
      title,
      imageUrl: req.file.path,
      publicId: req.file.filename,
    });

    await newPhoto.save();

    res.status(201).json({
      message: "Image uploaded successfully",
      photo: newPhoto,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      error: "Something went wrong",
      details: error.message,
    });
  }
};

module.exports = { imageUpload };



module.exports={imageUpload,getAllMarqueImage}