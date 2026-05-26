import { useState } from "react";
import { toast } from "react-toastify";
import { checkout } from "../service/checkoutService";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";
import { useNavigate } from "react-router-dom";

export function useCheckout() {
  const { token } = useAuthStore();
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleCheckout(paymentMethod) {
    try {
      setLoading(true);

      const payload = {
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        paymentMethod,
      };

      const response = await checkout(payload, token);

      if (response.boletoPdfBase64) openBoleto(response.boletoPdfBase64);
      if (response.pixKey) toast.success("Chave PIX gerada!");

      clearCart();
      return response;
    } catch (err) {
      if (err.message === "USER_WITHOUT_ADDRESS") {
        toast.info("Cadastre um endereço para continuar");
        navigate("/enderecos/cadastrar");
        return;
      }

      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }
  

  return { handleCheckout, loading };
}

function openBoleto(base64) {
  const pdfBlob = new Blob(
    [Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))],
    { type: "application/pdf" },
  );

  const url = URL.createObjectURL(pdfBlob);
  window.open(url);
}
