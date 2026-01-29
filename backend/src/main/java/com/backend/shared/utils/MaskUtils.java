package com.backend.shared.utils;

public class MaskUtils {
    public static String maskcpf(String cpf) {
        if (cpf == null || cpf.length() != 11)
            return cpf;
        return "***.***.***-" + cpf.substring(9);
    }

    public static String maskTelephone(String telephone) {
        if (telephone == null || telephone.length() != 11)
            return telephone;
        return telephone.substring(0, 2) + " *****-" + telephone.substring(7);
    }

    public static String maskEmail(String email) {
        if (email == null || !email.contains("@"))
            return email;

        String[] parts = email.split("@");
        String nome = parts[0];

        String masked = nome.length() <= 2
                ? "***"
                : nome.substring(0, 2) + "***";

        return masked + "@" + parts[1];
    }
}
