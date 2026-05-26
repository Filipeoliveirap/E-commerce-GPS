import Header from "../../components/molecules/Header";
import Footer from "../../components/organisms/Footer";
import Text from "../../components/atoms/Text";
import { useCartStore } from "../../store/cartStore";
import { Link } from "react-router-dom";
import { useCartCheckoutRedirect } from "../../hook/useCartCheckoutRedirect";

function toCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value ?? 0));
}

export default function Carrinho() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const deleteItem = useCartStore((state) => state.deleteItem);
  const addItem = useCartStore((state) => state.addItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const { handleFinalizePurchase } = useCartCheckoutRedirect();

  const totalItems = items.reduce((total, item) => total + Number(item.quantity ?? 0), 0);
  const totalValue = items.reduce(
    (total, item) => total + Number(item.price ?? 0) * Number(item.quantity ?? 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-900 flex flex-col">
      <Header hideOnScroll={true} />

      <main className="max-w-7xl w-full mx-auto px-4 md:px-8 py-10 flex-1">
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link className="hover:text-navy-900 dark:hover:text-white transition-colors" to="/">
            Home
          </Link>
          <span className="material-symbols-outlined text-base">chevron_right</span>
          <span className="text-navy-900 dark:text-white font-medium">Carrinho de Compras</span>
        </nav>

        <Text variant="h2" className="mb-8 flex items-center gap-3">
          Meu Carrinho
          <span className="text-base font-normal text-gray-400">({totalItems} itens)</span>
        </Text>

        {items.length === 0 ? (
          <div className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-xl p-10 text-center">
            <span className="material-symbols-outlined text-6xl text-gray-400 block mb-4">
              shopping_cart
            </span>
            <Text variant="h5" className="mb-2">Seu carrinho está vazio</Text>
            <Text variant="caption" color="text-gray-600 dark:text-gray-400">
              Adicione produtos para continuar.
            </Text>
            <Link
              to="/produtos"
              className="inline-flex items-center gap-2 mt-6 text-navy-900 dark:text-white font-bold hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Continuar Comprando
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const itemTotal = Number(item.price ?? 0) * Number(item.quantity ?? 0);
                return (
                  <article
                    key={item.id}
                    className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-xl p-5 flex flex-col md:flex-row gap-5"
                  >
                    <div className="w-full md:w-32 h-32 bg-gray-100 dark:bg-navy-700 rounded-lg overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <span className="material-symbols-outlined text-4xl">image</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          {item.category ?? "Produto"}
                        </span>
                        <h3 className="text-lg font-bold text-navy-900 dark:text-white">{item.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {toCurrency(item.price)} cada
                        </p>
                      </div>

                      <div className="flex flex-col md:items-end gap-3">
                        <div className="text-lg font-bold text-navy-900 dark:text-white">
                          {toCurrency(itemTotal)}
                        </div>

                        <div className="flex items-center border border-gray-200 dark:border-navy-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-navy-700">
                          <button
                            type="button"
                            className="p-2 hover:bg-gray-200 dark:hover:bg-navy-600 transition-colors"
                            onClick={() => removeItem(item.id)}
                            aria-label={`Diminuir quantidade de ${item.name}`}
                          >
                            <span className="material-symbols-outlined text-base">remove</span>
                          </button>
                          <span className="w-10 text-center font-bold text-navy-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="p-2 hover:bg-gray-200 dark:hover:bg-navy-600 transition-colors"
                            onClick={() => addItem(item)}
                            aria-label={`Aumentar quantidade de ${item.name}`}
                          >
                            <span className="material-symbols-outlined text-base">add</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="self-start md:self-center p-2 text-gray-400 hover:text-red-500 transition-colors"
                      onClick={() => deleteItem(item.id)}
                      aria-label={`Remover ${item.name} do carrinho`}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </article>
                );
              })}

              <div className="flex items-center justify-between pt-2">
                <Link
                  to="/produtos"
                  className="inline-flex items-center gap-2 text-navy-900 dark:text-white font-bold hover:text-primary transition-colors group"
                >
                  <span className="material-symbols-outlined text-base transition-transform group-hover:-translate-x-1">
                    arrow_back
                  </span>
                  Continuar Comprando
                </Link>

                <button
                  type="button"
                  onClick={clearCart}
                  className="inline-flex items-center gap-2 border border-red-200 text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">delete_sweep</span>
                  Limpar carrinho
                </button>
              </div>
            </div>

            <aside className="space-y-4">
              <section className="bg-navy-900 text-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-5 pb-4 border-b border-white/10">Resumo do Pedido</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Subtotal ({totalItems} itens)</span>
                    <span>{toCurrency(totalValue)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Frete</span>
                    <span className="text-green-400 font-semibold uppercase text-xs">Grátis</span>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex items-end justify-between">
                    <span className="font-medium">Total</span>
                    <span className="text-2xl font-bold text-primary">{toCurrency(totalValue)}</span>
                  </div>
                </div>

                <button
                  onClick={handleFinalizePurchase}
                  type="button"
                  className="w-full bg-primary text-navy-900 font-black py-3 rounded-xl hover:brightness-95 transition-all uppercase tracking-wider"
                >
                  Finalizar Compra
                </button>

                <div className="mt-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="material-symbols-outlined text-primary text-base">verified_user</span>
                    Compra 100% segura
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="material-symbols-outlined text-primary text-base">local_shipping</span>
                    Entrega para todo o Brasil
                  </div>
                </div>
              </section>

              <section className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-xl p-5 text-center">
                <p className="text-sm font-medium text-navy-900 dark:text-white mb-3">Dúvidas com seu pedido?</p>
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 border border-gray-300 dark:border-navy-700 py-2 rounded-lg font-semibold text-navy-900 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-700 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">support_agent</span>
                  Falar com Atendimento
                </button>
              </section>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
