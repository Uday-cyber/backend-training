import { application } from 'express';
import http from 'http';

let todos = [];

const server = http.createServer((req, res) => {
    if(req.url === '/todos' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            let data = JSON.parse(body);
            let id = todos.length + 1;
            let todo = {id, task: data.task};
            todos.push(todo);
            res.writeHead(201, {'content-type': 'text/plain'});
            res.end('Todo added successfully');
        });
    }

    else if(req.url === '/todos' && req.method === 'GET') {
        if(todos.length === 0) {
            res.writeHead(200, {'content-type': 'text/plain'});
            res.end('No todos available');
        }
        else {
            res.writeHead(200, {'content-type': 'application/json'});
            res.end(JSON.stringify(todos));
        }
    }

    else if(req.url.startsWith('/todos/') && req.method === 'PUT') {
        let id = parseInt(req.url.split('/')[2]);
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            let data = JSON.parse(body);
            let todo = todos.find(t => t.id === id);
            if(todo) {
                todo.task = data.task;
                res.writeHead(200, {'content-type': 'text/plain'});
                res.end('Todo updated successfully');
            }
            else{
                res.writeHead(404, {'content-type': 'text/plain'});
                res.end('Todo not found');
            }
        });
    }

    else if(req.url.startsWith('/todos/') && req.method === 'DELETE') {
        let id = parseInt(req.url.split('/')[2]);
        let index = todos.findIndex(t => t.id === id);
        if(index !== -1) {
            todos.splice(index, 1);
            res.writeHead(200, {'content-type': 'text/plain'});
            res.end('Todo deleted successfully');
        }
        else{
            res.writeHead(404, {'content-type': 'text/plain'})
            res.end('Todo not found');
        }
    }

    else {
        res.writeHead(404, {'content-type': 'text/plain'});
        res.end('URL not found');
    };
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});