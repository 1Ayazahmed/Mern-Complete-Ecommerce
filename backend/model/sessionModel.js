import mongoose from "mongoose";


const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  // it will be served for userModel as well 
    },
  },
  {
    timestamps: true,
  }
);


export const Session = mongoose.model('Session',sessionSchema)