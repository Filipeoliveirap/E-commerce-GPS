import { cpf } from 'cpf-cnpj-validator'

// Valida email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Valida CPF usando biblioteca
export const validateCPF = (cpfValue) => {
  const cpfClean = cpfValue.replace(/\D/g, '')
  return cpf.isValid(cpfClean)
}

// Valida telefone (deve ter 11 dígitos)
export const validatePhone = (phoneValue) => {
  const phoneClean = phoneValue.replace(/\D/g, '')
  return phoneClean.length === 11
}

// Valida senha (mínimo 6 caracteres)
export const validatePassword = (password) => {
  return password && password.length >= 6
}
