import React, { useEffect, useState } from "react";
import "../Perfil/Perfil.css";
import { useProfile } from "../../hook/useProfile";
import { MaskUtils } from "../../utils/maskUtils";
import { validators } from "../../utils/validators";
import DeleteAccountModal from "../../components/molecules/DeleteAccountModal/DeleteAccountModal";

export default function PerfilUsuario() {
  const {
    user,
    loading,
    handleUpdateProfile,
    handleUpdatePassword,
    fetchCamposReais,
    camposReais,
    handleDeleteAccount,
    handleLogout,
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


  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Sincroniza o form quando o user é carregado
  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      // Carrega os campos reais (sem máscara) do backend
      await fetchCamposReais();

      console.log("User data carregado:", user);
      
      setForm({
        name: user.name || "",
        email: user.email || "",
        cpf: user.cpf || "", // Vai ser preenchido com camposReais no próximo useEffect
        telephone: user.telephone || "", // Vai ser preenchido com camposReais no próximo useEffect
      });
    };

    loadData();
  }, [user, fetchCamposReais]);

  // Sincroniza o form quando camposReais mudar
  useEffect(() => {
    console.log("camposReais atualizados:", camposReais);
    if (camposReais.cpf || camposReais.telephone || camposReais.email) {
      console.log("Sincronizando form com camposReais");
      setForm((prev) => ({
        ...prev,
        cpf: camposReais.cpf || prev.cpf,
        telephone: camposReais.telephone || prev.telephone,
        email: camposReais.email || prev.email,
      }));
    }
  }, [camposReais]);

  // Alterna edição
  const toggleEdit = async (campo) => {
    // Se estamos habilitando edição (mudando para true) e é um campo mascarado
    if (!editando[campo] && ["email", "cpf", "telephone"].includes(campo)) {
      // Garante que temos os valores reais carregados
      if (!camposReais[campo]) {
        await fetchCamposReais();
      }
    }

    setEditando((prev) => ({ ...prev, [campo]: !prev[campo] }));

    // Atualiza o form com o valor real se há
    if (!editando[campo] && camposReais[campo]) {
      setForm((prev) => ({
        ...prev,
        [campo]: camposReais[campo],
      }));
    }
  };

  // Função para aplicar máscara enquanto digita
  const handleMaskInput = (campo, value) => {
    let maskedValue = value.replace(/\D/g, ""); // Remove tudo que não é dígito

    if (campo === "cpf") {
      if (maskedValue.length > 11) maskedValue = maskedValue.slice(0, 11);
    } else if (campo === "telephone") {
      if (maskedValue.length > 11) maskedValue = maskedValue.slice(0, 11);
    }

    setForm({ ...form, [campo]: maskedValue });
  };
  // Alterna visibilidade da senha
  const toggleMostrarSenha = () => setMostrarSenha((prev) => !prev);

  // Salva perfil
  const handleSave = async () => {
    if (!user) return;

    // Verifica se algum campo foi editado
    const algumCampoEditado = Object.values(editando).some(val => val === true);
    if (!algumCampoEditado) {
      alert("Nenhum campo foi editado");
      return;
    }

    // 🔴 Validações (apenas dos campos que foram editados)
    
    if (editando.name && form.name.trim()) {
      if (!validators.name(form.name)) {
        alert("Nome inválido - use apenas letras e espaços");
        return;
      }
    }

    if (editando.email && form.email.trim()) {
      if (!validators.email(form.email)) {
        alert("E-mail inválido - use um domínio válido (gmail, hotmail, yahoo, outlook)");
        return;
      }
    }

    if (editando.cpf && form.cpf.trim()) {
      const cpfLimpo = form.cpf.replace(/\D/g, "");
      if (!validators.cpf(cpfLimpo)) {
        alert("CPF inválido - deve ter 11 dígitos");
        return;
      }
    }

    if (editando.telephone && form.telephone.trim()) {
      const telefoneLimpo = form.telephone.replace(/\D/g, "");
      if (!validators.phone(telefoneLimpo)) {
        alert("Telefone inválido - deve ter 11 dígitos (DDD + número)");
        return;
      }
    }

    // Monta o objeto com apenas os campos que foram editados
    const formParaEnvio = {};

    if (editando.name) {
      formParaEnvio.name = form.name.trim();
    } else {
      formParaEnvio.name = user.name;
    }

    if (editando.email) {
      formParaEnvio.email = form.email.trim();
    } else {
      formParaEnvio.email = user.email;
    }

    if (editando.cpf) {
      // Remove apenas dígitos não-numéricos
      const cpfLimpo = String(form.cpf || "").replace(/[^\d]/g, "");
      formParaEnvio.cpf = cpfLimpo;
      console.log("CPF enviado:", formParaEnvio.cpf, "length:", formParaEnvio.cpf.length);
    } else {
      const cpfLimpo = String(user.cpf || "").replace(/[^\d]/g, "");
      formParaEnvio.cpf = cpfLimpo;
    }

    if (editando.telephone) {
      // Remove apenas dígitos não-numéricos
      const telLimpo = String(form.telephone || "").replace(/[^\d]/g, "");
      formParaEnvio.telephone = telLimpo;
      console.log("Telephone enviado:", formParaEnvio.telephone, "length:", formParaEnvio.telephone.length);
    } else {
      const telLimpo = String(user.telephone || "").replace(/[^\d]/g, "");
      formParaEnvio.telephone = telLimpo;
    }
    
    console.log("=== DADOS FINAIS ENVIADOS ===");
    console.log("Form atual:", form);
    console.log("name:", formParaEnvio.name);
    console.log("email:", formParaEnvio.email);
    console.log("cpf:", formParaEnvio.cpf, "(esperado: 11 dígitos)");
    console.log("telephone:", formParaEnvio.telephone, "(esperado: 11 dígitos)");
    console.log("Object completo:", formParaEnvio);

    const sucesso = await handleUpdateProfile(formParaEnvio);

    if (sucesso) {
      setEditando({
        name: false,
        email: false,
        cpf: false,
        telephone: false,
        password: false,
      });
      // Recarrega o form com os novos valores
      setForm({
        name: formParaEnvio.name || "",
        email: formParaEnvio.email || "",
        cpf: formParaEnvio.cpf || "",
        telephone: formParaEnvio.telephone || "",
      });
    }
  };

  // Salva nova senha
  const handleSaveSenha = async () => {
    if (!validators.password(newPassword)) {
      alert("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    const sucesso = await handleUpdatePassword(newPassword);

    if (sucesso) {
      setNewPassword("");
      setEditando((prev) => ({ ...prev, password: false }));
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
              <p className="user-name">{user?.name || "Usuário"}</p>
              <span>Minha Conta</span>
            </div>
          </div>
        </div>
      </header>

      {/* LOADING STATE */}
      {loading && !user ? (
        <main className="main">
          <div style={{ padding: "40px", textAlign: "center", width: "100%" }}>
            <p style={{ fontSize: "1.2rem", color: "#666" }}>Carregando dados...</p>
          </div>
        </main>
      ) : !user ? (
        <main className="main">
          <div style={{ padding: "40px", textAlign: "center", width: "100%" }}>
            <p style={{ fontSize: "1.2rem", color: "#666" }}>Você precisa estar logado para acessar essa página</p>
          </div>
        </main>
      ) : (
        <main className="main">
          <aside className="sidebar">
            <h3>Painel</h3>
            <p>Configurações da conta</p>
            <ul>
              <li className="active">Dados Pessoais</li>
              <li className="logout" onClick={handleLogout}>Sair da Conta</li>
            </ul>
            <div style={{ marginTop: "20px" }}>
              <p style={{ fontSize: "0.85rem", color: "#999", marginBottom: "8px" }}>Zona de Perigo</p>
              <div 
                className="delete-account" 
                onClick={() => setShowDeleteModal(true)}
                style={{ padding: "12px", cursor: "pointer", borderRadius: "6px", transition: "all 0.2s ease" }}
              >
                Deletar Minha Conta
              </div>
            </div>
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
                      editando[campo.name]
                        ? form[campo.name] // Em edição: valor real
                        : mostrarCampo[campo.name]
                        ? form[campo.name] // Mostrando: valor real
                        : campo.name === "cpf"
                        ? MaskUtils.maskCpf(form[campo.name]) // Ocultado: máscara
                        : campo.name === "telephone"
                        ? MaskUtils.maskTelephone(form[campo.name]) // Ocultado: máscara
                        : campo.name === "email"
                        ? MaskUtils.maskEmail(form[campo.name]) // Ocultado: máscara
                        : form[campo.name] // Nome não tem máscara
                    }
                    disabled={!editando[campo.name]}
                    onChange={(e) => {
                      if (campo.name === "cpf" || campo.name === "telephone") {
                        handleMaskInput(campo.name, e.target.value);
                      } else {
                        setForm({ ...form, [campo.name]: e.target.value });
                      }
                    }}
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
      )}

      <footer className="footer">
        <p>© 2024 A.J.F. Eletrônicos</p>
      </footer>

      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
        loading={loading}
      />
    </div>
  );
}
