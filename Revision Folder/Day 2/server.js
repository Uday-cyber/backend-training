import http from 'http';

const quotes = [
            "The best way to get started is to quit talking and begin doing. - Walt Disney",
            "Don't let yesterday take up too much of today. - Will Rogers", 
            "It's not whether you get knocked down, it's whether you get up. - Vince Lombardi",
            "If you are working on something exciting, it will keep you motivated. - Unknown",
            "Success is not in what you have, but who you are. - Bo Bennett"
        ];

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end('Welcome to Quotes API');
    }

    else if(req.url === '/quotes') {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end(quotes.join('\n'));
    }

    else if(req.url === '/quotes/random') {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end(quotes[randomIndex]);
    }

    else{
        res.writeHead(404, {'content-type': 'text/plain'});
        res.end('Page not found');
    }
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});