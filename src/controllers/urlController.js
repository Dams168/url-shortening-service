import shortid from "shortid";
import Url from "../models/urlModel.js";

export default class UrlController {
    static async createShortUrl(req, res) {
        try {
            const { url } = req.body;
            const shortCode = shortid.generate();
            if (!url) {
                return res.status(400).json({ message: "URL is required" });
            }

            const newUrl = await Url.create({
                url: url,
                shortCode: shortCode,
            })
            return res.status(201).json({
                message: "Short URL created successfully",
                data: {
                    id: newUrl._id,
                    url: newUrl.url,
                    shortCode: newUrl.shortCode,
                    createdAt: newUrl.createdAt,
                    updatedAt: newUrl.updatedAt
                }
            });
        } catch (error) {
            return res.status(500).json({ message: "Server Error", error: error.message });
        }
    }

    static async retrieveOriginalUrl(req, res) {
        try {
            const { shortCode } = req.params;
            const findUrl = await Url.findOneAndUpdate(
                { shortCode: shortCode },
                { $inc: { accessCount: 1 } },
                { new: true }
            );
            if (!findUrl) {
                return res.status(404).json({ message: "Short URL not found" });
            }
            return res.status(200).json({
                message: "Original URL retrieved successfully",
                data: {
                    id: findUrl._id,
                    url: findUrl.url,
                    shortCode: findUrl.shortCode,
                    createdAt: findUrl.createdAt,
                    updatedAt: findUrl.updatedAt
                }
            });
        } catch (error) {
            return res.status(500).json({ message: "Server Error", error: error.message });
        }
    }

    static async updateShortUrl(req, res) {
        const { url } = req.body;
        const { shortCode } = req.params;
        try {
            const updatedUrl = await Url.findOneAndUpdate(
                { shortCode: shortCode },
                {
                    $set: {
                        url: url,
                        updatedAt: new Date()
                    }
                },
                { new: true }
            );
            if (!updatedUrl) {
                return res.status(404).json({ message: "Short URL not found" });
            }
            if (!url) {
                return res.status(400).json({ message: "URL is required" });
            }
            return res.status(200).json({
                message: "Short URL updated successfully",
                data: {
                    id: updatedUrl._id,
                    url: updatedUrl.url,
                    shortCode: updatedUrl.shortCode,
                    createdAt: updatedUrl.createdAt,
                    updatedAt: updatedUrl.updatedAt
                }
            });
        } catch (error) {
            return res.status(500).json({ message: "Server Error", error: error.message });
        }
    }

    static async getUrlStats(req, res) {
        try {
            const { shortCode } = req.params;
            const urlStats = await Url.findOne({ shortCode: shortCode });
            if (!urlStats) {
                return res.status(404).json({ message: "Short URL not found" });
            }
            return res.status(200).json({
                message: "URL statistics retrieved successfully",
                data: {
                    id: urlStats._id,
                    url: urlStats.url,
                    shortCode: urlStats.shortCode,
                    createdAt: urlStats.createdAt,
                    updatedAt: urlStats.updatedAt,
                    accessCount: urlStats.accessCount
                }
            });
        } catch (error) {
            return res.status(500).json({ message: "Server Error", error: error.message });
        }
    }

    static async deleteShortUrl(req, res) {
        try {
            const { shortCode } = req.params;
            const deletedUrl = await Url.findOneAndDelete({ shortCode: shortCode });
            if (!deletedUrl) {
                return res.status(404).json({ message: "Short URL not found" });
            }
            return res.status(200).json({
                message: "Short URL deleted successfully",
                data: {
                    id: deletedUrl._id,
                    url: deletedUrl.url,
                    shortCode: deletedUrl.shortCode,
                    createdAt: deletedUrl.createdAt,
                    updatedAt: deletedUrl.updatedAt
                }
            });
        } catch (error) {
            return res.status(500).json({ message: "Server Error", error: error.message });
        }
    }
};
