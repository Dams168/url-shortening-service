import express from 'express';
const router = express.Router();
import UrlController from '../controllers/urlController.js';

router.post('/shorten', UrlController.createShortUrl);
router.get('/shorten/:shortCode', UrlController.retrieveOriginalUrl);
router.get('/shorten/:shortCode/stats', UrlController.getUrlStats);
router.put('/shorten/:shortCode', UrlController.updateShortUrl);
router.delete('/shorten/:shortCode', UrlController.deleteShortUrl);

export default router;