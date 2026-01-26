import React, { useEffect, useState } from "react";
import "../Perfil/Perfil.css";

export default function PerfilUsuario() {
  const [perfil, setPerfil] = useState({
    name: "",
    email: "",
    cpf: "",
    telephone: "",
    role: ""
  });

  const token = localStorage.getItem("token"); // JWT

  // 🔹 BUSCAR PERFIL
  useEffect(() => {
    fetch("http://localhost:8080/api/users/perfil", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        setPerfil(data);
      })
      .catch(err => {
        console.error("Erro ao buscar perfil:", err);
      });
  }, [token]);

  // 🔹 ATUALIZAR PERFIL
  const handleSave = () => {
    fetch("http://localhost:8080/api/users/perfil", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: perfil.name,
        telephone: perfil.telephone
      })
    })
      .then(res => res.json())
      .then(() => {
        alert("Perfil atualizado com sucesso!");
      })
      .catch(err => {
        console.error("Erro ao atualizar perfil:", err);
      });
  };

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <div className="logo-icon">⚡</div>
            <h2>
              A.J.F. <span>Eletrônicos</span>
            </h2>
          </div>

          <input className="search" placeholder="Buscar produtos..." />

          <div className="user-info">
            <img
              src="https://i.pravatar.cc/150"
              alt="Perfil"
            />
            <div>
              <p className="user-name">{perfil.name}</p>
              <span>Minha Conta</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="main">
        <aside className="sidebar">
          <h3>Painel</h3>
          <p>Configurações da conta</p>
          <ul>
            <li className="active">Dados Pessoais</li>
            <li className="logout">Sair da Conta</li>
          </ul>
        </aside>

        <section className="content">
          <div className="content-header">
            <div>
              <h1>Dados Pessoais</h1>
              <p>Visualize e salve suas informações</p>
            </div>

            <button className="btn-save" onClick={handleSave}>
              Salvar Informações
            </button>
          </div>

          <form className="form">
            <div className="form-group full">
              <label>Nome Completo</label>
              <input
                type="text"
                value={perfil.name}
                onChange={e =>
                  setPerfil({ ...perfil, name: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Telefone</label>
              <input
                type="tel"
                value={perfil.telephone}
                onChange={e =>
                  setPerfil({ ...perfil, telephone: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>E-mail</label>
              <input type="email" value={perfil.email} readOnly />
            </div>

            <div className="form-group">
              <label>CPF</label>
              <input type="text" value={perfil.cpf} readOnly />
            </div>

            <div className="form-group">
              <label>Perfil</label>
              <input type="text" value={perfil.role} readOnly />
            </div>
          </form>
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 A.J.F. Eletrônicos</p>
      </footer>
    </div>
  );
}