import { useState } from "react";
import { useNavigate, Link } from "wouter";

export default function CadastroCandidato() {
  const [, setLocation] = useNavigate();
  const [formData, setFormData] = useState({
    nome_completo: "",
    cpf: "",
    email: "",
    telefone: "",
    idade: "",
    endereco: "",
    formacao: "",
    habilidades: "",
    experiencia: "",
    senha: "",
    confirmarSenha: "",
  });
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    if (formData.senha !== formData.confirmarSenha) {
      setErro("As senhas não conferem");
      return;
    }

    setCarregando(true);

    try {
      // Simulação de cadastro - substituir por chamada real à API
      console.log("Cadastro candidato:", formData);
      localStorage.setItem("candidatoId", "candidato-123");
      localStorage.setItem("candidatoNome", formData.nome_completo);
      setLocation("/dashboard-candidato");
    } catch (err) {
      setErro("Erro ao cadastrar. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Cadastro de Candidato</h1>
          <p className="text-gray-600 mt-2">Crie sua conta de candidato</p>
        </div>

        {erro && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 max-h-96 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              name="nome_completo"
              value={formData.nome_completo}
              onChange={handleChange}
              placeholder="João Silva"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              CPF
            </label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="123.456.789-00"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="candidato@example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Telefone
            </label>
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(11) 98765-4321"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Idade
            </label>
            <input
              type="number"
              name="idade"
              value={formData.idade}
              onChange={handleChange}
              placeholder="25"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Endereço
            </label>
            <input
              type="text"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              placeholder="Rua, Cidade, Estado"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Formação
            </label>
            <input
              type="text"
              name="formacao"
              value={formData.formacao}
              onChange={handleChange}
              placeholder="Graduação em..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Habilidades
            </label>
            <textarea
              name="habilidades"
              value={formData.habilidades}
              onChange={handleChange}
              placeholder="Ex: JavaScript, React, Node.js"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm h-16"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Experiência
            </label>
            <textarea
              name="experiencia"
              value={formData.experiencia}
              onChange={handleChange}
              placeholder="Descreva sua experiência profissional"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm h-16"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Senha
            </label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Confirmar Senha
            </label>
            <input
              type="password"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400 mt-4"
          >
            {carregando ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Já tem conta?{" "}
            <Link href="/login-candidato" className="text-green-600 hover:underline font-semibold">
              Entrar
            </Link>
          </p>
        </div>

        <div className="mt-4">
          <Link href="/" className="text-green-600 hover:underline text-sm">
            ← Voltar para Home
          </Link>
        </div>
      </div>
    </div>
  );
}
