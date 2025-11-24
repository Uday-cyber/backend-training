import fs from 'fs';
import path from 'path';

import Task from "../models/Tasks.js";
import { io } from "../index.js"

export const createTask = async (req, res) => {
    try{
        const filePath = req.file ? `/uploads/${req.file.filename}` : null;

        const newTask = await Task.create({
            ...req.body,
            user: req.user._id,
            file: filePath
        });

        // io.to(Task.user._id.toString()).emit("taskCreated", newTask);
        io.to("admin-room").emit("taskCreated", newTask);
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch(err){
        throw new Error("Invalid Data");
    }
}

export const getAllTasks = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;

    let query = {};

    if (req.user.role === "admin") {
      query = {};
    } else {
      query.user = req.user._id;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    if (status && status !== "all") {
      query.status = status;
    }

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    const [tasks, total] = await Promise.all([
      Task.find(query)
        .populate("user", "username email role")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean()
        .select("title description status file createdAt"),
      Task.countDocuments(query),
    ]);

    res.json({  
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      tasks,
    });

  } catch (error) {
    throw new Error("Invalid Data");
  }
};


export const updateTask = async (req, res) => {
    try{
        let task;
        
        if(req.user.role === "admin") task = await Task.findById(req.params.id);
        else task = await Task.findOne({ _id: req.params.id, user: req.user._id});

        if(!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if(req.file){
            if(task.file){
                const oldPath = path.join(process.cwd(), task.file);
                if(fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            task.file = `/uploads/${req.file.filename}`;
        }

        // task = await Task.findByIdAndUpdate(
        //     task._id,
        //     req.body,
        //     { new: true }
        // );

        task.title = req.body.title ?? task.title;
        task.description = req.body.description ?? task.description;
        task.status = req.body.status ?? task.status;

        await task.save();

        io.to("admin-room").emit("taskUpdated", task);
        io.to(task.user.toString()).emit("taskUpdated", task);
        res.status(200).json({ message: 'Task updated successfully', task });
    } catch(err){
        throw new Error("Invalid Data");
    }
}

export const deleteTask = async (req, res) => {
    try {
        let task;

        if(req.user.role === "admin") task = await Task.findById(req.params.id);
        else task = await Task.findOne({ _id: req.params.id, user: req.user._id });

        if(!task){
            return res.status(404).json({ message: 'Task not found' });
        }

        if(task.file){
            const fullpath = path.join(process.cwd(), task.file);
            if(fs.existsSync(fullpath)) fs.unlinkSync(fullpath);
        }

        await task.deleteOne();

        io.to("admin-room").emit("taskDeleted", req.params.id);
        io.to(task.user.toString()).emit("taskDeleted", req.params.id);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch(err) {
        throw new Error("Invalid Data");
    }
} 

export const taskStats = async(req, res) => {
    try{
        const match = req.user.role === "admin"
        ? {}
        : {user: req.user._id};

        const stats = await Task.aggregate([
            { $match: match },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(stats);
    } catch(err) {
        throw new Error("Invalid Data");
    }
}