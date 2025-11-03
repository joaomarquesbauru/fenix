import express from "express";
import cors from "cors";
import { createHTTPHandler } from "@trpc/server/adapters/standalone";
import { appRouter } from "./routers";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// tRPC handler
app.use(
  "/api/trpc",
  createHTTPHandler({
    router: appRouter,
    createContext: () => ({}),
  })
);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📡 tRPC disponível em http://localhost:${PORT}/api/trpc`);
});

export default app;
