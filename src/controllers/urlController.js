import shortid from 'shortid';
import Url from '../models/urlModel.js';

// For Checking if the URL is valid use the URL constructor, which will throw an error if the URL is not valid.
const isValidUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch (error) {
    return false;
  }
};

export default class UrlController {
  static async createShortUrl(req, res) {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ message: 'URL is required' });
      }

      if (!isValidUrl(url)) {
        return res.status(400).json({ message: 'Invalid URL format' });
      }

      let shortCode;
      let existing;

      do {
        shortCode = shortid.generate();
        existing = await Url.findOne({ shortCode });
      } while (existing);

      const newUrl = await Url.create({ url, shortCode });
      return res.status(201).json({
        id: newUrl._id,
        url: newUrl.url,
        shortCode: newUrl.shortCode,
        createdAt: newUrl.createdAt,
        updatedAt: newUrl.updatedAt,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Server Error', error: error.message });
    }
  }

  static async retrieveOriginalUrl(req, res) {
    try {
      const { shortCode } = req.params;
      const findUrl = await Url.findOneAndUpdate(
        { shortCode: shortCode },
        { $inc: { accessCount: 1 } },
        { new: true },
      );
      if (!findUrl) {
        return res.status(404).json({ message: 'Short URL not found' });
      }
      return res.status(200).json({
        id: findUrl._id,
        url: findUrl.url,
        shortCode: findUrl.shortCode,
        createdAt: findUrl.createdAt,
        updatedAt: findUrl.updatedAt,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Server Error', error: error.message });
    }
  }

  static async updateShortUrl(req, res) {
    try {
      const { url } = req.body;
      const { shortCode } = req.params;

      if (!url) {
        return res.status(400).json({ message: 'URL is required' });
      }

      if (!isValidUrl(url)) {
        return res.status(400).json({ message: 'Invalid URL format' });
      }

      const updatedUrl = await Url.findOneAndUpdate(
        { shortCode: shortCode },
        {
          $set: {
            url: url,
            updatedAt: new Date(),
          },
        },
        { new: true },
      );

      if (!updatedUrl) {
        return res.status(404).json({ message: 'Short URL not found' });
      }

      return res.status(200).json({
        id: updatedUrl._id,
        url: updatedUrl.url,
        shortCode: updatedUrl.shortCode,
        createdAt: updatedUrl.createdAt,
        updatedAt: updatedUrl.updatedAt,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Server Error', error: error.message });
    }
  }

  static async getUrlStats(req, res) {
    try {
      const { shortCode } = req.params;
      const urlStats = await Url.findOne({ shortCode: shortCode });
      if (!urlStats) {
        return res.status(404).json({ message: 'Short URL not found' });
      }
      return res.status(200).json({
        id: urlStats._id,
        url: urlStats.url,
        shortCode: urlStats.shortCode,
        createdAt: urlStats.createdAt,
        updatedAt: urlStats.updatedAt,
        accessCount: urlStats.accessCount,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Server Error', error: error.message });
    }
  }

  static async deleteShortUrl(req, res) {
    try {
      const { shortCode } = req.params;
      const deletedUrl = await Url.findOneAndDelete({ shortCode: shortCode });
      if (!deletedUrl) {
        return res.status(404).json({ message: 'Short URL not found' });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Server Error', error: error.message });
    }
  }
}
