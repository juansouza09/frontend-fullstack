import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastroUser from "./components/user/CadastroUser";
import CadastroProduct from "./components/product/CadastroProduto";
import ListUser from "./components/user/ListUser";
import UpdateUser from "./components/user/UpdateUserPage";
import ListProduct from "./components/product/ListarProdutos"; // Importando o componente ListarProdutos
import UpdateProduct from "./components/product/AtualizarProduto"; // Importando o componente AtualizarProduto

import ListVendas from "./components/sales/ListarVendas";
import CadastroVenda from "./components/sales/Vendas";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        {/* Rotas de usuário */}
        <Route path="/cadastroUser" element={<CadastroUser />}></Route>
        <Route path="/listUser" element={<ListUser />}></Route>
        <Route path="/update_user/:id" element={<UpdateUser />}></Route>
        
        {/* Rotas de produto */}
        <Route path="/cadastroProduct" element={<CadastroProduct />}></Route>
        <Route path="/listProduct" element={<ListProduct />}></Route>
        <Route path="/update_product/:id" element={<UpdateProduct />}></Route>

        <Route path="/cadastroSale" element={<CadastroVenda />}></Route>
        <Route path="/listarSale" element={<ListVendas />}></Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
