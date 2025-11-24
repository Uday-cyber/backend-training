import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const generateAccessToken = (User) => {
    return jwt.sign({ id: User._id}, process.env.JWT_SECRET, {expiresIn: '15m' });
};

const generateRefreshToken = (User) => {
    return jwt.sign({ id: User._id}, process.env.JWT_REFRESH_SECRET, {expiresIn: '7d' });
}

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if(!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: passwordHash });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch(err){
        throw new Error("Invalid Data");
    }
} 

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        if(users.length === 0) {
            return res.status(200).json({ message: 'No users found' });
        }

        res.status(200).json(users);
    } catch(err) {
        throw new Error("Invalid Data");
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ message: "Login successful", token: accessToken });

        // const secret = process.env.JWT_SECRET || 'uday123';
        // const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });

        // res.status(200).json({ token, message: 'Login successful' });z
    } catch(err){
        throw new Error("Invalid Data");
    }
}

export const refreshToken = async(req, res) => {
    const token = req.cookies.refreshToken;
    if(!token) return res.status(401).json({ error: 'Not refersh token' });

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, async(err, decoded) => {
        if(err) return res.status(403).json({ error: 'Invalid refresh token' });

        const user = await User.findById(decoded.id);
        if(!user) return res.status(404).json({ error: 'User not found' });

        const newAccessToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '15m'});

        res.json({ token: newAccessToken });
    });
}