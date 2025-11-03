import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import LoginEmpresa from "./pages/LoginEmpresa";
import CadastroEmpresa from "./pages/CadastroEmpresa";
import LoginCandidato from "./pages/LoginCandidato";
import CadastroCandidato from "./pages/CadastroCandidato";
import DashboardEmpresa from "./pages/DashboardEmpresa";
import DashboardCandidato from "./pages/DashboardCandidato";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login-empresa" component={LoginEmpresa} />
      <Route path="/cadastro-empresa" component={CadastroEmpresa} />
      <Route path="/login-candidato" component={LoginCandidato} />
      <Route path="/cadastro-candidato" component={CadastroCandidato} />
      <Route path="/dashboard-empresa" component={DashboardEmpresa} />
      <Route path="/dashboard-candidato" component={DashboardCandidato} />
      <Route>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-gray-600 mb-8">Página não encontrada</p>
            <a href="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Voltar para Home
            </a>
          </div>
        </div>
      </Route>
    </Switch>
  );
}

export default App;
