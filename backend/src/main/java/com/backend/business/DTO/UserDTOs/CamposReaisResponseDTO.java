package com.backend.business.DTO.UserDTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CamposReaisResponseDTO {
    private String email;
    private String cpf;
    private String telephone;
}
