import e from "express";
import cloudinary from "../config/cloudinary";

const uploadToCloudinary = async (
  filePath: string,
  folder: string
): Promise<unknown> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
    });
    return {
      url: result.secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error}`);
  }
};

const deleteFromCloudinary = async (
  publicId: string
): Promise<unknown> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(`Cloudinary deletion failed: ${error}`);
  }
};

export { uploadToCloudinary, deleteFromCloudinary };