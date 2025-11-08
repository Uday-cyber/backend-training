// -- Task 1: Create a simple HTTP Server --

// import http from 'http';

// const server = http.createServer((req, res) => {
//     console.log(`Received request for: ${req.url}`);
//     res.writeHead(200, {'content-type': 'text/plain'});
//     res.end('Hello World!');
// })

// const PORT = 3000;

// server.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// })


//  -- Mini API endpoints --

// import http from 'http';

// const server = http.createServer((req, res) => {
//     if(req.url === '/about') {
//         res.writeHead(200, {'content-type': 'text/plain'});
//         res.end('This is the about page');
//     }

//     else if(req.url === '/contact') {
//         res.writeHead(200, {'content-type': 'text/plain'});
//         res.end('This is the contact page');
//     }

//     else{
//         res.writeHead(404, {'content-type': 'text/plain'});
//         res.end('Page not found');
//     }
// });

// const PORT = 3000;

// server.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// import http from 'http';
// import fs from 'fs';

// const server = http.createServer((req, res) => {
//     if(req.url === '/') {
//         res.writeHead(200, {'content-type': 'text/plain'});
//         res.end('Welcome to the Home Page!');
//     }

//     else if(req.url === '/write') {
//         fs.writeFile('message.txt', 'Hello, this is a message!', (err) => {
//             if(err) {
//                 res.writeHead(500, {'content-type': 'text/plain'});
//                 res.end('Error writing to file');
//             }
//             else{
//                 res.writeHead(200, {'content-type': 'text/plain'});
//                 res.end('File written successfully');
//             }
//         })
//     }

//     else if(req.url === '/read') {
//         fs.readFile('message.txt', 'utf-8', (err, data) => {
//             if(err) {
//                 res.writeHead(500, {'content-type': 'text/plain'});
//                 res.end('Error reading file');
//             }
//             else{
//                 res.writeHead(200, {'content-type' : 'text/plain'});
//                 res.end(data);
//             }
//         })
//     }
    
//     else {
//         res.writeHead(404, {'content-type' : 'text/plain'});
//         res.end('Page not found');
//     }
// });

// const PORT = 3000;

// server.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end('Welcome to the Home Page!');
    }

    else if(req.url === '/create') {
        fs.writeFile('notes.txt', 'First note', err => {
            if(err){
                res.writeHead(500, {'content-type' : 'text/plain'});
                res.end('Error creating file');
            }
            else{
                res.writeHead(200, {'content-type': 'text/plain'});
                res.end('File created successfully');
            }
        });
    }

    else if(req.url === '/append') {
        fs.appendFile('notes.txt', '\nSecond note', err => {
            if(err) {
                res.writeHead(500, {'content-type': 'text/plain'});
                res.end('Error appending to file');
            }
            else{
                res.writeHead(200, {'content-type': 'text/plain'});
                res.end('File appended successfully');
            }
        });
    }

    else if(req.url === '/read') {
        fs.readFile('notes.txt', 'utf-8', (err, data) => {
            if(err) {
                res.writeHead(500, {'content-type': 'text/plain'});
                res.end('Error reading file');
            }
            else{
                res.writeHead(200, {'content-type': 'text/plain'});
                res.end(data);
            }
        })
    }

    else if(req.url === '/delete') {
        fs.unlink('notes.txt', err => {
            if(err) {
                res.writeHead(500, {'content-type': 'text/plain'});
                res.end('Error deleting file');
            }
            else{
                res.writeHead(200, {'content-type': 'text/plain'});
                res.end('File deleted successfully');
            }
        })
    }

    else {
        res.writeHead(404, {'content-type': 'text/plain'});
        res.end('Page not found');
    }
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
