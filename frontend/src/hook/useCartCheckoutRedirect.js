import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { userHasAddress } from "../service/addressService";

export function useCartCheckoutRedirect() {
  const { token } = useAuthStore();
  const navigate = useNavigate();

  async function handleFinalizePurchase() {
    if (!token) {
      navigate("/login");
      return;
    }

    const hasAddress = await userHasAddress(token);

    if (hasAddress) {
      navigate("/checkout"); 
    } else {
      navigate("/endereco/cadastrar"); 
    }
  }

  return { handleFinalizePurchase };
}