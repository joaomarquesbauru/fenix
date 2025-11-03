# Deploy na Vercel - Fênix Gestão RH

## 📋 Pré-requisitos

- [x] Projeto criado e testado localmente
- [x] Banco de dados TiDB configurado
- [ ] Conta Vercel criada
- [ ] GitHub repositório criado
- [ ] Código enviado para GitHub

## 🚀 Passo 1: Preparar o Repositório GitHub

### 1.1 Criar repositório no GitHub

```bash
cd /home/ubuntu/sistema-vagas-candidatos

# Inicializar git
git init

# Adicionar arquivos
git add .

# Commit inicial
git commit -m "Initial commit: Fênix Gestão RH"

# Adicionar remote
git remote add origin https://github.com/seu-usuario/fenix-gestao-rh.git

# Push para main
git branch -M main
git push -u origin main
```

### 1.2 Verificar .gitignore

Certifique-se que o arquivo `.gitignore` existe e contém:

```
node_modules/
.env
.env.local
.env.*.local
dist/
build/
.DS_Store
*.log
.vscode/
.idea/
```

## 🌐 Passo 2: Conectar Vercel ao GitHub

### 2.1 Acessar Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Sign Up" ou "Log In"
3. Escolha "Continue with GitHub"
4. Autorize Vercel a acessar seus repositórios

### 2.2 Criar novo projeto

1. Clique em "Add New..." → "Project"
2. Selecione o repositório `fenix-gestao-rh`
3. Clique em "Import"

## ⚙️ Passo 3: Configurar Variáveis de Ambiente

Na página de configuração do projeto Vercel:

1. Vá para **Settings** → **Environment Variables**
2. Adicione as seguintes variáveis:

```
DATABASE_URL = mysql://2Zf1mRz69FvZP92.root:RA2ZQaP158Jnvya6s9sE@gateway02.us-east-1.prod.aws.tidbcloud.com:4000/sistema_vagas_candidatos?sslaccept=strict

NODE_ENV = production
```

3. Clique em "Save"

## 🔨 Passo 4: Configurar Build

Na página de configuração:

1. Vá para **Settings** → **Build & Development Settings**
2. Configure:
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`

3. Clique em "Save"

## 🚀 Passo 5: Deploy

### 5.1 Deploy Automático

Após configurar tudo, o Vercel vai fazer deploy automaticamente quando você fizer push para a branch `main`.

### 5.2 Deploy Manual

Se quiser fazer deploy manualmente:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## ✅ Passo 6: Verificar Deploy

1. Acesse o link fornecido pela Vercel (ex: `fenix-gestao-rh.vercel.app`)
2. Teste:
   - [ ] Página inicial carrega
   - [ ] Links de navegação funcionam
   - [ ] Login funciona
   - [ ] Cadastro funciona
   - [ ] Banco de dados conecta

## 🌍 Passo 7: Configurar Domínio Customizado

### 7.1 Comprar domínio

1. Compre um domínio (ex: fenixgestao.com.br) em:
   - Namecheap
   - GoDaddy
   - Registro.br (para .br)
   - Outro registrador

### 7.2 Configurar DNS na Vercel

1. No Vercel, vá para **Settings** → **Domains**
2. Clique em "Add Domain"
3. Digite seu domínio (ex: fenixgestao.com.br)
4. Siga as instruções para configurar DNS

### 7.3 Configurar DNS no Registrador

Copie os registros DNS fornecidos pela Vercel e adicione no seu registrador de domínio.

Geralmente são 4 registros:
- `NS` records apontando para Vercel
- Ou `CNAME` records

## 📊 Monitorar Deploy

### Logs em Tempo Real

1. No Vercel Dashboard
2. Clique no projeto
3. Vá para **Deployments**
4. Clique no deploy mais recente
5. Veja os logs

### Métricas

1. Vá para **Analytics**
2. Veja:
   - Requisições por hora
   - Tempo de resposta
   - Erros

## 🔄 Atualizações Futuras

Toda vez que você fizer push para `main`:

```bash
git add .
git commit -m "Descrição da mudança"
git push origin main
```

Vercel vai fazer deploy automaticamente!

## 🆘 Troubleshooting

### Erro: "Build failed"

1. Verifique os logs no Vercel
2. Confirme que `pnpm build` funciona localmente
3. Verifique variáveis de ambiente

### Erro: "Database connection refused"

1. Confirme que `DATABASE_URL` está correto
2. Verifique se TiDB está acessível de fora
3. Teste conexão localmente

### Erro: "Module not found"

1. Reinstale dependências: `pnpm install`
2. Verifique imports nos arquivos
3. Limpe cache Vercel: **Settings** → **Git** → **Redeploy**

## 📞 Suporte Vercel

- Documentação: https://vercel.com/docs
- Status: https://www.vercel-status.com/
- Suporte: https://vercel.com/support

---

**Status:** Pronto para deploy na Vercel ✅

**Próximo passo:** Fazer push para GitHub e acompanhar o deploy!
