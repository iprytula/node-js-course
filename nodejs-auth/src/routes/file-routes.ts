import express from "express";
import { uploadFile, deleteImage } from "../controllers/file-controller";

const fileRouter = express.Router();

fileRouter.post("/", uploadFile as express.RequestHandler);
fileRouter.delete("/:id", deleteImage);

export default fileRouter;