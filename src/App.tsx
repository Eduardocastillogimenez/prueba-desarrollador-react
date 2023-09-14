import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./view/Login";
import Register from "./view/Register";
import Principal from "./view/Principal";
import { ProtectedRoute } from "./view/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";
import './App.less';
import './App.css';

function App() {
  // -------------- rutas y logica de las mismas  -------------- //
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <React.Suspense fallback={<></>}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<ProtectedRoute> <Principal /> </ProtectedRoute>} />
            </Routes>
          </Router>
        </AuthProvider>
      </React.Suspense>
    </div>
  );
}

export default App;