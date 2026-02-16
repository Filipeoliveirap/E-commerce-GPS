package com.backend.business.DTO.UserDTOs;

public record UserProfileResponseDTO(
        String id,
        String name,
        String email,
        String cpf,
        String role,
        String telephone
) {}
