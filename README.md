# Sistema de Vagas e Candidatos

Um sistema completo de gestão de vagas e candidatos, conectando empresas com talentos.

## 🎯 Funcionalidades

### Para Empresas
- Cadastro e login de empresa
- Criar, editar e deletar vagas
- Visualizar candidatos cadastrados
- Ver candidatos que se candidataram às vagas
- Gerenciar candidaturas

### Para Candidatos
- Cadastro e login de candidato
- Buscar vagas disponíveis
- Filtrar por localização, modalidade e salário
- Candidatar-se a vagas
- Gerenciar candidaturas
- Editar perfil

## 🏗️ Estrutura do Banco de Dados

### Tabelas
1. **empresas** - Dados das empresas cadastradas
2. **candidatos** - Dados dos candidatos
3. **vagas** - Vagas publicadas pelas empresas
4. **candidaturas** - Candidaturas dos candidatos às vagas

## 🚀 Como Usar

### Instalação

```bash
# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env

# Criar banco de dados
pnpm db:push
```

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
pnpm dev
```

Acesse `http://localhost:5173` no navegador.

## 📋 Páginas Disponíveis

### Públicas
- `/` - Página inicial
- `/login-empresa` - Login de empresa
- `/cadastro-empresa` - Cadastro de empresa
- `/login-candidato` - Login de candidato
- `/cadastro-candidato` - Cadastro de candidato

### Empresa (após login)
- `/dashboard-empresa` - Dashboard da empresa
- `/criar-vaga` - Criar nova vaga
- `/minhas-vagas` - Listar vagas
- `/candidatos` - Ver candidatos

### Candidato (após login)
- `/dashboard-candidato` - Dashboard do candidato
- `/vagas` - Listar vagas disponíveis
- `/minhas-candidaturas` - Candidaturas realizadas
- `/perfil` - Editar perfil

## 🔧 Tecnologias

- **Frontend**: React 19, Tailwind CSS, Wouter
- **Backend**: Express, tRPC
- **Database**: Supabase (PostgreSQL)
- **ORM**: Drizzle ORM
- **Build**: Vite

## 📚 API Endpoints (tRPC)

### Autenticação
- `auth.loginEmpresa` - Login de empresa
- `auth.loginCandidato` - Login de candidato
- `auth.cadastroEmpresa` - Cadastro de empresa
- `auth.cadastroCandidato` - Cadastro de candidato

### Vagas
- `vaga.criar` - Criar vaga
- `vaga.listarAbertas` - Listar vagas abertas
- `vaga.listarPorEmpresa` - Vagas de uma empresa
- `vaga.atualizar` - Editar vaga
- `vaga.deletar` - Deletar vaga

### Candidaturas
- `candidatura.criar` - Candidatar-se
- `candidatura.listarPorCandidato` - Candidaturas de um candidato
- `candidatura.listarPorVaga` - Candidatos de uma vaga

## 🔐 Segurança

- Senhas criptografadas com bcrypt
- Validação com Zod
- Autenticação baseada em sessão
- Proteção de rotas

## 📝 Variáveis de Ambiente

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua-chave-publica
SUPABASE_SERVICE_ROLE_KEY=sua-chave-privada
```

## 🤝 Contribuindo

Sinta-se livre para contribuir com melhorias!

## 📄 Licença

MIT

---

**Desenvolvido com ❤️**
