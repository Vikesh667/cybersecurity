const mongoose=require("mongoose")

const dbConnection=async()=>{
    try {
         await mongoose.connect("mongodb://127.0.0.1:27017")
         console.log("DB is connected")
    } catch (error) {
         console.error("DB is not connected",error)
    }
   
}

module.exports={
    dbConnection
}