import { z } from "zod";
import { initTRPC } from "@trpc/server";
import * as db from "./db";

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

// ============================================
// AUTENTICAÇÃO
// ============================================

export const authRouter = router({
  loginEmpresa: publicProcedure
    .input(z.object({ email: z.string().email(), senha: z.string() }))
    .mutation(async ({ input }) => {
      const empresa = await db.verificarSenhaEmpresa(input.email, input.senha);
      if (!empresa) {
        throw new Error("Email ou senha inválidos");
      }
      return { id: empresa.id, email: empresa.email, nome: empresa.nome_da_empresa };
    }),

  loginCandidato: publicProcedure
    .input(z.object({ email: z.string().email(), senha: z.string() }))
    .mutation(async ({ input }) => {
      const candidato = await db.verificarSenhaCandidato(input.email, input.senha);
      if (!candidato) {
        throw new Error("Email ou senha inválidos");
      }
      return { id: candidato.id, email: candidato.email, nome: candidato.nome_completo };
    }),

  cadastroEmpresa: publicProcedure
    .input(
      z.object({
        nome_da_empresa: z.string(),
        cnpj: z.string(),
        email: z.string().email(),
        telefone: z.string().optional(),
        senha: z.string().min(6),
        descricao: z.string().optional(),
        website: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const empresaExistente = await db.obterEmpresaPorEmail(input.email);
      if (empresaExistente) {
        throw new Error("Email já cadastrado");
      }
      const empresa = await db.criarEmpresa(input);
      return { id: empresa.id, email: empresa.email, nome: empresa.nome_da_empresa };
    }),

  cadastroCandidato: publicProcedure
    .input(
      z.object({
        nome_completo: z.string(),
        cpf: z.string(),
        email: z.string().email(),
        telefone: z.string().optional(),
        idade: z.number().optional(),
        endereco: z.string().optional(),
        formacao: z.string().optional(),
        habilidades: z.string().optional(),
        experiencia: z.string().optional(),
        senha: z.string().min(6),
      })
    )
    .mutation(async ({ input }) => {
      const candidatoExistente = await db.obterCandidatoPorEmail(input.email);
      if (candidatoExistente) {
        throw new Error("Email já cadastrado");
      }
      const candidato = await db.criarCandidato(input);
      return { id: candidato.id, email: candidato.email, nome: candidato.nome_completo };
    }),
});

// ============================================
// EMPRESAS
// ============================================

export const empresaRouter = router({
  obter: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await db.obterEmpresaPorId(input);
  }),

  listar: publicProcedure.query(async () => {
    return await db.listarEmpresas();
  }),
});

// ============================================
// CANDIDATOS
// ============================================

export const candidatoRouter = router({
  obter: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await db.obterCandidatoPorId(input);
  }),

  listar: publicProcedure.query(async () => {
    return await db.listarCandidatos();
  }),

  atualizar: publicProcedure
    .input(
      z.object({
        id: z.string(),
        dados: z.object({
          nome_completo: z.string().optional(),
          telefone: z.string().optional(),
          idade: z.number().optional(),
          endereco: z.string().optional(),
          formacao: z.string().optional(),
          habilidades: z.string().optional(),
          experiencia: z.string().optional(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      return await db.atualizarCandidato(input.id, input.dados);
    }),
});

// ============================================
// VAGAS
// ============================================

export const vagaRouter = router({
  criar: publicProcedure
    .input(
      z.object({
        empresa_id: z.string(),
        titulo_da_vaga: z.string(),
        descricao: z.string(),
        requisitos: z.string().optional(),
        carga_horaria: z.string().optional(),
        salario: z.number().optional(),
        localizacao: z.string(),
        modalidade: z.enum(["presencial", "hibrido", "remoto"]),
      })
    )
    .mutation(async ({ input }) => {
      return await db.criarVaga(input);
    }),

  obter: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await db.obterVagaPorId(input);
  }),

  listarAbertas: publicProcedure.query(async () => {
    return await db.listarVagasAbertas();
  }),

  listarPorEmpresa: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await db.listarVagasPorEmpresa(input);
  }),

  atualizar: publicProcedure
    .input(
      z.object({
        id: z.string(),
        dados: z.object({
          titulo_da_vaga: z.string().optional(),
          descricao: z.string().optional(),
          requisitos: z.string().optional(),
          carga_horaria: z.string().optional(),
          salario: z.number().optional(),
          localizacao: z.string().optional(),
          modalidade: z.enum(["presencial", "hibrido", "remoto"]).optional(),
          status: z.enum(["aberta", "fechada"]).optional(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      return await db.atualizarVaga(input.id, input.dados);
    }),

  deletar: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return await db.deletarVaga(input);
  }),
});

// ============================================
// CANDIDATURAS
// ============================================

export const candidaturaRouter = router({
  criar: publicProcedure
    .input(
      z.object({
        candidato_id: z.string(),
        vaga_id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const existente = await db.verificarCandidaturaExistente(
        input.candidato_id,
        input.vaga_id
      );
      if (existente) {
        throw new Error("Você já se candidatou a esta vaga");
      }
      return await db.criarCandidatura(input);
    }),

  listarPorCandidato: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await db.listarCandidaturasPorCandidato(input);
  }),

  listarPorVaga: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await db.listarCandidaturasPorVaga(input);
  }),
});

// ============================================
// ROUTER PRINCIPAL
// ============================================

export const appRouter = router({
  auth: authRouter,
  empresa: empresaRouter,
  candidato: candidatoRouter,
  vaga: vagaRouter,
  candidatura: candidaturaRouter,
});

export type AppRouter = typeof appRouter;
