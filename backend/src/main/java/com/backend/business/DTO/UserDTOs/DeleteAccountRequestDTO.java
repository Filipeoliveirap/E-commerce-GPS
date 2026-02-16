package com.backend.business.DTO.UserDTOs;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeleteAccountRequestDTO {

    @NotNull(message = "Confirmação de deleção é obrigatória")
    private Boolean confirmed;
}
