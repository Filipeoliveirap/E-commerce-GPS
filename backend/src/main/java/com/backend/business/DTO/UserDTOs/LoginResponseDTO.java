package com.backend.business.DTO.UserDTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDTO {
    private String id;
    private String name;
    private String token;
}
