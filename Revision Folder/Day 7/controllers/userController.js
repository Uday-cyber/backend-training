import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if(!username || !email || !password) {
            return res.status(400).json('All fields are required');
        }

        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(409).json('User already exists');
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: passwordHash });
        await newUser.save();

        res.status(201).json({ id: newUser._id, username: newUser.username, email: newUser.email });
    } catch ( err ) {
        res.status(400).send(err.message);
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        if(users.length === 0) {
            return res.status(200).json('User list empty');
        }
        res.status(200).json(users);
    } catch ( err ) {
        res.status(500).send(err.message);
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) return res.status(400).json({error: 'email and password required'});

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json('Invalid password');
        }

        const secret = process.env.JWT_SECRET || 'abcd1234';
        const jwtToken = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });

        res.status(200).json({ token: jwtToken, message: 'Login successful' });
    } catch(err){
        res.status(500).send(err.message);
    }
}