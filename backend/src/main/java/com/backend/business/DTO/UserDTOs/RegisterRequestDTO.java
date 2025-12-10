package com.backend.business.DTO.UserDTOs;

import com.backend.infrastructure.model.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequestDTO {
    private String name;
    private String email;
    private String password;
    private String CPF;
    private AddressDTO address;
    private UserRole role;
}
