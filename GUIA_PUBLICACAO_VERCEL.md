# 🚀 Guia Passo a Passo: Publicar Fênix Gestão RH na Vercel

## ✅ Status Atual

- ✅ Projeto desenvolvido e testado
- ✅ Banco de dados TiDB configurado
- ✅ Repositório Git inicializado
- ✅ Arquivos de configuração criados

## 📋 Checklist Rápido

- [ ] Criar conta GitHub
- [ ] Criar repositório no GitHub
- [ ] Fazer push do código
- [ ] Criar conta Vercel
- [ ] Conectar Vercel ao GitHub
- [ ] Configurar variáveis de ambiente
- [ ] Fazer deploy
- [ ] Testar aplicação
- [ ] Configurar domínio customizado

## 🎯 Passo 1: Criar Conta GitHub (5 minutos)

1. Acesse [github.com](https://github.com)
2. Clique em "Sign up"
3. Preencha:
   - Email
   - Senha
   - Nome de usuário (ex: seu-nome)
4. Confirme email
5. Pronto! ✅

## 📤 Passo 2: Criar Repositório GitHub (5 minutos)

1. Acesse [github.com/new](https://github.com/new)
2. Preencha:
   - **Repository name**: `fenix-gestao-rh`
   - **Description**: Sistema de Gestão de Vagas e Contratos
   - **Visibility**: Public
3. Clique em "Create repository"
4. Copie o comando para adicionar remote:

```bash
git remote add origin https://github.com/SEU-USUARIO/fenix-gestao-rh.git
git branch -M main
git push -u origin main
```

## 🔄 Passo 3: Fazer Push do Código (2 minutos)

Execute no terminal:

```bash
cd /home/ubuntu/sistema-vagas-candidatos

# Adicionar remote (substitua SEU-USUARIO)
git remote add origin https://github.com/SEU-USUARIO/fenix-gestao-rh.git

# Renomear branch para main
git branch -M main

# Fazer push
git push -u origin main
```

Pronto! Seu código está no GitHub ✅

## 🌐 Passo 4: Criar Conta Vercel (5 minutos)

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Sign Up"
3. Escolha "Continue with GitHub"
4. Autorize Vercel
5. Pronto! ✅

## 🚀 Passo 5: Importar Projeto (3 minutos)

1. No Vercel Dashboard, clique em "Add New..." → "Project"
2. Selecione `fenix-gestao-rh`
3. Clique em "Import"
4. Na página de configuração:
   - **Framework**: Vite
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`

## ⚙️ Passo 6: Configurar Variáveis de Ambiente (2 minutos)

1. Na página de configuração do projeto:
2. Role até "Environment Variables"
3. Adicione:

```
DATABASE_URL = mysql://2Zf1mRz69FvZP92.root:RA2ZQaP158Jnvya6s9sE@gateway02.us-east-1.prod.aws.tidbcloud.com:4000/sistema_vagas_candidatos?sslaccept=strict

NODE_ENV = production
```

4. Clique em "Deploy"

## ⏳ Passo 7: Aguardar Deploy (3-5 minutos)

- Vercel vai fazer build e deploy automaticamente
- Você verá um progresso na tela
- Quando terminar, clique no link para acessar

## ✅ Passo 8: Testar Aplicação

Acesse a URL fornecida pela Vercel e teste:

- [ ] Página inicial carrega
- [ ] Botões funcionam
- [ ] Login de empresa
- [ ] Login de candidato
- [ ] Criar vaga
- [ ] Buscar vagas

## 🌍 Passo 9: Configurar Domínio Customizado (Opcional)

### 9.1 Comprar Domínio

Escolha um registrador:
- **Namecheap**: namecheap.com
- **GoDaddy**: godaddy.com
- **Registro.br**: registro.br (para domínios .br)

Preço: ~R$ 30-50/ano

### 9.2 Conectar Domínio na Vercel

1. No Vercel, vá para **Settings** → **Domains**
2. Clique em "Add Domain"
3. Digite seu domínio (ex: fenixgestao.com.br)
4. Copie os registros DNS fornecidos

### 9.3 Configurar DNS no Registrador

1. Acesse o painel do registrador
2. Vá para DNS Settings
3. Adicione os registros fornecidos pela Vercel
4. Aguarde 24-48 horas para propagação

## 📊 Monitorar Aplicação

### Acessar Logs

1. No Vercel Dashboard
2. Clique no projeto
3. Vá para **Deployments**
4. Clique no deploy mais recente
5. Veja os logs em "Build Logs" e "Runtime Logs"

### Acessar Métricas

1. Vá para **Analytics**
2. Veja requisições, tempo de resposta, erros

## 🔄 Atualizar Aplicação

Toda vez que você quer fazer uma mudança:

```bash
# Fazer mudanças nos arquivos
# ...

# Commit
git add .
git commit -m "Descrição da mudança"

# Push
git push origin main
```

Vercel vai fazer deploy automaticamente! 🎉

## 🆘 Problemas Comuns

### "Build failed"

1. Verifique os logs no Vercel
2. Teste localmente: `pnpm build`
3. Confirme variáveis de ambiente

### "Database connection refused"

1. Verifique `DATABASE_URL` em variáveis de ambiente
2. Confirme que TiDB está acessível
3. Teste conexão localmente

### "Module not found"

1. Reinstale dependências: `pnpm install`
2. Verifique imports
3. Faça redeploy: **Settings** → **Git** → **Redeploy**

## 📞 Suporte

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Status**: https://www.vercel-status.com/
- **GitHub Docs**: https://docs.github.com

## 🎉 Parabéns!

Sua aplicação Fênix Gestão RH está online! 

**URL**: `https://fenix-gestao-rh.vercel.app`

**Próximos passos:**
1. Compartilhe com usuários
2. Monitore performance
3. Implemente novas funcionalidades
4. Colete feedback

---

**Tempo total estimado**: ~30 minutos ⏱️

**Custo**: Gratuito (Vercel free tier) 💰
