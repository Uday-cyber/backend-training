import express from 'express';
import { Todo } from "../models/Todo.js";

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { title, description, completed } = req.body;

        const newTodo = new Todo({ title, description, completed });
        await newTodo.save();

        res.status(201).json(newTodo);
    } catch ( error ) {
        res.status(400).send(error.message);
    }
});

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        if(todos.length === 0) {
            return res.status(200).json('Todo list empty');
        }
        res.status(200).json(todos);
    } catch ( error ){
        res.status(500).send(error.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if( !todo ) {
            res.status(404).json('Todo not found');
        }
        res.status(200).json(todo);
    } catch ( err ) {
        res.status(500).send(err.message);
    } 
});

router.put('/:id', async (req, res) => {
    try {
        const updateTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new : true }
        );
        res.status(200).json(updateTodo);
    } catch ( err ) {
        res.status(500).send(err.message);
    } 
});

router.delete('/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json('Todo deleted successfully');
    } catch ( err ) {
        res.status(500).send(err.message);
    }
})




export default router;
