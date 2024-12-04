import mongoose from "mongoose";

const kkrProductSchema = new mongoose.Schema({
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

const KKRProduct = mongoose.models.KKRProduct || mongoose.model('KKRProduct', kkrProductSchema);
export default KKRProduct;
