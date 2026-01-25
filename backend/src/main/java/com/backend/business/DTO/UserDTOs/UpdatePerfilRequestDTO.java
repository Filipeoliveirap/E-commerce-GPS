package com.backend.business.DTO.UserDTOs;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePerfilRequestDTO {

    /**
     * Nome do usuário
     * - Opcional no update
     * - Se enviado, deve ter entre 2 e 100 caracteres
     * - Aceita apenas letras e espaços (inclui acentos)
     */
    @Size(min = 2, max = 100, message = "Nome deve ter entre 2 e 100 caracteres")
    @Pattern(
        regexp = "^[A-Za-zÀ-ú ]+$",
        message = "Nome deve conter apenas letras"
    )
    private String name;

    /**
     * Email do usuário
     * - Opcional no update
     * - Se enviado, deve ser um email válido
     * - Máximo de 100 caracteres
     */
    @Email(message = "Email inválido")
    @Size(max = 100, message = "Email deve ter no máximo 100 caracteres")
    private String email;

    /**
     * Senha do usuário
     * - Opcional no update
     * - Se enviada, deve ter no mínimo 6 caracteres
     * - Será criptografada no service antes de salvar
     */
    @Size(min = 6, message = "Senha deve ter pelo menos 6 caracteres")
    private String password;

    /**
     * CPF do usuário
     * - Opcional no update
     * - Deve conter exatamente 11 dígitos numéricos
     * - Sem pontos ou traços
     */
    @Pattern(
        regexp = "\\d{11}",
        message = "CPF deve conter exatamente 11 dígitos numéricos"
    )
    private String cpf;

    /**
     * Telefone do usuário
     * - Opcional no update
     * - Deve conter exatamente 11 dígitos (DDD + número)
     * - Apenas números
     */
    @Pattern(
        regexp = "\\d{11}",
        message = "Telefone deve conter 11 dígitos (DDD + número)"
    )
    private String telephone;
}