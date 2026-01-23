package com.backend.business.DTO.UserDTOs;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePerfilResponseDTO {
    private String id;
    private String name;
    private String email;
    private String password;
    private String cpf;
    private String telephone;
    private String Role;

}
