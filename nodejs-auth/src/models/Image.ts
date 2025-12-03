import mongoose, { Document } from "mongoose";

export interface IImage extends Document {
  url: string;
  publicId: string;
  uploadedBy: mongoose.Types.ObjectId;
}

interface IImageModel extends mongoose.Model<IImage> { }

const ImageSchema = new mongoose.Schema<IImage, IImageModel>({
  url: {
    type: String,
    required: true,
    message: "Image URL is required",
  },
  publicId: {
    type: String,
    required: true,
    message: "Public ID is required",
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    message: "Uploader is required",
  },
}, { timestamps: true });

const Image = mongoose.model<IImage, IImageModel>("Image", ImageSchema);

export default Image;