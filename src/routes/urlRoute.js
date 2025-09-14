import express from 'express';
const router = express.Router();
import UrlController from '../controllers/urlController.js';

router.post('/shorten', UrlController.createShortUrl);
router.get('/shorten/:shortCode', UrlController.retrieveOriginalUrl);

export default router;