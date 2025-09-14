import express from 'express';
const router = express.Router();
import UrlController from '../controllers/urlController.js';

router.post('/shorten', UrlController.createShortUrl);

export default router;