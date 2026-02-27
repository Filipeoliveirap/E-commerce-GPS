import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Produtos from "./pages/Produtos";
import "./App.css";
import PerfilUsuario from "./pages/Perfil/VisualizarPerfil";
import Carrinho from "./pages/Carrinho";
import AdicionarProduto from "./pages/AdicionarProduto";
import AddressPage from "./pages/AddressPage/AddressPage";
import PaymentPage from "./pages/Checkout/payment";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/produtos/adicionar" element={<AdicionarProduto />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/perfil" element={<PerfilUsuario />} />
        <Route path="/endereco/cadastrar" element={<AddressPage />} />
        <Route path="/checkout" element={<PaymentPage />} />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}
