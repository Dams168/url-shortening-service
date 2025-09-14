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
};
