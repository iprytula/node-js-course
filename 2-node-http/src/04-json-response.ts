import http, { type IncomingMessage, type ServerResponse } from "node:http";

const PORT = 3003;

interface User {
  name: string;
  email: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

const users: User[] = [
  { name: "Iurii", email: "iurii@gmail.com" },
  { name: "Anna", email: "anna@gmail.com" },
];

const sendJSON = <T>(
  res: ServerResponse,
  statusCode: number,
  body: ApiResponse<T>,
): void => {
  res.statusCode = statusCode;

  res.setHeader("Content-Type", "application/json");

  res.end(JSON.stringify(body));
};

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method ?? "GET";
    const requestUrl = new URL(req.url ?? "/", `http:${req.headers.host}`);
    const pathName = requestUrl.pathname;

    if (method === "GET" && pathName === "/") {
      sendJSON(res, 200, {
        success: true,
        message: "server is running",
        data: {
          routes: ["GET/users"],
        },
      });
      return;
    }

    if (method === "GET" && pathName === "/users") {
      sendJSON(res, 200, {
        success: true,
        message: "users fetched successfully",
        data: users,
      });
      return;
    }

    sendJSON(res, 404, {
      success: false,
      message: "Route not found",
      error: `pathname: '${pathName}' does not exist`,
    });
    return;
  },
);

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
