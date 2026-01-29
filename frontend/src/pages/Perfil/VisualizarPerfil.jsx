import React, { useEffect, useState } from "react";
import "../Perfil/Perfil.css";
import { storage } from "../../service/storageService";

export default function PerfilUsuario() {
  const [perfil, setPerfil] = useState({
    name: "",
    email: "",
    cpf: "",
    telephone: "",
    role: ""
  });

  const [novaSenha, setNovaSenha] = useState("");

  const [editando, setEditando] = useState({
    name: false,
    telephone: false,
    email: false,
    cpf: false,
    password: false
  });

  const [mostrar, setMostrar] = useState({
    password: false
  });

  const token = storage.getToken();

  const toggleEdit = (campo) => {
    setEditando((prev) => ({
      ...prev,
      [campo]: !prev[campo]
    }));
  };

  const toggleMostrar = (campo) => {
    setMostrar((prev) => ({
      ...prev,
      [campo]: !prev[campo]
    }));
  };

  // 🔹 BUSCAR PERFIL
  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8080/api/users/perfil", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar perfil");
        return res.json();
      })
      .then((data) => {
        setPerfil({
          name: data.name ?? "",
          email: data.email ?? "",
          cpf: data.cpf ?? "",
          telephone: data.telephone ?? "",
          role: data.role ?? ""
        });
      })
      .catch(console.error);
  }, [token]);

  // 🔹 SALVAR PERFIL Ainda precisa de alguns ajustes
  const handleSave = () => {
    if (!token) return;

    fetch("http://localhost:8080/api/users/perfil", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: perfil.name,
        telephone: perfil.telephone,
        email: perfil.email,
        cpf: perfil.cpf
      })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao atualizar perfil");
        alert("Perfil atualizado com sucesso!");
        setEditando({
          name: false,
          telephone: false,
          email: false,
          cpf: false,
          password: false
        });
      })
      .catch(console.error);
  };

  // 🔹 SALVAR SENHA
  const handleSaveSenha = () => {
    if (!novaSenha) {
      alert("Digite uma nova senha");
      return;
    }

    fetch("http://localhost:8080/api/users/password", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password: novaSenha })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao alterar senha");
        alert("Senha alterada com sucesso!");
        setNovaSenha("");
        setEditando((prev) => ({ ...prev, password: false }));
        setMostrar((prev) => ({ ...prev, password: false }));
      })
      .catch(console.error);
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
            <img src="https://i.pravatar.cc/150" alt="Perfil" />
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
              <p>Visualize e edite suas informações</p>
            </div>

            <button className="btn-save" onClick={handleSave}>
              Salvar Alterações
            </button>
          </div>

          <form className="form">
            {/* NOME */}
            <div className="form-group">
              <label>Nome Completo</label>
              <div className="input-edit-wrapper">
                <input
                  type="text"
                  value={perfil.name}
                  disabled={!editando.name}
                  onChange={(e) =>
                    setPerfil({ ...perfil, name: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="btn-edit"
                  onClick={() => toggleEdit("name")}
                >
                  {editando.name ? "Salvar" : "Editar"}
                </button>
              </div>
            </div>

            {/* PERFIL */}
            <div className="form-group">
              <label>Perfil</label>
              <input type="text" value={perfil.role} readOnly />
            </div>

            {/* CPF */}
            <div className="form-group">
              <label>CPF</label>
              <div className="input-edit-wrapper">
                <input
                  type="text"
                  value={perfil.cpf}
                  disabled={!editando.cpf}
                  onChange={(e) =>
                    setPerfil({ ...perfil, cpf: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="btn-edit"
                  onClick={() => toggleEdit("cpf")}
                >
                  {editando.cpf ? "Salvar" : "Editar"}
                </button>
              </div>
            </div>

            {/* TELEFONE */}
            <div className="form-group">
              <label>Telefone</label>
              <div className="input-edit-wrapper">
                <input
                  type="tel"
                  value={perfil.telephone}
                  disabled={!editando.telephone}
                  onChange={(e) =>
                    setPerfil({ ...perfil, telephone: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="btn-edit"
                  onClick={() => toggleEdit("telephone")}
                >
                  {editando.telephone ? "Salvar" : "Editar"}
                </button>
              </div>
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label>E-mail</label>
              <div className="input-edit-wrapper">
                <input
                  type="email"
                  value={perfil.email}
                  disabled={!editando.email}
                  onChange={(e) =>
                    setPerfil({ ...perfil, email: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="btn-edit"
                  onClick={() => toggleEdit("email")}
                >
                  {editando.email ? "Salvar" : "Editar"}
                </button>
              </div>
            </div>

            {/* SENHA */}
            <div className="form-group">
              <label>Senha</label>
              <div className="input-edit-wrapper">
                <input
                  type={mostrar.password ? "text" : "password"}
                  value={editando.password ? novaSenha : "Senha atual"}
                  disabled={!editando.password}
                  placeholder="Digite uma nova senha"
                  onChange={(e) => setNovaSenha(e.target.value)}
                />

                <button
                  type="button"
                  className="btn-edit"
                  onClick={() => toggleMostrar("password")}
                >
                  {mostrar.password ? "Ocultar" : "Mostrar"}
                </button>

                <button
                  type="button"
                  className="btn-edit"
                  onClick={() => toggleEdit("password")}
                >
                  {editando.password ? "Cancelar" : "Editar"}
                </button>
              </div>

              {editando.password && (
                <button
                  type="button"
                  className="btn-save"
                  style={{ marginTop: "10px" }}
                  onClick={handleSaveSenha}
                >
                  Salvar Nova Senha
                </button>
              )}
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