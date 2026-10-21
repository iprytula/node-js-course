// entry file for express
import express from "express";

export function createApp() {
  const app = express();

  app.use(express.json());

  
}