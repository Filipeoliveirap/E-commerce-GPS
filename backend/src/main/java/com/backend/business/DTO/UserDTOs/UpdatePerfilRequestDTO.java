package com.backend.business.DTO.UserDTOs;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePerfilRequestDTO {
    @NotBlank(message = "Nome não pode ser vazio")
    @Size(min = 2, max = 100, message = "Nome deve ter entre 2 e 100 caracteres")
    @Pattern(regexp = "^[A-Za-zÀ-ú ]+$", message = "Nome deve conter apenas letras")
    private String name;

    @NotBlank(message = "Email não pode ser vazio")
    @Size(max = 100, message = "Email deve ter entre 8 e 100 caracteres")
    @Email(message = "Email inválido")
    private String email;

    @NotBlank(message = "Senha não pode ser vazia")
    @Size(min = 6, message = "Senha deve ter pelo menos 6 caracteres")
    private String password;

    @NotBlank(message = "CPF não pode ser vazio")
    @Pattern(regexp = "\\d{11}", message = "CPF deve conter 11 digitos")
    private String cpf;

    @NotBlank(message = "Telefone não pode ser vazio")
    @Pattern(regexp = "\\d{11}", message = "Telefone deve conter 11 digitos (DDD + número)")
    @Pattern(regexp = "\\d+", message = "Telefone deve conter apenas números")
    private String telephone;
}
