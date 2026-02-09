import React, { useEffect, useState } from "react";
import "../Perfil/Perfil.css";
import { useProfile } from "../../hook/useProfile";
import { MaskUtils } from "../../utils/maskUtils";

export default function PerfilUsuario() {
  const {
    user,
    loading,
    handleUpdateProfile,
    handleUpdatePassword,
    fetchCamposReais,
    camposReais,
  } = useProfile();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    cpf: user?.cpf || "",
    telephone: user?.telephone || "",
  });

  const [newPassword, setNewPassword] = useState("");
  const [editando, setEditando] = useState({
    name: false,
    email: false,
    cpf: false,
    telephone: false,
    password: false,
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Sincroniza o form quando o user é carregado
  useEffect(() => {
    if (!user) return;

    const updateForm = () => {
      setForm({
        name: user.name || "",
        email: user.email || "",
        cpf: user.cpf || "",
        telephone: user.telephone || "",
      });
    };

    setTimeout(updateForm, 0);
  }, [user]);

  // Alterna edição
  const toggleEdit = (campo) => {
    setEditando((prev) => ({ ...prev, [campo]: !prev[campo] }));

    setForm((prev) => ({
      ...prev,
      [campo]: prev[campo] || camposReais[campo] || user[campo],
    }));
  };
  // Alterna visibilidade da senha
  const toggleMostrarSenha = () => setMostrarSenha((prev) => !prev);

  // Salva perfil
  const handleSave = async () => {
    if (!user) return;

    const formParaEnvio = { ...form };

    ["email", "cpf", "telephone"].forEach((campo) => {
      // Se o valor atual do form é igual à versão mascarada do campo real
      if (
        campo === "email" &&
        form[campo] === MaskUtils.maskEmail(camposReais[campo])
      ) {
        formParaEnvio[campo] = camposReais[campo]; // envia o valor real
      } else if (
        campo === "cpf" &&
        form[campo] === MaskUtils.maskCpf(camposReais[campo])
      ) {
        formParaEnvio[campo] = camposReais[campo];
      } else if (
        campo === "telephone" &&
        form[campo] === MaskUtils.maskTelephone(camposReais[campo])
      ) {
        formParaEnvio[campo] = camposReais[campo];
      }
    });

    const sucesso = await handleUpdateProfile(formParaEnvio);

    if (sucesso) {
      setEditando({
        name: false,
        email: false,
        cpf: false,
        telephone: false,
        password: false,
      });
      setForm(formParaEnvio);
    }
  };

  // Salva nova senha
  const handleSaveSenha = async () => {
    const sucesso = await handleUpdatePassword(newPassword);
    if (sucesso) {
      setNewPassword("");
      setEditando((prev) => ({ ...prev, newPassword: false }));
      setMostrarSenha(false);
    }
  };

  const campos = [
    { name: "name", label: "Nome", type: "text" },
    { name: "cpf", label: "CPF", type: "text" },
    { name: "telephone", label: "Telefone", type: "tel" },
    { name: "email", label: "E-mail", type: "email" },
  ];

  const [mostrarCampo, setMostrarCampo] = useState({
    email: false,
    cpf: false,
    telephone: false,
  });

  const toggleMostrarCampo = async (campo) => {
    if (!camposReais.email && !camposReais.cpf && !camposReais.telephone) {
      await fetchCamposReais();
    }
    setMostrarCampo((prev) => ({ ...prev, [campo]: !prev[campo] }));
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
              <p className="user-name">{user?.name}</p>
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
            <button
              className="btn-save"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Atualizando..." : "Salvar Alterações"}
            </button>
          </div>

          <form className="form">
            {/* Campos do usuário */}
            {campos.map((campo) => (
              <div className="form-group" key={campo.name}>
                <label>{campo.label}</label>
                <div className="input-edit-wrapper">
                  <input
                    type={"text"}
                    value={
                      mostrarCampo[campo.name] && camposReais[campo.name]
                        ? camposReais[campo.name]
                        : form[campo.name]
                    }
                    disabled={!editando[campo.name]}
                    onChange={(e) =>
                      setForm({ ...form, [campo.name]: e.target.value })
                    }
                  />
                  {campo.name !== "name" && (
                    <button
                      type="button"
                      className="btn-edit"
                      onClick={() => toggleMostrarCampo(campo.name)}
                    >
                      {mostrarCampo[campo.name] ? "Ocultar" : "Mostrar"}
                    </button>
                  )}
                  {campo.name !== "email" && (
                    <button
                      type="button"
                      className="btn-edit"
                      onClick={() => toggleEdit(campo.name)}
                    >
                      {editando[campo.name] ? "Cancelar" : "Editar"}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Perfil */}
            <div className="form-group">
              <label>Perfil</label>
              <input type="text" value={user?.role || ""} readOnly />
            </div>

            {/* Senha */}
            <div className="form-group">
              <label>Senha</label>
              <div className="input-edit-wrapper">
                <input
                  type={mostrarSenha ? "text" : "password"}
                  value={newPassword}
                  disabled={!editando.password}
                  placeholder={
                    editando.password ? "Digite uma nova senha" : "********"
                  }
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <div className="btn-wrapper">
                  {editando.password && (
                    <>
                      <button
                        type="button"
                        className="btn-edit"
                        onClick={toggleMostrarSenha}
                      >
                        {mostrarSenha ? "Ocultar" : "Mostrar"}
                      </button>
                      <button
                        type="button"
                        className="btn-edit"
                        onClick={() => toggleEdit("password")}
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        className="btn-save"
                        onClick={handleSaveSenha}
                      >
                        Salvar
                      </button>
                    </>
                  )}
                  {!editando.password && (
                    <button
                      type="button"
                      className="btn-edit"
                      onClick={() => toggleEdit("password")}
                    >
                      Editar
                    </button>
                  )}
                </div>
              </div>
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
