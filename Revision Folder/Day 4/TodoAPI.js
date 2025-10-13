import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

let todos = [];

app.get('/todos', (req, res) => {
    if(todos.length === 0) {
        res.status(404).send('No todos found');
    }  
    else {
        res.status(200).json(todos);
    }
});

app.post('/todos', (req, res) => {
    const { task } = req.body;
    if(!task) {
        return res.status(400).send('Task is required');
    } 
    const id = todos.length ? todos[todos.length - 1].id + 1 : 1;
    // const id = todos.length + 1;
    const newTodo = { id, task };
    todos.push(newTodo);
    res.status(201).send('Todo added successfully');
});

app.put('/todos/:id', (req, res) => {
    let id = parseInt(req.params.id);
    const { task } = req.body;
    let todo = todos.find(t => t.id === id);
    if(todo) {
        todo.task = task;
        res.status(200).send('Todo updated successfully');
    }
    else{
        res.status(404).send('Todo not found');
    }
});

app.delete('/todos/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let index = todos.findIndex( t=> t.id === id);
    if(index !== -1) {
        todos.splice(index, 1);
        res.status(200). send('Todo deleted successfully');
    }
    else{
        res.status(404).send('Todo not found');
    }
});

// const PORT = 3000;
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});