const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    else if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk);
        });
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('location', '/node')
                return res.end();
            });
        });        
    }
    else if(url === '/node'){     
        fs.readFile('message.txt',{ encoding: "utf-8" }, (err,data) => {
            if(err) throw err;
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>My First Page</title></head>');
            res.write(`<body><h1></h1>${data}</h1></body>`);
            res.write('</html>'); 
            res.end();
        })
        
    }
});
server.listen(3000);