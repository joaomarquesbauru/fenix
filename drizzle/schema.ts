import {
  mysqlTable,
  varchar,
  text,
  int,
  timestamp,
  mysqlEnum,
  uniqueIndex,
  index,
} from "drizzle-orm/mysql-core";

// Tabela de Empresas
export const empresas = mysqlTable(
  "empresas",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    nome_da_empresa: varchar("nome_da_empresa", { length: 255 }).notNull(),
    cnpj: varchar("cnpj", { length: 20 }).notNull().unique(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    telefone: varchar("telefone", { length: 20 }),
    senha: varchar("senha", { length: 255 }).notNull(),
    descricao: text("descricao"),
    website: varchar("website", { length: 255 }),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
  },
  (table) => ({
    emailIdx: uniqueIndex("empresas_email_idx").on(table.email),
    cnpjIdx: uniqueIndex("empresas_cnpj_idx").on(table.cnpj),
  })
);

// Tabela de Candidatos
export const candidatos = mysqlTable(
  "candidatos",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    nome_completo: varchar("nome_completo", { length: 255 }).notNull(),
    cpf: varchar("cpf", { length: 20 }).notNull().unique(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    telefone: varchar("telefone", { length: 20 }),
    idade: int("idade"),
    endereco: varchar("endereco", { length: 255 }),
    formacao: varchar("formacao", { length: 255 }),
    habilidades: text("habilidades"),
    experiencia: text("experiencia"),
    senha: varchar("senha", { length: 255 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
  },
  (table) => ({
    emailIdx: uniqueIndex("candidatos_email_idx").on(table.email),
    cpfIdx: uniqueIndex("candidatos_cpf_idx").on(table.cpf),
  })
);

// Tabela de Vagas
export const vagas = mysqlTable(
  "vagas",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    empresa_id: varchar("empresa_id", { length: 64 }).notNull(),
    titulo_da_vaga: varchar("titulo_da_vaga", { length: 255 }).notNull(),
    descricao: text("descricao").notNull(),
    requisitos: text("requisitos"),
    carga_horaria: varchar("carga_horaria", { length: 100 }),
    salario: int("salario"),
    localizacao: varchar("localizacao", { length: 255 }).notNull(),
    modalidade: mysqlEnum("modalidade", ["presencial", "hibrido", "remoto"]).notNull(),
    status: mysqlEnum("status", ["aberta", "fechada"]).default("aberta").notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
  },
  (table) => ({
    empresaIdx: index("vagas_empresa_id_idx").on(table.empresa_id),
    statusIdx: index("vagas_status_idx").on(table.status),
  })
);

// Tabela de Candidaturas
export const candidaturas = mysqlTable(
  "candidaturas",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    candidato_id: varchar("candidato_id", { length: 64 }).notNull(),
    vaga_id: varchar("vaga_id", { length: 64 }).notNull(),
    data_da_candidatura: timestamp("data_da_candidatura").defaultNow(),
    status: mysqlEnum("status", ["pendente", "aceito", "rejeitado"]).default("pendente").notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
  },
  (table) => ({
    candidatoIdx: index("candidaturas_candidato_id_idx").on(table.candidato_id),
    vagaIdx: index("candidaturas_vaga_id_idx").on(table.vaga_id),
  })
);

// Tipos exportados
export type Empresa = typeof empresas.$inferSelect;
export type InsertEmpresa = typeof empresas.$inferInsert;

export type Candidato = typeof candidatos.$inferSelect;
export type InsertCandidato = typeof candidatos.$inferInsert;

export type Vaga = typeof vagas.$inferSelect;
export type InsertVaga = typeof vagas.$inferInsert;

export type Candidatura = typeof candidaturas.$inferSelect;
export type InsertCandidatura = typeof candidaturas.$inferInsert;
