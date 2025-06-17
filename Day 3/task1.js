import http from 'http';
let arr = [];

const sendResponse = (res, status, message) => {
    res.writeHead(status, {'content-type': 'application/json'});
    return res.end(JSON.stringify({ message }));
}

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        sendResponse(res, 200, 'Welcome to the server!');
    }

    else if(req.url === '/notes' && req.method === 'GET') {
        if(arr.length === 0) {
            sendResponse(res, 404, 'No notes found');
        }
        else {
            sendResponse(res, 200, arr);
        }
    }

    else if(req.url === '/notes' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            const data = JSON.parse(body);
            const newNote = {
                id: arr.length+1,
                ...data
            };
            arr.push(newNote);
            sendResponse(res, 201, 'Note added successfuly');
        });
    }

    else if(req.url.startsWith('/notes/') && req.method === 'GET') {
        const id = parseInt(req.url.split('/')[2]);
        const note = arr.find(n => n.id === id);
        if(note) {
            sendResponse(res, 200, note);
        } else{
            sendResponse(res, 404, 'Note not found');
        }
    }

    else if(req.url.startsWith('/notes/') && req.method === 'PUT') {
        const id = parseInt(req.url.split('/')[2]);
        let body ='';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            const newNote = JSON.parse(body);
            const index = arr.find(n => n.id === id);
            if(index) {
                arr = arr.map(n => n.id === id ? {...n, ...newNote} : n);
                sendResponse(res, 200, 'Note updated successfully');
            }
            else {
                sendResponse(res, 404, 'Note not found');
            }
        });
    }

    else if(req.url.startsWith('/notes/') && req.method === 'DELETE') {
        const id = parseInt(req.url.split('/')[2]);
        const index = arr.find(n => n.id === id);
        if(index) {
            arr = arr.filter(n => n.id !== id);
            sendResponse(res, 200, 'Note deleted successfully');
        }
        else {
            sendResponse(res, 404, 'Note not found');
        }
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});