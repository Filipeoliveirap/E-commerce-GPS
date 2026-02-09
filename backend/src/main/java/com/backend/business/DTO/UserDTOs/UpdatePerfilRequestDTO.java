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

    @Size(min = 2, max = 100, message = "Nome deve ter entre 2 e 100 caracteres")
    @Pattern(
            regexp = "^[A-Za-zÀ-ú]+(?: [A-Za-zÀ-ú]+)*$",
            message = "Nome deve conter apenas letras e espaços simples entre palavras, sem espaços no início ou no final"
    )
    private String name;

    @Size(max = 100, message = "Email deve ter entre 8 e 100 caracteres")
    @Email(message = "Email inválido")
    private String email;

    @Pattern(regexp = "\\d{11}", message = "CPF deve conter 11 dígitos")
    private String cpf;

    @Pattern(regexp = "\\d{11}", message = "Telefone deve conter 11 dígitos (apenas números)")
    private String telephone;
}
