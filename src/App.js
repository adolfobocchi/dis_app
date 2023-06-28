import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import LoginPage from "./pages/Login";
import PainelPage from "./pages/Painel";

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
      </Routes>
    </Router>
  );
}

export default App;
