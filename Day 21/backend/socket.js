import jwt from "jsonwebtoken";
import User from "./models/User.js";

export const socketHandler = (io) => {
    io.on("connection", async (socket) => {
        try{
            const token = socket.handshake.auth.token;
            if (!token) return socket.disconnect();

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);

            if(!user) return socket.disconnect();

            socket.user = user;

            socket.join(user._id.toString());

            if(user.role === "admin") socket.join("admin-room");
            
            // socket.on("joinRooms", ({ userId, role }) => {
            //     socket.join(userId);
            //     if(role == "admin") socket.join("admin-room");
            // });
            console.log("User connected: ", user.username);
        } catch(err){
            socket.disconnect();
        }
    });
};