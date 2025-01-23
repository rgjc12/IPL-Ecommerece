import express from "express";
import { addAddress, getAddress, deleteAddress } from "../Controllers/addressControllers.js";
import protect from "../Middleware/protect.js";

const router = express.Router();

router.post("/addAddress",protect,addAddress);
router.get("/getAddress/:userId",protect,getAddress);
router.delete("/deleteAddress/:userId",protect,deleteAddress);

export default router;

