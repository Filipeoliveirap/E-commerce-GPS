package com.backend.business.mappers;

import com.backend.business.DTO.UserDTOs.*;
import com.backend.infrastructure.model.User;
import com.backend.shared.utils.MaskUtils;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    // metodo que mapeia o dto para entity(transforma o dto em entidade)
    public User toEntity(RegisterRequestDTO dto) {
        return User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .cpf(dto.getCpf())
                .role(dto.getRole())
                .telephone(dto.getTelephone())
                .build();
    }

    // metodo que mapeia a entidade para dto(transforma a entidade em dto)
    public RegisterResponseDTO toResponse(User user) {
        return new RegisterResponseDTO(
                user.getName());
    }

    public UpdatePerfilResponseDTO toUpdatePerfilResponse(User user) {
        return UpdatePerfilResponseDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(MaskUtils.maskEmail(user.getEmail()))
                .cpf(MaskUtils.maskcpf(user.getCpf()))
                .telephone(MaskUtils.maskTelephone(user.getTelephone()))
                .role(user.getRole().name())
                .build();
    }

    public UserProfileResponseDTO toUserProfileResponse(User user) {
        return new UserProfileResponseDTO(
                user.getId(),
                user.getName(),
                MaskUtils.maskEmail(user.getEmail()),
                MaskUtils.maskcpf(user.getCpf()),
                user.getRole().name(),
                MaskUtils.maskTelephone(user.getTelephone()));
    }

    public UserProfileResponseDTO toProfileResponse(User user) {
        return toUserProfileResponse(user);
    }

    public CamposReaisResponseDTO toCamposReaisDTO(User user) {
        return new CamposReaisResponseDTO(
                user.getEmail(),
                user.getCpf(),
                user.getTelephone()
        );
    }

}