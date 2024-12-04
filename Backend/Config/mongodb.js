import mongoose from "mongoose";
const connectDB=async()=>{
try{
await mongoose.connect(`${process.env.MONGODB_URL}/IPL-Ecommerce`);
console.log("Connected to MongoDB!");
}
catch(err){
    console.error(err.message);
    process.exit(1);
}
}
export default connectDB