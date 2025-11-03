# Configuração do Supabase

## 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Preencha os dados:
   - **Project Name**: sistema-vagas-candidatos
   - **Database Password**: Crie uma senha forte
   - **Region**: Escolha a região mais próxima
4. Aguarde a criação do projeto

## 2. Obter Credenciais

1. No dashboard do projeto, vá para **Settings** → **API**
2. Copie:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** → `SUPABASE_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

## 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua-chave-publica
SUPABASE_SERVICE_ROLE_KEY=sua-chave-privada
```

## 4. Criar Tabelas no Supabase

1. No dashboard, vá para **SQL Editor**
2. Clique em **New Query**
3. Cole o script abaixo:

```sql
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
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (empresa_id) REFERENCES empresas(id)
);

-- Tabela de Candidaturas
CREATE TABLE IF NOT EXISTS candidaturas (
  id VARCHAR(64) PRIMARY KEY,
  candidato_id VARCHAR(64) NOT NULL,
  vaga_id VARCHAR(64) NOT NULL,
  status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'aceito', 'rejeitado')),
  data_da_candidatura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id),
  FOREIGN KEY (vaga_id) REFERENCES vagas(id)
);

-- Criar índices
CREATE INDEX idx_vagas_empresa_id ON vagas(empresa_id);
CREATE INDEX idx_vagas_status ON vagas(status);
CREATE INDEX idx_candidaturas_candidato_id ON candidaturas(candidato_id);
CREATE INDEX idx_candidaturas_vaga_id ON candidaturas(vaga_id);
CREATE UNIQUE INDEX idx_empresas_email ON empresas(email);
CREATE UNIQUE INDEX idx_empresas_cnpj ON empresas(cnpj);
CREATE UNIQUE INDEX idx_candidatos_email ON candidatos(email);
CREATE UNIQUE INDEX idx_candidatos_cpf ON candidatos(cpf);
```

4. Clique em **Run** para executar o script

## 5. Habilitar RLS (Row Level Security)

Para cada tabela:

1. Vá para **Authentication** → **Policies**
2. Selecione a tabela
3. Clique em **New Policy**
4. Configure conforme necessário

## 6. Instalar Dependências

```bash
pnpm install
```

## 7. Iniciar o Servidor

```bash
pnpm dev
```

Acesse `http://localhost:5173`

## ✅ Verificar Conexão

1. Abra o navegador em `http://localhost:5173`
2. Teste o cadastro de empresa
3. Verifique se os dados aparecem no Supabase

## 🔧 Troubleshooting

### Erro: "SUPABASE_URL is missing"
- Verifique se o arquivo `.env` existe
- Confirme que as variáveis estão corretas

### Erro: "Connection refused"
- Verifique se o servidor está rodando
- Confirme a URL do Supabase

### Erro: "Table does not exist"
- Execute o script SQL novamente
- Verifique se as tabelas foram criadas em **Table Editor**

## 📚 Próximos Passos

1. Implementar autenticação real
2. Adicionar validação de dados
3. Configurar emails de notificação
4. Implementar busca e filtros avançados
