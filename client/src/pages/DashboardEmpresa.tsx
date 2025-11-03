import { useState } from "react";
import { Link } from "wouter";

export default function DashboardEmpresa() {
  const [vagas, setVagas] = useState([
    {
      id: "1",
      titulo_da_vaga: "Desenvolvedor React",
      descricao: "Procuramos um desenvolvedor React experiente",
      localizacao: "São Paulo, SP",
      modalidade: "hibrido",
      status: "aberta",
      candidatos: 5,
    },
  ]);

  const [showNovaVaga, setShowNovaVaga] = useState(false);
  const [novaVaga, setNovaVaga] = useState({
    titulo_da_vaga: "",
    descricao: "",
    requisitos: "",
    carga_horaria: "",
    salario: "",
    localizacao: "",
    modalidade: "presencial",
  });

  const handleCriarVaga = (e: React.FormEvent) => {
    e.preventDefault();
    setShowNovaVaga(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("empresaId");
    localStorage.removeItem("empresaNome");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="sidebar w-64">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">🔥</span>
          </div>
          <h2 className="text-white font-bold">
            <span className="text-gold">Fênix</span> RH
          </h2>
        </div>

        <nav className="space-y-2">
          <div className="sidebar-item active">
            <span>📊</span>
            <span>Dashboard</span>
          </div>
          <div className="sidebar-item">
            <span>📋</span>
            <span>Vagas</span>
          </div>
          <div className="sidebar-item">
            <span>➕</span>
            <span>Cadastrar vaga</span>
          </div>
          <div className="sidebar-item">
            <span>👥</span>
            <span>Candidatos</span>
          </div>
          <div className="sidebar-item">
            <span>👤</span>
            <span>Meu perfil</span>
          </div>
          <div className="sidebar-item" onClick={handleLogout}>
            <span>🚪</span>
            <span>Sair</span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy">Dashboard da Empresa</h1>
          <p className="text-gray-600 mt-1">
            {localStorage.getItem("empresaNome")}
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Vagas Ativas</p>
                <p className="text-3xl font-bold text-navy">
                  {vagas.filter((v) => v.status === "aberta").length}
                </p>
              </div>
              <div className="text-4xl">📋</div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Vagas Fechadas</p>
                <p className="text-3xl font-bold text-navy">
                  {vagas.filter((v) => v.status === "fechada").length}
                </p>
              </div>
              <div className="text-4xl">🔒</div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total de Candidatos</p>
                <p className="text-3xl font-bold text-navy">
                  {vagas.reduce((sum, v) => sum + v.candidatos, 0)}
                </p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Taxa de Preenchimento</p>
                <p className="text-3xl font-bold text-navy">75%</p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </div>
        </div>

        {/* Minhas Vagas */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-navy">Minhas Vagas</h2>
            <button
              onClick={() => setShowNovaVaga(!showNovaVaga)}
              className="btn-orange"
            >
              + Nova Vaga
            </button>
          </div>

          {showNovaVaga && (
            <form onSubmit={handleCriarVaga} className="mb-8 p-6 bg-gray-50 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Título da Vaga
                  </label>
                  <input
                    type="text"
                    value={novaVaga.titulo_da_vaga}
                    onChange={(e) =>
                      setNovaVaga({ ...novaVaga, titulo_da_vaga: e.target.value })
                    }
                    placeholder="Ex: Desenvolvedor React"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Localização
                  </label>
                  <input
                    type="text"
                    value={novaVaga.localizacao}
                    onChange={(e) =>
                      setNovaVaga({ ...novaVaga, localizacao: e.target.value })
                    }
                    placeholder="Ex: São Paulo, SP"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Modalidade
                  </label>
                  <select
                    value={novaVaga.modalidade}
                    onChange={(e) =>
                      setNovaVaga({ ...novaVaga, modalidade: e.target.value })
                    }
                  >
                    <option value="presencial">Presencial</option>
                    <option value="hibrido">Híbrido</option>
                    <option value="remoto">Remoto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Salário (opcional)
                  </label>
                  <input
                    type="number"
                    value={novaVaga.salario}
                    onChange={(e) =>
                      setNovaVaga({ ...novaVaga, salario: e.target.value })
                    }
                    placeholder="Ex: 5000"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-navy mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={novaVaga.descricao}
                    onChange={(e) =>
                      setNovaVaga({ ...novaVaga, descricao: e.target.value })
                    }
                    placeholder="Descreva a vaga..."
                    required
                    rows={4}
                  />
                </div>
              </div>

              <div className="mt-4 flex gap-4">
                <button type="submit" className="btn-navy">
                  Publicar Vaga
                </button>
                <button
                  type="button"
                  onClick={() => setShowNovaVaga(false)}
                  className="bg-gray-300 text-navy px-6 py-2 rounded-lg hover:bg-gray-400 font-semibold"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}

          {/* Lista de Vagas */}
          <div className="space-y-4">
            {vagas.map((vaga) => (
              <div key={vaga.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-navy">
                      {vaga.titulo_da_vaga}
                    </h3>
                    <p className="text-gray-600 text-sm">{vaga.descricao}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      vaga.status === "aberta"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {vaga.status === "aberta" ? "Aberta" : "Fechada"}
                  </span>
                </div>

                <div className="flex gap-4 text-sm text-gray-600 mb-4">
                  <span>📍 {vaga.localizacao}</span>
                  <span>💼 {vaga.modalidade}</span>
                  <span>👥 {vaga.candidatos} candidatos</span>
                </div>

                <div className="flex gap-2">
                  <Link href={`/vaga/${vaga.id}`}>
                    <a className="text-orange hover:underline font-semibold">Ver Detalhes</a>
                  </Link>
                  <button className="text-orange hover:underline font-semibold">Editar</button>
                  <button className="text-red-600 hover:underline font-semibold">Deletar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
