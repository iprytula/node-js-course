import http, { type IncomingMessage, type ServerResponse } from "node:http";

const PORT = 3001;

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method ?? "GET";

    const requestUrl = new URL(req.url ?? "/", `http:${req.headers.host}`);
    const pathName = requestUrl.pathname;

    res.setHeader("Content-Type", "text/plain");

    if (method === "GET" && pathName === "/health") {
      res.statusCode = 200;
      res.end("Server is healthy");
      console.log("response :", res);
      return;
    }

    if (method === "POST" && pathName === "/users") {
      res.statusCode = 201;
      res.end("POST /users example");
      console.log("response :", res);
      return;
    }

    res.statusCode = 404;
    res.end("Not Found");
    console.log("response :", res);
  },
);

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
});
