//import { cpf as cpfValidator } from "cpf-cnpj-validator";

/**
 * Valida se o email tem formato correto.
 * @param {string} email - Email a ser validado
 * @returns {boolean} true se válido, false caso contrário
 */
export const validateEmail = (email) => {
  if (!email) return false;

  const clean = email.trim().toLowerCase();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(clean)) return false;

  const validDomains = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com"];
  const domain = clean.split("@")[1];

  return validDomains.includes(domain);
};

/**
 * Validação completa de CPF (para usar depois)
 */
// export const validateCPF = (cpfValue) => {
//   if (!cpfValue) return false;
//   const cpfClean = cpfValue.replace(/\D/g, ""); // remove caracteres não numéricos
//   return cpfValidator.isValid(cpfClean);
// };

/**
 * Validação simplificada de CPF (produção temporária)
 * Apenas verifica se tem 11 dígitos numéricos
 */
export const validateCPF = (cpfValue) => {
  if (!cpfValue) return false;
  const cpfClean = cpfValue.replace(/\D/g, "");
  return cpfClean.length === 11;
};

/**
 * Valida telefone brasileiro (11 dígitos: DDD + número)
 * @param {string} phoneValue - Telefone com ou sem formatação
 * @returns {boolean} true se válido, false caso contrário
 */
export const validatePhone = (phoneValue) => {
  if (!phoneValue) return false;
  const phoneClean = phoneValue.replace(/\D/g, "");
  return phoneClean.length === 11;
};

export const validateName = (name) => {
  if (!name) return false;

  const clean = name.trim();

  // Começa com letra, permite letras, espaços e acentos
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;

  return nameRegex.test(clean);
};

/**
 * Valida senha mínima (mínimo 6 caracteres)
 * @param {string} password - Senha a ser validada
 * @returns {boolean} true se válido, false caso contrário
 */
export const validatePassword = (password) => {
  return typeof password === "string" && password.length >= 6;
};

export const sanitizeText = (value) => {
  if (typeof value !== "string") return "";
  return value.trim();
};

/**
 * Exporta todas as validações em um objeto para uso unificado
 */
export const validators = {
  name: validateName,
  email: validateEmail,
  cpf: validateCPF,
  phone: validatePhone,
  password: validatePassword,
};
