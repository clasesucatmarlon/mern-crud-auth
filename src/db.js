import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // await mongoose.connect("mongodb+srv://clasesucatmarlon:clasesucatmarlon@cluster0.5sz4bju.mongodb.net");
        await mongoose.connect("mongodb://localhost:27017/merndb");
        
        console.log("  >>>>> Mongo is now conected... ")
    } catch (error) {
        console.log("Error connecting to  MONGO.....")
    }
}