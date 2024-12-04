import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Remove leading and trailing whitespace
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure no duplicate emails
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validate email format
    },
    password: {
      type: String,
      required: true,
    },
    iplTeamNumber: {
      type: Number,
      required: true,
      min: 0,
      max: 2, 
    },
    cart: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", 
        },
        quantity: {
          type: Number,
          min: 1, 
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
