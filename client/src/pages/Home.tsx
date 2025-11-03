import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header com Logo */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-5xl">🔥</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold">
            <span className="text-gold">Fênix</span>
            <span className="text-navy"> Gestão RH</span>
          </h1>
          <p className="text-gray-600 mt-2 text-lg italic">
            A gestão que inspira recomeços
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Card Empresa */}
          <div className="card hover:shadow-xl transition transform hover:scale-105">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-navy rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏢</span>
              </div>
              <h2 className="text-2xl font-bold text-navy">Sou Empresa</h2>
              <p className="text-gray-600 mt-2">
                Publique vagas e encontre os melhores talentos
              </p>
            </div>

            <ul className="space-y-3 mb-8 text-gray-700">
              <li className="flex items-center">
                <span className="text-orange mr-3 font-bold">✓</span>
                Publicar vagas de emprego
              </li>
              <li className="flex items-center">
                <span className="text-orange mr-3 font-bold">✓</span>
                Visualizar candidatos
              </li>
              <li className="flex items-center">
                <span className="text-orange mr-3 font-bold">✓</span>
                Gerenciar candidaturas
              </li>
              <li className="flex items-center">
                <span className="text-orange mr-3 font-bold">✓</span>
                Filtrar por competências
              </li>
            </ul>

            <div className="space-y-3">
              <button
                onClick={() => setLocation("/login-empresa")}
                className="w-full btn-navy"
              >
                Entrar como Empresa
              </button>
              <button
                onClick={() => setLocation("/cadastro-empresa")}
                className="w-full bg-gray-200 text-navy py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Criar Conta de Empresa
              </button>
            </div>
          </div>

          {/* Card Candidato */}
          <div className="card hover:shadow-xl transition transform hover:scale-105">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-orange rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👤</span>
              </div>
              <h2 className="text-2xl font-bold text-navy">Sou Candidato</h2>
              <p className="text-gray-600 mt-2">
                Encontre oportunidades de emprego
              </p>
            </div>

            <ul className="space-y-3 mb-8 text-gray-700">
              <li className="flex items-center">
                <span className="text-orange mr-3 font-bold">✓</span>
                Buscar vagas disponíveis
              </li>
              <li className="flex items-center">
                <span className="text-orange mr-3 font-bold">✓</span>
                Filtrar por localização
              </li>
              <li className="flex items-center">
                <span className="text-orange mr-3 font-bold">✓</span>
                Candidatar-se a vagas
              </li>
              <li className="flex items-center">
                <span className="text-orange mr-3 font-bold">✓</span>
                Gerenciar candidaturas
              </li>
            </ul>

            <div className="space-y-3">
              <button
                onClick={() => setLocation("/login-candidato")}
                className="w-full btn-navy"
              >
                Entrar como Candidato
              </button>
              <button
                onClick={() => setLocation("/cadastro-candidato")}
                className="w-full bg-gray-200 text-navy py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Criar Conta de Candidato
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="card mb-12">
          <h3 className="text-3xl font-bold text-navy mb-12 text-center">
            Por que usar o Fênix Gestão RH?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="text-xl font-semibold text-navy mb-2">
                Rápido e Fácil
              </h4>
              <p className="text-gray-600">
                Cadastre-se em minutos e comece a usar a plataforma
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h4 className="text-xl font-semibold text-navy mb-2">
                Seguro
              </h4>
              <p className="text-gray-600">
                Seus dados estão protegidos com criptografia
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-xl font-semibold text-navy mb-2">
                Eficiente
              </h4>
              <p className="text-gray-600">
                Encontre as melhores oportunidades rapidamente
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-navy text-white rounded-lg p-8 text-center">
          <p className="mb-4">
            © 2025 Fênix Gestão RH. Todos os direitos reservados.
          </p>
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-orange transition">
              Termos de Uso
            </a>
            <a href="#" className="hover:text-orange transition">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-orange transition">
              Contato
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
