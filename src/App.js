import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import LoginPage from "./pages/Login";
import LoginEmpresaPage from "./pages/LoginEmpresa";
import PainelPage from "./pages/Painel";
import AreaClientePage from "./pages/AreaCliente";
import VideosPage from "./pages/Videos";
import ClientePrivateRoute from "./auth/ClientePrivateRoute";

function App() {
  useEffect(() => {
    document.title = 'DIS';
  }, []);
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={
          <LoginPage />
        } />
        <Route path='/' >
          <Route index element={
            <PrivateRoute >
              <PainelPage />
            </PrivateRoute>
          } />
        </Route>
        <Route path='/areadocliente' >
          <Route index element={
            <ClientePrivateRoute >
              <AreaClientePage />
            </ClientePrivateRoute>
          } />
          <Route path="videos" element={
            <ClientePrivateRoute >
              <VideosPage />
            </ClientePrivateRoute>
          } />
          <Route path="login" element={
            <LoginEmpresaPage />
          } />
        
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
