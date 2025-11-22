import { cache } from "../utlis/cache.js";

export const cacheMiddleware = (req, res, next) => {
    const key = req.originalUrl;
    const cachedData = cache.get(key);

    if(cachedData) {
        return res.json({ cached: true, ...cachedData });
    }

    res.sendResponse = res.json;
    res.json = (body) => {
        cache.set(key, body);
        res.sendResponse(body);
    };

    next();
}


