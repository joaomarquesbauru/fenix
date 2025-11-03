import { useState } from "react";
import { useNavigate, Link } from "wouter";

export default function LoginCandidato() {
  const [, setLocation] = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro("");

    try {
      console.log("Login candidato:", { email, senha });
      localStorage.setItem("candidatoId", "candidato-123");
      localStorage.setItem("candidatoNome", "João Silva");
      setLocation("/dashboard-candidato");
    } catch (err) {
      setErro("Email ou senha inválidos");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange to-red-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🔥</span>
          </div>
          <h1 className="text-3xl font-bold text-white">
            <span className="text-gold">Fênix</span>
            <span> Gestão RH</span>
          </h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-navy mb-2 text-center">
            Entrar como Candidato
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Acesse sua conta de candidato
          </p>

          {erro && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="candidato@example.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-2">
                Senha
              </label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={carregando}
              className="w-full btn-orange disabled:bg-gray-400 mt-6"
            >
              {carregando ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Não tem conta?{" "}
              <Link href="/cadastro-candidato" className="text-orange hover:underline font-semibold">
                Cadastre-se
              </Link>
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <Link href="/" className="text-orange hover:underline text-sm text-center block">
              ← Voltar para Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
