const mongoose=require("mongoose")

const dbConnection=async()=>{
    try {
         await mongoose.connect(process.env.MONGO_URL)
         console.log("DB is connected")
    } catch (error) {
         console.error("DB is not connected",error)
    }
   
}

module.exports={
    dbConnection
}