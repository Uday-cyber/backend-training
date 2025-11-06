import User from "../models/Users.js";
import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const secret = process.env.JWT_SECRET || 'uday123';
        const decoded = jwt.verify(token, secret);
        req.user = decoded.id;
        next();
    } catch(err){
        if (err.name === 'TokenExpiredError') return res.status(401).json({ error: 'Token expired' });
        return res.status(401).json({ error: 'Token is not valid', details: err.message });
    }
}
export default protect;