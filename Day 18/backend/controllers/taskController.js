import fs from 'fs';
import path from 'path';

import Task from "../models/Tasks.js";
import { error } from 'console';

export const createTask = async (req, res) => {
    try{
        const filePath = req.file ? `/uploads/${req.file.filename}` : null;

        const createrTask = await Task.create({
            ...req.body,
            user: req.user._id,
            file: filePath
        });

        res.status(201).json({ message: 'Task created successfully', task: createrTask });
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
        .limit(limitNum),
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
        let task = await Task.findOne({ _id: req.params.id, user: req.user._id });
        if(!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if(req.file){
            if(task.file){
                const fullpath = path.join(process.cwd(), task.file);
                fs.unlinkSync(fullpath);
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

        res.status(200).json({ message: 'Task updated successfully', task });
    } catch(err){
        throw new Error("Invalid Data");
    }
}

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
        if(!task){
            return res.status(404).json({ message: 'Task not found' });
        }

        if(task.file){
            const fullpath = path.join(process.cwd(), task.file);
            fs.unlinkSync(fullpath);
        }

        await task.deleteOne();

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