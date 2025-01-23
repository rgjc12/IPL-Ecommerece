import {v2 as cloudinary} from 'cloudinary';
const cloudinaryConfig=async()=>{
    cloudinary.config({
        cloud_name:process.env.CLOUDINARY_CLOUDNAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_SECRET_KEY
    })
}
export default cloudinaryConfig;
