import http from "http";
const server = http.createServer((request, response) => {
    response.writeHead(200, { "content-type": "text/plain" });
    response.end("Hello, world");
    console.log('Server responded with "Hello world!');
});
server.listen(4000, () => {
    console.log("Server is running on http://localhost:4000");
});
