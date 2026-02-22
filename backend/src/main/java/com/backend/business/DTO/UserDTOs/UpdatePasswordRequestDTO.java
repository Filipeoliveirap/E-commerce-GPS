package com.backend.business.DTO.UserDTOs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePasswordRequestDTO {

    @NotBlank(message = "Senha atual é obrigatória")
    @Size(min = 6, message = "Senha deve ter pelo menos 6 caracteres")
    private String currentPassword;

    @NotBlank(message = "Senha não pode ser vazia")
    @Size(min = 6, message = "Senha deve ter pelo menos 6 caracteres")
    private String newPassword;
}
