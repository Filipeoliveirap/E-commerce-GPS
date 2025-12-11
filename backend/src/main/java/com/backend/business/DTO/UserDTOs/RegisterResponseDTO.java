package com.backend.business.DTO.UserDTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterResponseDTO {
    private String id;
    private String name;
    private String email;
    private String telephone;
    private String cpf;
}
