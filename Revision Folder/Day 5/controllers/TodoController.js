import express from 'express';
import Todo from '../models/Todo.js';

export const createTodo = async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const newtodo = new Todo({ title, description, completed });
        await newtodo.save();

        res.status(201).json(newtodo);
    } catch ( err ) {
        res.status(400).send(err.message);
    }
}

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        if(todos.length === 0) {
            res.status(200).json('Todo list empty');
        }
        res.status(200).json(todos);
    } catch (err){
        res.status(500).send(err.message);
    }
}

export const getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if(!todo){
            res.status(404).json('Todo not found');
        }
        res.status(200).json(todo);
    } catch(err){
        res.status(500).send(err.message);  
    }
}

export const updateTodo = async (req, res) => {
    try{
        const updateTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updateTodo);
    } catch(err){
        res.status(500).send(err.message);
    }
}

export const deleteTodo = async (req, res) => {
    try{
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json('Todo deleted successfully');
    } catch(err){
        res.status(500).send(err.message);
    }
}