import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "../drizzle/schema";

let db: ReturnType<typeof drizzle> | null = null;

export async function getDatabase() {
  if (db) return db;

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  try {
    const connection = await mysql.createConnection(connectionString);
    db = drizzle(connection, { schema });
    console.log("✅ Conectado ao banco de dados TiDB com sucesso!");
    return db;
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco de dados:", error);
    throw error;
  }
}

export async function closeDatabase() {
  if (db) {
    // Drizzle não expõe método close direto, mas a conexão será fechada quando a aplicação encerrar
    console.log("Conexão com banco de dados será fechada");
  }
}
