import cors from "cors";

export const configureCors = () =>
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:3000",
        "https://my-frontend-domain.com",
      ]; // List of allowed origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }, // Function to check if the origin is allowed
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Content-Range"], // Allowed headers
    credentials: true, // Allow cookies to be sent with requests
    preflightContinue: false, // Pass the CORS preflight response to the next handler
    optionsSuccessStatus: 204, // Status code for successful OPTIONS requests
    maxAge: 600, // Cache preflight response for 24 hours
  });
