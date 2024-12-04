import mongoose from "mongoose";

const rcbProductSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  imageUrl: {
    type: Array,
    required: true,
  },
  isTrending: {
    type: Boolean,
    default: false,
  },
});

const RCBProduct = mongoose.models.RCBProduct || mongoose.model('RCBProduct', rcbProductSchema);
export default RCBProduct;
