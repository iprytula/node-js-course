import http, { type IncomingMessage, type ServerResponse } from "node:http";

const PORT = 3002;

interface CreateUserBody {
  name: string;
  email: string;
}

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method ?? "GET";
    const requestUrl = new URL(req.url ?? "/", `http:${req.headers.host}`);
    const pathName = requestUrl.pathname;

    res.setHeader("Content-Type", "text/plain");

    if (method === "GET" && pathName === "/users") {
      const chunks: Buffer[] = [];

      // data event is going to run every time node receives new body chunk
      req.on("data", (chunk: Buffer) => {
        console.log("chunk : ", chunk);
        chunks.push(chunk);
      });

      req.on("end", () => {
        try {
          const rawBody = Buffer.concat(chunks).toString("utf8");

          if (!rawBody) {
            res.statusCode = 400;
            res.end("Request body is required");
            return;
          }

          const body = JSON.parse(rawBody) as CreateUserBody;

          if (!body.name || !body.email) {
            res.end("Both name and email are required");
            return;
          }

          res.statusCode = 201;
          res.end(`User crated: { name: ${body.name}, email: ${body.email} }`);
          return;
        } catch (error) {
          res.statusCode = 400;
          res.end("Invalid JSON body");
          return;
        }
      });

      req.on("error", () => {
        res.statusCode = 500;
        res.end("Failed to read request body");
      });
      return;
    }

    res.statusCode = 404;
    res.end("Route not found");
  },
);

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
