import express, { Router } from "express";
import * as controller from "../controllers/book-controller";

const router: Router = express.Router();

router.get("/", controller.getBooks);

router.get("/:id", controller.getBookById);

router.post("/", controller.createBook);

router.put("/:id", controller.updateBook);

router.delete("/:id", controller.deleteBook);

export default router;