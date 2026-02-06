export const MaskUtils = {
  maskCpf: (cpf) => {
    if (!cpf || cpf.length !== 11) return cpf;
    return `***.***.***-${cpf.substring(9)}`;
  },

  maskTelephone: (telephone) => {
    if (!telephone || telephone.length !== 11) return telephone;
    return `${telephone.substring(0, 2)} *****-${telephone.substring(7)}`;
  },

  maskEmail: (email) => {
    if (!email || !email.includes("@")) return email;

    const [nome, dominio] = email.split("@");
    const maskedNome = nome.length <= 2 ? "***" : `${nome.substring(0, 2)}***`;

    return `${maskedNome}@${dominio}`;
  },
};
