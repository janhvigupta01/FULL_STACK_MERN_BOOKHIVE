import mongoose from "mongoose"

export const connectDb = async()=>{
    try {
        const res = await mongoose.connect(process.env.MONGO_DB_URL);
        if(res){
            console.log("connected Successfully");
        }
    } catch (error) {
        console.log(error);
    }
}