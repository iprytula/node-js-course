import http, { type IncomingMessage, type ServerResponse } from "node:http";

const PORT = 3000;

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method;
    const url = req.url;
    const headers = req.headers;

    console.log("method :", method);
    console.log("url :", url);
    console.log("headers :", headers);

    const statusCode = res.statusCode;
    console.log("statusCode :", statusCode);

    res.setHeader("Content-Type", "text/plain");

    res.end(`Basic http node server: ${method} | ${url}`);
  },
);

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
});
