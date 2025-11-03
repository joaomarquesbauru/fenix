import { getDatabase } from "./database";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import * as schema from "../drizzle/schema";

// ============================================
// OPERAÇÕES COM EMPRESAS
// ============================================

export async function criarEmpresa(dados: {
  nome_da_empresa: string;
  cnpj: string;
  email: string;
  telefone?: string;
  senha: string;
  descricao?: string;
  website?: string;
}) {
  try {
    const db = await getDatabase();
    const id = uuidv4();
    const senhaHash = await bcrypt.hash(dados.senha, 10);

    const result = await db
      .insert(schema.empresas)
      .values({
        id,
        nome_da_empresa: dados.nome_da_empresa,
        cnpj: dados.cnpj,
        email: dados.email,
        telefone: dados.telefone,
        senha: senhaHash,
        descricao: dados.descricao,
        website: dados.website,
      })
      .$returningId();

    return { id, email: dados.email, nome_da_empresa: dados.nome_da_empresa };
  } catch (error) {
    console.error("[DB] Erro ao criar empresa:", error);
    throw error;
  }
}

export async function obterEmpresaPorEmail(email: string) {
  try {
    const db = await getDatabase();
    const result = await db
      .select()
      .from(schema.empresas)
      .where(eq(schema.empresas.email, email));

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[DB] Erro ao obter empresa:", error);
    throw error;
  }
}

export async function obterEmpresaPorId(id: string) {
  try {
    const db = await getDatabase();
    const result = await db
      .select()
      .from(schema.empresas)
      .where(eq(schema.empresas.id, id));

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[DB] Erro ao obter empresa:", error);
    throw error;
  }
}

export async function listarEmpresas() {
  try {
    const db = await getDatabase();
    return await db.select().from(schema.empresas);
  } catch (error) {
    console.error("[DB] Erro ao listar empresas:", error);
    throw error;
  }
}

// ============================================
// OPERAÇÕES COM CANDIDATOS
// ============================================

export async function criarCandidato(dados: {
  nome_completo: string;
  cpf: string;
  email: string;
  telefone?: string;
  idade?: number;
  endereco?: string;
  formacao?: string;
  habilidades?: string;
  experiencia?: string;
  senha: string;
}) {
  try {
    const db = await getDatabase();
    const id = uuidv4();
    const senhaHash = await bcrypt.hash(dados.senha, 10);

    await db.insert(schema.candidatos).values({
      id,
      nome_completo: dados.nome_completo,
      cpf: dados.cpf,
      email: dados.email,
      telefone: dados.telefone,
      idade: dados.idade,
      endereco: dados.endereco,
      formacao: dados.formacao,
      habilidades: dados.habilidades,
      experiencia: dados.experiencia,
      senha: senhaHash,
    });

    return { id, email: dados.email, nome_completo: dados.nome_completo };
  } catch (error) {
    console.error("[DB] Erro ao criar candidato:", error);
    throw error;
  }
}

export async function obterCandidatoPorEmail(email: string) {
  try {
    const db = await getDatabase();
    const result = await db
      .select()
      .from(schema.candidatos)
      .where(eq(schema.candidatos.email, email));

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[DB] Erro ao obter candidato:", error);
    throw error;
  }
}

export async function obterCandidatoPorId(id: string) {
  try {
    const db = await getDatabase();
    const result = await db
      .select()
      .from(schema.candidatos)
      .where(eq(schema.candidatos.id, id));

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[DB] Erro ao obter candidato:", error);
    throw error;
  }
}

export async function listarCandidatos() {
  try {
    const db = await getDatabase();
    return await db.select().from(schema.candidatos);
  } catch (error) {
    console.error("[DB] Erro ao listar candidatos:", error);
    throw error;
  }
}

export async function atualizarCandidato(id: string, dados: any) {
  try {
    const db = await getDatabase();
    await db
      .update(schema.candidatos)
      .set(dados)
      .where(eq(schema.candidatos.id, id));

    return await obterCandidatoPorId(id);
  } catch (error) {
    console.error("[DB] Erro ao atualizar candidato:", error);
    throw error;
  }
}

// ============================================
// OPERAÇÕES COM VAGAS
// ============================================

export async function criarVaga(dados: {
  empresa_id: string;
  titulo_da_vaga: string;
  descricao: string;
  requisitos?: string;
  carga_horaria?: string;
  salario?: number;
  localizacao: string;
  modalidade: "presencial" | "hibrido" | "remoto";
}) {
  try {
    const db = await getDatabase();
    const id = uuidv4();

    await db.insert(schema.vagas).values({
      id,
      ...dados,
    });

    return { id, ...dados };
  } catch (error) {
    console.error("[DB] Erro ao criar vaga:", error);
    throw error;
  }
}

export async function obterVagaPorId(id: string) {
  try {
    const db = await getDatabase();
    const result = await db
      .select()
      .from(schema.vagas)
      .where(eq(schema.vagas.id, id));

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[DB] Erro ao obter vaga:", error);
    throw error;
  }
}

export async function listarVagasAbertas() {
  try {
    const db = await getDatabase();
    return await db
      .select()
      .from(schema.vagas)
      .where(eq(schema.vagas.status, "aberta"));
  } catch (error) {
    console.error("[DB] Erro ao listar vagas:", error);
    throw error;
  }
}

export async function listarVagasPorEmpresa(empresa_id: string) {
  try {
    const db = await getDatabase();
    return await db
      .select()
      .from(schema.vagas)
      .where(eq(schema.vagas.empresa_id, empresa_id));
  } catch (error) {
    console.error("[DB] Erro ao listar vagas da empresa:", error);
    throw error;
  }
}

export async function atualizarVaga(id: string, dados: any) {
  try {
    const db = await getDatabase();
    await db
      .update(schema.vagas)
      .set(dados)
      .where(eq(schema.vagas.id, id));

    return await obterVagaPorId(id);
  } catch (error) {
    console.error("[DB] Erro ao atualizar vaga:", error);
    throw error;
  }
}

export async function deletarVaga(id: string) {
  try {
    const db = await getDatabase();
    await db.delete(schema.vagas).where(eq(schema.vagas.id, id));
    return true;
  } catch (error) {
    console.error("[DB] Erro ao deletar vaga:", error);
    throw error;
  }
}

// ============================================
// OPERAÇÕES COM CANDIDATURAS
// ============================================

export async function criarCandidatura(dados: {
  candidato_id: string;
  vaga_id: string;
}) {
  try {
    const db = await getDatabase();
    const id = uuidv4();

    await db.insert(schema.candidaturas).values({
      id,
      ...dados,
    });

    return { id, ...dados };
  } catch (error) {
    console.error("[DB] Erro ao criar candidatura:", error);
    throw error;
  }
}

export async function listarCandidaturasPorCandidato(candidato_id: string) {
  try {
    const db = await getDatabase();
    return await db
      .select()
      .from(schema.candidaturas)
      .where(eq(schema.candidaturas.candidato_id, candidato_id));
  } catch (error) {
    console.error("[DB] Erro ao listar candidaturas:", error);
    throw error;
  }
}

export async function listarCandidaturasPorVaga(vaga_id: string) {
  try {
    const db = await getDatabase();
    return await db
      .select()
      .from(schema.candidaturas)
      .where(eq(schema.candidaturas.vaga_id, vaga_id));
  } catch (error) {
    console.error("[DB] Erro ao listar candidaturas da vaga:", error);
    throw error;
  }
}

export async function verificarCandidaturaExistente(
  candidato_id: string,
  vaga_id: string
) {
  try {
    const db = await getDatabase();
    const result = await db
      .select()
      .from(schema.candidaturas)
      .where(
        eq(schema.candidaturas.candidato_id, candidato_id) &&
          eq(schema.candidaturas.vaga_id, vaga_id)
      );

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[DB] Erro ao verificar candidatura:", error);
    throw error;
  }
}

// ============================================
// AUTENTICAÇÃO
// ============================================

export async function verificarSenhaEmpresa(email: string, senha: string) {
  try {
    const empresa = await obterEmpresaPorEmail(email);
    if (!empresa) return null;

    const senhaValida = await bcrypt.compare(senha, empresa.senha);
    if (!senhaValida) return null;

    return empresa;
  } catch (error) {
    console.error("[DB] Erro ao verificar senha da empresa:", error);
    throw error;
  }
}

export async function verificarSenhaCandidato(email: string, senha: string) {
  try {
    const candidato = await obterCandidatoPorEmail(email);
    if (!candidato) return null;

    const senhaValida = await bcrypt.compare(senha, candidato.senha);
    if (!senhaValida) return null;

    return candidato;
  } catch (error) {
    console.error("[DB] Erro ao verificar senha do candidato:", error);
    throw error;
  }
}
