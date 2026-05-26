import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAddress } from "../service/addressService";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";

export function useAddress() {
  const { token } = useAuthStore();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function handleCreateAddress(formData) {
    setLoading(true);

    const payload = {
      zipCode: formData.cep,
      street: formData.rua,
      number: formData.numero,
      complement: formData.complemento,
      neighborhood: formData.bairro,
      city: formData.cidade,
      state: formData.estado,
    };
    try {
      await createAddress(payload, token);

      toast.success("Endereço cadastrado com sucesso!");

      navigate("/checkout");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    handleCreateAddress,
    loading,
  };
}
