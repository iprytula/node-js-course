import express from 'express';
import { createAuthor, createBook } from '../controllers/book-controller.js';

const router = express.Router();

router.post('/author', createAuthor);
router.post('/book', createBook);

export default router;