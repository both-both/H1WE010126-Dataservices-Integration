import http from "http";
const server = http.createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello, world!");
    console.log('server responded with "Hello world!"');
});
server.listen(4000, () => {
    console.log("Server is still running on http://localhost:4000");
});
