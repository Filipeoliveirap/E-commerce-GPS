//import { cpf as cpfValidator } from "cpf-cnpj-validator";

/**
 * Valida se o email tem formato correto.
 * @param {string} email - Email a ser validado
 * @returns {boolean} true se válido, false caso contrário
 */
export const validateEmail = (email) => {
  if (!email) return false;

  // Regex básico para formato
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return false;

  // Lista de domínios válidos mais comuns
  const validDomains = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com"];
  const domain = email.split("@")[1].toLowerCase();

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

/**
 * Valida senha mínima (mínimo 6 caracteres)
 * @param {string} password - Senha a ser validada
 * @returns {boolean} true se válido, false caso contrário
 */
export const validatePassword = (password) => {
  return typeof password === "string" && password.length >= 6;
};

/**
 * Exporta todas as validações em um objeto para uso unificado
 */
export const validators = {
  email: validateEmail,
  cpf: validateCPF,
  phone: validatePhone,
  password: validatePassword,
};
