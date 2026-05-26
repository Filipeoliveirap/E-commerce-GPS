import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddress } from "../../hook/useAddress";
import Header from "../../components/molecules/Header";
import theme from "../../styles/theme";

export default function AddressPage() {
  const navigate = useNavigate();
  const { handleCreateAddress, loading } = useAddress();

  const [formData, setFormData] = useState({
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await handleCreateAddress(formData);
  }

  return (
    <div
      className={`bg-[${theme.colors.background.light}] text-[${theme.colors.navy[900]}] font-body min-h-screen`}
    >
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-3 text-sm font-medium mb-10">
          <div
            className={`flex items-center gap-2 text-[${theme.colors.navy[500]}]`}
          >
            <span className="material-symbols-outlined text-sm">
              shopping_basket
            </span>
            <span>Carrinho</span>
          </div>
          <span
            className={`material-symbols-outlined text-[${theme.colors.navy[300]}] text-xs`}
          >
            chevron_right
          </span>
          <div
            className={`flex items-center gap-2 text-[${theme.colors.primary}] bg-[${theme.colors.secondary}] px-3 py-1 rounded-md`}
          >
            <span className="material-symbols-outlined text-sm">
              location_on
            </span>
            <span>Endereço</span>
          </div>
          <span
            className={`material-symbols-outlined text-[${theme.colors.navy[300]}] text-xs`}
          >
            chevron_right
          </span>
          <div
            className={`flex items-center gap-2 text-[${theme.colors.navy[400]}]`}
          >
            <span className="material-symbols-outlined text-sm">payments</span>
            <span>Pagamento</span>
          </div>
        </nav>

        {/* Form Card */}
        <div
          className={`bg-[${theme.colors.background.light}] rounded-[${theme.radius.md}] p-8 shadow-md border border-[${theme.colors.navy[200]}]`}
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2 font-display">
              Cadastrar Endereço de Entrega
            </h2>
            <p className={`text-[${theme.colors.navy[500]}]`}>
              Informe os dados detalhados para garantir uma entrega rápida e
              segura.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* CEP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="cep"
                  className={`text-sm font-semibold uppercase tracking-wider text-[${theme.colors.navy[400]}]`}
                >
                  CEP
                </label>
                <input
                  id="cep"
                  type="text"
                  placeholder="00000-000"
                  value={formData.cep}
                  onChange={handleChange}
                  className={`w-full h-12 px-4 rounded-[${theme.radius.sm}] border border-[${theme.colors.navy[200]}] focus:border-[${theme.colors.primary}] focus:ring-1 focus:ring-[${theme.colors.primary}] outline-none transition-all bg-[${theme.colors.background.light}]`}
                />
              </div>
            </div>

            {/* Rua e Número */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 flex flex-col gap-2">
                <label
                  htmlFor="rua"
                  className={`text-sm font-semibold uppercase tracking-wider text-[${theme.colors.navy[400]}]`}
                >
                  Rua / Avenida
                </label>
                <input
                  id="rua"
                  type="text"
                  placeholder="Ex: Av. Brigadeiro Faria Lima"
                  value={formData.rua}
                  onChange={handleChange}
                  className={`w-full h-12 px-4 rounded-[${theme.radius.sm}] border border-[${theme.colors.navy[200]}] focus:border-[${theme.colors.primary}] focus:ring-1 focus:ring-[${theme.colors.primary}] outline-none transition-all bg-[${theme.colors.background.light}]`}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="numero"
                  className={`text-sm font-semibold uppercase tracking-wider text-[${theme.colors.navy[400]}]`}
                >
                  Número
                </label>
                <input
                  id="numero"
                  type="text"
                  placeholder="123"
                  value={formData.numero}
                  onChange={handleChange}
                  className={`w-full h-12 px-4 rounded-[${theme.radius.sm}] border border-[${theme.colors.navy[200]}] focus:border-[${theme.colors.primary}] focus:ring-1 focus:ring-[${theme.colors.primary}] outline-none transition-all bg-[${theme.colors.background.light}]`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="bairro"
                className={`text-sm font-semibold uppercase tracking-wider text-[${theme.colors.navy[400]}]`}
              >
                Bairro
              </label>
              <input
                id="bairro"
                type="text"
                placeholder="Ex: Jardim Paulista"
                value={formData.bairro}
                onChange={handleChange}
                className={`w-full h-12 px-4 rounded-[${theme.radius.sm}] border border-[${theme.colors.navy[200]}] focus:border-[${theme.colors.primary}] focus:ring-1 focus:ring-[${theme.colors.primary}] outline-none transition-all bg-[${theme.colors.background.light}]`}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="complemento"
                className={`text-sm font-semibold uppercase tracking-wider text-[${theme.colors.navy[400]}]`}
              >
                Complemento
              </label>
              <input
                id="complemento"
                type="text"
                placeholder="Ex: Apto 101"
                value={formData.complemento}
                onChange={handleChange}
                className={`w-full h-12 px-4 rounded-[${theme.radius.sm}] border border-[${theme.colors.navy[200]}] focus:border-[${theme.colors.primary}] focus:ring-1 focus:ring-[${theme.colors.primary}] outline-none transition-all bg-[${theme.colors.background.light}]`}
              />
            </div>

            {/* Cidade e Estado */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 flex flex-col gap-2">
                <label
                  htmlFor="cidade"
                  className={`text-sm font-semibold uppercase tracking-wider text-[${theme.colors.navy[400]}]`}
                >
                  Cidade
                </label>
                <input
                  id="cidade"
                  type="text"
                  placeholder="São Paulo"
                  value={formData.cidade}
                  onChange={handleChange}
                  className={`w-full h-12 px-4 rounded-[${theme.radius.sm}] border border-[${theme.colors.navy[200]}] focus:border-[${theme.colors.primary}] focus:ring-1 focus:ring-[${theme.colors.primary}] outline-none transition-all bg-[${theme.colors.background.light}]`}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="estado"
                  className={`text-sm font-semibold uppercase tracking-wider text-[${theme.colors.navy[400]}]`}
                >
                  Estado
                </label>
                <select
                  id="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className={`w-full h-12 px-4 rounded-[${theme.radius.sm}] border border-[${theme.colors.navy[200]}] focus:border-[${theme.colors.primary}] focus:ring-1 focus:ring-[${theme.colors.primary}] outline-none transition-all bg-[${theme.colors.background.light}] appearance-none`}
                >
                  <option value="">Selecione</option>
                  <option value="SP">São Paulo (SP)</option>
                  <option value="RJ">Rio de Janeiro (RJ)</option>
                  <option value="MG">Minas Gerais (MG)</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-8 mt-4 border-t border-[${theme.colors.navy[200]}] flex flex-col md:flex-row justify-between items-center gap-4">
              <button
                type="button"
                className={`text-[${theme.colors.navy[900]}] font-bold hover:underline order-2 md:order-1`}
                onClick={() => navigate("/carrinho")}
              >
                Voltar para o carrinho
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`w-full md:w-auto bg-[${theme.colors.primary}] hover:bg-[${theme.colors.primary}] text-[${theme.colors.navy[900]}] font-extrabold text-lg px-10 py-4 rounded-[${theme.radius.md}] shadow-md transition-all flex items-center justify-center gap-3 order-1 md:order-2`}
              >
                Salvar Endereço e Continuar
                <span className="material-symbols-outlined font-bold">
                  arrow_forward
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Secondary Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className={`flex items-start gap-4 p-4 rounded-[${theme.radius.md}] bg-[${theme.colors.background.light}] border border-[${theme.colors.navy[200]}] shadow-md`}
          >
            <span
              className={`material-symbols-outlined text-[${theme.colors.primary}] text-3xl`}
            >
              verified_user
            </span>
            <div>
              <h4
                className={`font-bold text-sm text-[${theme.colors.navy[900]}]`}
              >
                Ambiente Seguro
              </h4>
              <p className={`text-xs text-[${theme.colors.navy[500]}]`}>
                Seus dados estão protegidos por criptografia de ponta.
              </p>
            </div>
          </div>

          <div
            className={`flex items-start gap-4 p-4 rounded-[${theme.radius.md}] bg-[${theme.colors.background.light}] border border-[${theme.colors.navy[200]}] shadow-md`}
          >
            <span
              className={`material-symbols-outlined text-[${theme.colors.primary}] text-3xl`}
            >
              local_shipping
            </span>
            <div>
              <h4
                className={`font-bold text-sm text-[${theme.colors.navy[900]}]`}
              >
                Entrega Expressa
              </h4>
              <p className={`text-xs text-[${theme.colors.navy[500]}]`}>
                Opções de entrega para o mesmo dia em capitais.
              </p>
            </div>
          </div>

          <div
            className={`flex items-start gap-4 p-4 rounded-[${theme.radius.md}] bg-[${theme.colors.background.light}] border border-[${theme.colors.navy[200]}] shadow-md`}
          >
            <span
              className={`material-symbols-outlined text-[${theme.colors.primary}] text-3xl`}
            >
              headset_mic
            </span>
            <div>
              <h4
                className={`font-bold text-sm text-[${theme.colors.navy[900]}]`}
              >
                Suporte 24/7
              </h4>
              <p className={`text-xs text-[${theme.colors.navy[500]}]`}>
                Dúvidas com seu endereço? Fale conosco agora.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer
        className={`mt-20 py-10 border-t border-[${theme.colors.navy[200]}] text-center`}
      >
        <p className={`text-[${theme.colors.navy[400]}] text-sm`}>
          © 2024 TechWave Eletrônicos Ltda. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
