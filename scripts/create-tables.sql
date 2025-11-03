-- Criar banco de dados
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
