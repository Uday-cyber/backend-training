import User from "../models/User.js";
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const register = async (req, res, next) => {
    try{
        const { username, password } = req.body;
        const userExists = await User.findOne({ username });
        if(userExists) return res.status(400).json({ error: 'User already exists' });

        const user = await User.create({ username, password });
        const token = generateToken(user._id);

        res.status(201).json({ token });
    } catch(err) {
        next(err);
    }
}

export const login = async (req, res, next) => {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if(!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = generateToken(user._id);
        res.json({ token });
    } catch(err) {
        next(err);
    }
}