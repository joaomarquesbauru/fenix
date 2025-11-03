# Guia de Publicação - Fênix Gestão RH

## 📋 Checklist Pré-Publicação

- [x] Banco de dados configurado (TiDB Cloud)
- [x] Frontend desenvolvido com React
- [x] Backend com tRPC
- [x] Design Fênix implementado
- [x] Servidor de desenvolvimento funcionando
- [ ] Build de produção testado
- [ ] Variáveis de ambiente configuradas
- [ ] SSL/HTTPS ativado

## 🚀 Passos para Publicação

### 1. Fazer Build do Projeto

```bash
cd /home/ubuntu/sistema-vagas-candidatos
pnpm build
```

Isso vai gerar:
- `dist/` - Frontend otimizado
- `dist/server` - Backend compilado

### 2. Configurar Variáveis de Ambiente

Certifique-se de que o arquivo `.env` está configurado com:

```env
DATABASE_URL="mysql://2Zf1mRz69FvZP92.root:RA2ZQaP158Jnvya6s9sE@gateway02.us-east-1.prod.aws.tidbcloud.com:4000/sistema_vagas_candidatos?sslaccept=strict"
```

### 3. Criar Banco de Dados no TiDB

Execute o script SQL em `scripts/create-tables.sql` no TiDB Cloud Console.

### 4. Deploy em Produção

**Opção A: Usar Vercel (Recomendado)**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Opção B: Usar Docker**

```bash
# Criar Dockerfile
docker build -t fenix-gestao-rh .
docker run -p 3000:3000 fenix-gestao-rh
```

**Opção C: Usar Heroku**

```bash
# Instalar Heroku CLI
npm i -g heroku

# Login
heroku login

# Deploy
heroku create fenix-gestao-rh
git push heroku main
```

### 5. Configurar Domínio

1. Compre um domínio (ex: fenixgestao.com.br)
2. Configure os DNS para apontar para seu servidor
3. Ative SSL/HTTPS

### 6. Testar em Produção

- [ ] Acessar página inicial
- [ ] Testar cadastro de empresa
- [ ] Testar cadastro de candidato
- [ ] Testar login
- [ ] Testar criação de vaga
- [ ] Testar candidatura
- [ ] Verificar banco de dados

## 📊 Monitorar Aplicação

### Logs

```bash
# Ver logs em tempo real
heroku logs --tail

# Ou com Docker
docker logs -f fenix-gestao-rh
```

### Performance

- Usar Google PageSpeed Insights
- Verificar Core Web Vitals
- Monitorar tempo de resposta do banco

## 🔐 Segurança

- [x] Senhas criptografadas com bcrypt
- [x] Conexão SSL com TiDB
- [x] Validação de dados com Zod
- [ ] Rate limiting
- [ ] CORS configurado
- [ ] CSRF protection

## 📈 Próximas Melhorias

1. Implementar autenticação real (OAuth, JWT)
2. Adicionar notificações por email
3. Criar sistema de busca avançada
4. Implementar dashboard com gráficos
5. Adicionar sistema de avaliação
6. Integrar com WhatsApp API

## 🆘 Troubleshooting

### Erro: "Database connection refused"
- Verifique se o TiDB está acessível
- Confirme credenciais no `.env`
- Teste conexão: `mysql -h gateway02.us-east-1.prod.aws.tidbcloud.com -u 2Zf1mRz69FvZP92.root -p`

### Erro: "Port already in use"
- Mude a porta: `PORT=3001 pnpm dev`
- Ou mate o processo: `lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill`

### Erro: "Module not found"
- Reinstale dependências: `pnpm install`
- Limpe cache: `pnpm store prune`

## 📞 Suporte

Para dúvidas sobre publicação:
1. Verifique a documentação do seu host
2. Consulte a comunidade Fênix
3. Entre em contato com suporte

---

**Status:** Pronto para publicação ✅
