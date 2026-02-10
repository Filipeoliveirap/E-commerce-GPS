import { useState } from "react";
import { cpf } from "cpf-cnpj-validator";
import { formatCPF, formatPhone } from "../../../utils/formatters";
import {
  validateEmail,
  validateCPF,
  validatePhone as validatePhoneUtil,
  validatePassword,
  validateName,
} from "../../../utils/validators";

import { Link } from "react-router-dom";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import Checkbox from "../../atoms/Checkbox";
import { useAuth } from "../../../hook/useAuth";
import { useNavigate } from "react-router-dom";

export default function CadastroForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    password: "",
    telefone: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    let { name, value, type, checked } = e.target;

    // Remove espaço no início automaticamente
    if (type === "text" || type === "email" || type === "password") {
      value = value.trimStart();
    }

    // Formata CPF e telefone
    if (name === "cpf") {
      value = formatCPF(value);
    } else if (name === "telefone") {
      value = formatPhone(value);
    }

    // Atualiza formData
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Validação em tempo real
    let erro = "";
    switch (name) {
      case "name":
        if (!validateName(value)) erro = "Nome inválido";
        break;
      case "email":
        if (!value) erro = "E-mail obrigatório";
        else if (!validateEmail(value)) erro = "E-mail inválido";
        break;
      case "cpf":
        if (!validateCPF(value)) erro = "CPF inválido";
        break;
      case "telefone":
        if (!validatePhoneUtil(value)) erro = "Telefone inválido";
        break;
      case "password":
        if (!validatePassword(value))
          erro = "Senha deve ter no mínimo 6 caracteres";
        break;
      case "terms":
        if (!checked) erro = "Aceite os termos";
        break;
      default:
        break;
    }

    // Atualiza o estado de erros
    setErrors((prev) => ({ ...prev, [name]: erro }));

    // Limpa mensagens de sucesso
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const cleanData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      cpf: formData.cpf,
      password: formData.password,
      telefone: formData.telefone,
      terms: formData.terms,
    };

    const newErrors = {};

    if (!validateName(formData.name)) {
      newErrors.name = "Nome inválido";
    }

    if (!cleanData.email) newErrors.email = "E-mail obrigatório";
    else if (!validateEmail(cleanData.email))
      newErrors.email = "E-mail inválido";

    if (!validateCPF(cleanData.cpf)) newErrors.cpf = "CPF inválido";

    if (!validatePassword(cleanData.password))
      newErrors.password = "A senha deve ter no mínimo 6 caracteres";

    if (!validatePhoneUtil(cleanData.telefone))
      newErrors.telefone = "Telefone inválido";

    if (!cleanData.terms) newErrors.terms = "Aceite os termos";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return;
    }

    const result = await handleRegister(cleanData);

    if (result.success) {
      setSuccessMessage("Cadastro realizado com sucesso!");
      setFormData({
        name: "",
        email: "",
        password: "",
        cpf: "",
        telefone: "",
        terms: false,
      });
      setErrors({});
      navigate("/login");
    } else {
      setErrors({ submit: result.message || "Erro ao cadastrar" });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-2">
          Criar conta A.J.F.
        </h3>
        <p className="text-navy-700 dark:text-gray-400 text-sm">
          Preencha seus dados para acessar nossa loja de eletrônicos.
        </p>
      </div>

      {/* Nome */}
      <Input
        label="Nome Completo"
        icon="person"
        name="name"
        type="text"
        placeholder="Digite seu nome completo"
        value={formData.name}
        onChange={handleInputChange}
        error={errors.name}
        required
      />

      {/* Email e CPF */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Input
            label="E-mail"
            icon="alternate_email"
            name="email"
            type="text"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
          />
        </div>

        <div>
          <Input
            label="CPF"
            icon="credit_card"
            name="cpf"
            type="text"
            placeholder="000.000.000-00"
            value={formData.cpf}
            onChange={handleInputChange}
            error={errors.cpf}
            maxLength={14}
            required
          />
        </div>
      </div>

      {/* Telefone */}
      <Input
        label="Telefone"
        icon="call"
        name="telefone"
        type="tel"
        placeholder="(00) 90000-0000"
        value={formData.telefone}
        onChange={handleInputChange}
        error={errors.telefone}
        maxLength={15}
        required
      />

      {/* Senha */}
      <Input
        label="Senha"
        icon="lock_open"
        name="password"
        placeholder="Crie uma senha segura"
        type={showPassword ? "text" : "password"}
        value={formData.password}
        onChange={handleInputChange}
        error={errors.password}
        trailing={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="flex items-center cursor-pointer"
            aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
          >
            <span className="material-symbols-outlined text-gray-400 hover:text-navy-700 dark:hover:text-gray-200 text-[20px]">
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        }
      />

      {/* Terms */}
      <div className="flex items-center pt-2">
        <Checkbox
          id="terms"
          name="terms"
          checked={formData.terms}
          onChange={handleInputChange}
        />
        <label className="ml-2 block text-xs text-navy-700 dark:text-gray-400">
          Concordo com os{" "}
          <a
            href="#"
            className="font-medium text-navy-900 dark:text-primary hover:underline"
          >
            Termos da A.J.F.
          </a>{" "}
          e{" "}
          <a
            href="#"
            className="font-medium text-navy-900 dark:text-primary hover:underline"
          >
            Política de Privacidade
          </a>
          .
        </label>
      </div>
      {errors.terms && <p className="text-red-500 text-xs">{errors.terms}</p>}

      {/* Submit Button */}
      <div className="mt-6">
        <Button
          type="submit"
          disabled={
            loading ||
            Object.values(errors).some((e) => e !== "") ||
            !formData.terms
          }
          variant="primary"
          size="md"
          className="group relative flex w-full justify-center"
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="material-symbols-outlined h-5 w-5 text-navy-900/60 group-hover:text-navy-900 transition-colors">
              shopping_cart_checkout
            </span>
          </span>
          {loading ? "Cadastrando..." : "Finalizar Cadastro"}
        </Button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-full text-green-700 dark:text-green-400 text-sm text-center">
          ✓ {successMessage}
        </div>
      )}

      {/* Error Message */}
      {errors.submit && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-full text-red-700 dark:text-red-400 text-sm text-center flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-base">error</span>
          {errors.submit}
        </div>
      )}

      {/* Login Link */}
      <div className="mt-6 text-center">
        <p className="text-xs text-navy-700 dark:text-gray-400">
          Já tem conta na A.J.F.?{" "}
          <Link
            to="/login"
            className="font-bold text-navy-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
          >
            Fazer Login
          </Link>
        </p>
      </div>
    </form>
  );
}
