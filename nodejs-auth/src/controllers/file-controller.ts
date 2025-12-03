import Image from "../models/Image";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { uploadToCloudinary, deleteFromCloudinary } from "../helpers/cloudinary-helper";
import { JwtPayload } from "jsonwebtoken";

interface UploadImageRequest extends Request {
  file?: Express.Multer.File;
  userInfo?: JwtPayload & { id: string; role: string };
}

const uploadFile = async (req: UploadImageRequest, res: Response): Promise<Response> => {
  try {
    if (!req.file) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "File is required. Please upload an image.",
        success: false
      });
    }
    const filePath = req.file.path;

    const uploadResult = await uploadToCloudinary(filePath, "images");

    const newImage = await Image.create({
      url: (uploadResult as any).url,
      publicId: (uploadResult as any).publicId,
      uploadedBy: req.userInfo?.id
    });

    return res.status(StatusCodes.OK).json({
      message: "Image uploaded successfully",
      success: true,
      image: newImage
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Image upload failed",
      error: errorMessage
    });
  }
}

const deleteImage = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id);
    if (!image) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Image not found",
        success: false
      });
    }
    await deleteFromCloudinary(image.publicId);
    await image.deleteOne();
    return res.status(StatusCodes.OK).json({
      message: "Image deleted successfully",
      success: true
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Image deletion failed",
      error: errorMessage
    });
  }
}

export { uploadFile, deleteImage };