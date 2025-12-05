import express from "express";
import { uploadImage, deleteImage } from "../controllers/file-controller";

const fileRouter = express.Router();

fileRouter.post("/", uploadImage as express.RequestHandler);
fileRouter.delete("/:id", deleteImage);

export default fileRouter;