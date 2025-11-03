# Configuração com TiDB Cloud

## ✅ Credenciais Configuradas

Seu projeto já está configurado para conectar ao TiDB Cloud:

```
Host: gateway02.us-east-1.prod.aws.tidbcloud.com
Usuário: 2Zf1mRz69FvZP92.root
Banco: sistema_vagas_candidatos
```

## 1. Criar Banco de Dados no TiDB

### Opção A: Via TiDB Cloud Console

1. Acesse [tidbcloud.com](https://tidbcloud.com)
2. Vá para **SQL Editor**
3. Cole o script abaixo:

```sql
CREATE DATABASE IF NOT EXISTS sistema_vagas_candidatos;
USE sistema_vagas_candidatos;

-- Tabela de Empresas
CREATE TABLE IF NOT EXISTS empresas (
  id VARCHAR(64) PRIMARY KEY,
  nome_da_empresa VARCHAR(255) NOT NULL,
  cnpj VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  telefone VARCHAR(20),
  senha VARCHAR(255) NOT NULL,
  descricao TEXT,
  website VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_cnpj (cnpj)
);

-- Tabela de Candidatos
CREATE TABLE IF NOT EXISTS candidatos (
  id VARCHAR(64) PRIMARY KEY,
  nome_completo VARCHAR(255) NOT NULL,
  cpf VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  telefone VARCHAR(20),
  idade INT,
  endereco VARCHAR(255),
  formacao VARCHAR(255),
  habilidades TEXT,
  experiencia TEXT,
  senha VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_cpf (cpf)
);

-- Tabela de Vagas
CREATE TABLE IF NOT EXISTS vagas (
  id VARCHAR(64) PRIMARY KEY,
  empresa_id VARCHAR(64) NOT NULL,
  titulo_da_vaga VARCHAR(255) NOT NULL,
  descricao TEXT NOT NULL,
  requisitos TEXT,
  carga_horaria VARCHAR(100),
  salario INT,
  localizacao VARCHAR(255) NOT NULL,
  modalidade VARCHAR(20) NOT NULL CHECK (modalidade IN ('presencial', 'hibrido', 'remoto')),
  status VARCHAR(20) DEFAULT 'aberta' CHECK (status IN ('aberta', 'fechada')),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (empresa_id) REFERENCES empresas(id) ON DELETE CASCADE,
  INDEX idx_empresa_id (empresa_id),
  INDEX idx_status (status)
);

-- Tabela de Candidaturas
CREATE TABLE IF NOT EXISTS candidaturas (
  id VARCHAR(64) PRIMARY KEY,
  candidato_id VARCHAR(64) NOT NULL,
  vaga_id VARCHAR(64) NOT NULL,
  status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'aceito', 'rejeitado')),
  data_da_candidatura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE,
  FOREIGN KEY (vaga_id) REFERENCES vagas(id) ON DELETE CASCADE,
  INDEX idx_candidato_id (candidato_id),
  INDEX idx_vaga_id (vaga_id),
  UNIQUE KEY unique_candidatura (candidato_id, vaga_id)
);
```

4. Clique em **Execute**

### Opção B: Via MySQL Client

```bash
mysql -h gateway02.us-east-1.prod.aws.tidbcloud.com \
  -u 2Zf1mRz69FvZP92.root \
  -p < scripts/create-tables.sql
```

Quando solicitado, digite a senha: `RA2ZQaP158Jnvya6s9sE`

## 2. Instalar Dependências

```bash
cd /home/ubuntu/sistema-vagas-candidatos
pnpm install
```

## 3. Criar Migrações (Opcional)

```bash
pnpm db:push
```

## 4. Iniciar o Servidor

```bash
pnpm dev
```

Acesse `http://localhost:5173`

## ✅ Verificar Conexão

1. Abra o navegador em `http://localhost:5173`
2. Clique em "Criar Conta de Empresa"
3. Preencha o formulário e envie
4. Verifique se os dados aparecem no TiDB:

```bash
mysql -h gateway02.us-east-1.prod.aws.tidbcloud.com \
  -u 2Zf1mRz69FvZP92.root \
  -p -e "SELECT * FROM sistema_vagas_candidatos.empresas;"
```

## 🔧 Troubleshooting

### Erro: "Connection refused"
- Verifique se o host está correto
- Confirme que o banco de dados foi criado
- Teste a conexão:
  ```bash
  mysql -h gateway02.us-east-1.prod.aws.tidbcloud.com \
    -u 2Zf1mRz69FvZP92.root \
    -p -e "SELECT 1"
  ```

### Erro: "Table doesn't exist"
- Execute o script SQL novamente
- Verifique se o banco `sistema_vagas_candidatos` foi criado

### Erro: "Access denied"
- Confirme usuário e senha
- Verifique se o usuário tem permissões

## 📊 Monitorar Banco de Dados

No TiDB Cloud Console:
1. Vá para **SQL Editor**
2. Execute queries para monitorar dados:

```sql
-- Ver todas as empresas
SELECT * FROM empresas;

-- Ver todas as vagas
SELECT * FROM vagas;

-- Ver candidaturas
SELECT * FROM candidaturas;

-- Contar registros
SELECT 
  (SELECT COUNT(*) FROM empresas) as total_empresas,
  (SELECT COUNT(*) FROM candidatos) as total_candidatos,
  (SELECT COUNT(*) FROM vagas) as total_vagas,
  (SELECT COUNT(*) FROM candidaturas) as total_candidaturas;
```

## 🔐 Segurança

- ✅ Senhas criptografadas com bcrypt
- ✅ Conexão SSL com TiDB
- ✅ Validação de dados com Zod
- ✅ Índices para performance

## 📚 Próximos Passos

1. Implementar autenticação com sessões
2. Adicionar validação de email
3. Implementar busca e filtros avançados
4. Adicionar notificações por email
5. Configurar backup automático
