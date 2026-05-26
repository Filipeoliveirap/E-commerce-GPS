import { useState, useMemo } from "react";
import Header from "../../components/molecules/Header";
import { useCartStore } from "../../store/cartStore";
import { useCheckout } from "../../hook/useCheckout";
import theme from "../../styles/theme";

export default function CheckoutPage() {
  const { items } = useCartStore();
  const { handleCheckout, loading } = useCheckout();

  const [paymentMethod, setPaymentMethod] = useState("PIX");
  const [pixKey, setPixKey] = useState(null);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  const discount = paymentMethod === "PIX" ? subtotal * 0.05 : 0;
  const total = subtotal - discount;

  function format(value) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  async function finishCheckout() {
    const response = await handleCheckout(paymentMethod);

    if (response?.pixKey) {
      setPixKey(response.pixKey);
    }
  }
  function copyPix() {
    navigator.clipboard.writeText(pixKey);
  }

  // ================= UI =================
  return (
    <div
      className={`min-h-screen font-body bg-[${theme.colors.background.light}] text-[${theme.colors.navy[900]}]`}
    >
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Title */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold font-display mb-2">
            Finalizar Compra
          </h1>
          <p className={`text-[${theme.colors.navy[500]}]`}>
            Escolha sua forma de pagamento e revise seu pedido.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* PAYMENT */}
            <section
              className={`bg-white rounded-[${theme.radius.md}] p-6 border border-[${theme.colors.navy[200]}] shadow-md`}
            >
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                <span
                  className={`material-symbols-outlined text-[${theme.colors.primary}]`}
                >
                  payments
                </span>
                Forma de Pagamento
              </h2>

              <div className="space-y-4">
                {/* PIX */}
                <label
                  className={`flex cursor-pointer gap-4 p-5 rounded-[${theme.radius.md}] border-2 ${
                    paymentMethod === "PIX"
                      ? `border-[${theme.colors.primary}] bg-[${theme.colors.primary}]/10`
                      : `border-[${theme.colors.navy[200]}]`
                  }`}
                >
                  <input
                    type="radio"
                    checked={paymentMethod === "PIX"}
                    onChange={() => setPaymentMethod("PIX")}
                  />

                  <div className="flex flex-col">
                    <div className="flex gap-2 items-center">
                      <span className="font-bold">PIX</span>
                      <span
                        className={`text-xs px-2 py-1 rounded bg-[${theme.colors.success.light}] text-[${theme.colors.success.dark}]`}
                      >
                        -5%
                      </span>
                    </div>
                    <p className={`text-sm text-[${theme.colors.navy[500]}]`}>
                      Aprovação imediata.
                    </p>
                  </div>

                  <span className="ml-auto material-symbols-outlined">
                    qr_code_2
                  </span>
                </label>

                {/* BOLETO */}
                <label
                  className={`flex cursor-pointer gap-4 p-5 rounded-[${theme.radius.md}] border ${
                    paymentMethod === "BOLETO"
                      ? `border-[${theme.colors.primary}]`
                      : `border-[${theme.colors.navy[200]}]`
                  }`}
                >
                  <input
                    type="radio"
                    checked={paymentMethod === "BOLETO"}
                    onChange={() => setPaymentMethod("BOLETO")}
                  />

                  <div>
                    <span className="font-bold">Boleto</span>
                    <p className={`text-sm text-[${theme.colors.navy[500]}]`}>
                      Confirmação em até 48h.
                    </p>
                  </div>
                </label>
              </div>
            </section>

            {/* ADDRESS (placeholder) */}
            <section
              className={`bg-white rounded-[${theme.radius.md}] p-6 border border-[${theme.colors.navy[200]}] shadow-md`}
            >
              <h2 className="text-xl font-bold flex gap-2 mb-6">
                <span
                  className={`material-symbols-outlined text-[${theme.colors.primary}]`}
                >
                  location_on
                </span>
                Endereço de Entrega
              </h2>

              <div
                className={`flex gap-4 items-center p-4 rounded-[${theme.radius.sm}] bg-[${theme.colors.navy[50]}]`}
              >
                <span className="material-symbols-outlined text-3xl">
                  location_on
                </span>

                <div className="flex-1">
                  <p className="font-bold">Endereço cadastrado</p>
                  <p className="text-sm text-gray-500">
                    Usando endereço padrão
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT */}
          <aside className="space-y-6">
            <div
              className={`bg-white rounded-[${theme.radius.md}] p-6 border border-[${theme.colors.navy[200]}] shadow-md sticky top-6`}
            >
              <h2 className="text-xl font-bold mb-6">Resumo do Pedido</h2>

              {/* ITEMS */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x {format(item.price)}
                      </p>
                    </div>
                    <p className="font-bold">
                      {format(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div className="mt-6 border-t pt-4 space-y-3">
                <Row label="Subtotal" value={format(subtotal)} />
                <Row label="Frete" value="Grátis" />

                {paymentMethod === "PIX" && (
                  <Row label="Desconto PIX" value={`- ${format(discount)}`} />
                )}

                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>{format(total)}</span>
                </div>
              </div>

              {/* CTA */}
              <button
                disabled={loading}
                onClick={finishCheckout}
                className={`w-full mt-8 bg-[${theme.colors.primary}] text-[${theme.colors.navy[900]}] font-bold py-4 rounded-[${theme.radius.md}] shadow-md`}
              >
                {loading ? "Processando..." : "Finalizar Pagamento"}
              </button>
            </div>
          </aside>
        </div>
        {pixKey && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl w-full max-w-md text-center shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Pagamento via PIX</h2>

              <p className="text-gray-600 mb-6">
                Copie a chave abaixo e finalize o pagamento no seu app bancário.
              </p>

              <div className="bg-gray-100 p-4 rounded-lg font-mono break-all mb-6">
                {pixKey}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={copyPix}
                  className="flex-1 bg-green-500 text-white py-3 rounded-lg font-bold"
                >
                  Copiar chave
                </button>

                <button
                  onClick={() => setPixKey(null)}
                  className="flex-1 bg-gray-200 py-3 rounded-lg font-bold"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
