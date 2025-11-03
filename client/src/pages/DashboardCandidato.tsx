import { useState } from "react";
import { Link } from "wouter";

export default function DashboardCandidato() {
  const [vagas, setVagas] = useState([
    {
      id: "1",
      titulo_da_vaga: "Desenvolvedor React",
      empresa: "Tech Company",
      localizacao: "São Paulo, SP",
      modalidade: "hibrido",
      salario: 5000,
      descricao: "Procuramos um desenvolvedor React experiente",
    },
    {
      id: "2",
      titulo_da_vaga: "Desenvolvedor Node.js",
      empresa: "Startup XYZ",
      localizacao: "Rio de Janeiro, RJ",
      modalidade: "remoto",
      salario: 6000,
      descricao: "Desenvolvedor Node.js para backend",
    },
  ]);

  const [candidaturas, setCandidaturas] = useState([
    {
      id: "1",
      vaga_id: "1",
      titulo_da_vaga: "Desenvolvedor React",
      empresa: "Tech Company",
      status: "pendente",
      data: "2025-11-01",
    },
  ]);

  const [filtros, setFiltros] = useState({
    titulo: "",
    localizacao: "",
    modalidade: "",
    salarioMin: "",
  });

  const handleCandidatar = (vagaId: string) => {
    alert("Candidatura enviada com sucesso!");
  };

  const handleLogout = () => {
    localStorage.removeItem("candidatoId");
    localStorage.removeItem("candidatoNome");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard do Candidato
            </h1>
            <p className="text-gray-600 mt-1">
              {localStorage.getItem("candidatoNome")}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Candidaturas Enviadas</p>
                <p className="text-3xl font-bold text-gray-900">
                  {candidaturas.length}
                </p>
              </div>
              <div className="text-4xl">📤</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pendentes</p>
                <p className="text-3xl font-bold text-gray-900">
                  {candidaturas.filter((c) => c.status === "pendente").length}
                </p>
              </div>
              <div className="text-4xl">⏳</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Vagas Disponíveis</p>
                <p className="text-3xl font-bold text-gray-900">{vagas.length}</p>
              </div>
              <div className="text-4xl">💼</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Filtros */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Filtros</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Título da Vaga
                  </label>
                  <input
                    type="text"
                    value={filtros.titulo}
                    onChange={(e) =>
                      setFiltros({ ...filtros, titulo: e.target.value })
                    }
                    placeholder="Ex: React"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Localização
                  </label>
                  <input
                    type="text"
                    value={filtros.localizacao}
                    onChange={(e) =>
                      setFiltros({ ...filtros, localizacao: e.target.value })
                    }
                    placeholder="Ex: São Paulo"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Modalidade
                  </label>
                  <select
                    value={filtros.modalidade}
                    onChange={(e) =>
                      setFiltros({ ...filtros, modalidade: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Todas</option>
                    <option value="presencial">Presencial</option>
                    <option value="hibrido">Híbrido</option>
                    <option value="remoto">Remoto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Salário Mínimo
                  </label>
                  <input
                    type="number"
                    value={filtros.salarioMin}
                    onChange={(e) =>
                      setFiltros({ ...filtros, salarioMin: e.target.value })
                    }
                    placeholder="Ex: 5000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-semibold">
                  Buscar
                </button>
              </div>
            </div>
          </div>

          {/* Vagas */}
          <div className="md:col-span-2">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Vagas Disponíveis
              </h3>

              {vagas.map((vaga) => (
                <div
                  key={vaga.id}
                  className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        {vaga.titulo_da_vaga}
                      </h4>
                      <p className="text-gray-600 text-sm">{vaga.empresa}</p>
                    </div>
                    {vaga.salario && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        R$ {vaga.salario.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 mb-4">{vaga.descricao}</p>

                  <div className="flex gap-4 text-sm text-gray-600 mb-4">
                    <span>📍 {vaga.localizacao}</span>
                    <span>💼 {vaga.modalidade}</span>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/vaga/${vaga.id}`}>
                      <a className="flex-1 bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-center hover:bg-blue-200 font-semibold">
                        Ver Detalhes
                      </a>
                    </Link>
                    <button
                      onClick={() => handleCandidatar(vaga.id)}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-semibold"
                    >
                      Candidatar-se
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Minhas Candidaturas */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Minhas Candidaturas
              </h3>

              <div className="space-y-4">
                {candidaturas.map((candidatura) => (
                  <div
                    key={candidatura.id}
                    className="bg-white rounded-lg shadow p-6"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {candidatura.titulo_da_vaga}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {candidatura.empresa}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          Enviada em: {new Date(candidatura.data).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          candidatura.status === "pendente"
                            ? "bg-yellow-100 text-yellow-800"
                            : candidatura.status === "aceito"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {candidatura.status === "pendente"
                          ? "Pendente"
                          : candidatura.status === "aceito"
                          ? "Aceito"
                          : "Rejeitado"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
