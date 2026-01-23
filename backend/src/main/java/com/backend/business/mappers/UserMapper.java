package com.backend.business.mappers;

import com.backend.business.DTO.UserDTOs.RegisterRequestDTO;
import com.backend.business.DTO.UserDTOs.RegisterResponseDTO;
import com.backend.business.DTO.UserDTOs.UpdatePerfilResponseDTO;
import com.backend.infrastructure.model.User;
import com.backend.shared.utils.MaskUtils;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    //metodo que mapeia o dto para entity(transforma o dto em entidade)
    public User toEntity(RegisterRequestDTO dto){
        return User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .cpf(dto.getCpf())
                .role(dto.getRole())
                .telephone(dto.getTelephone())
                .build();
    }

    //metodo que mapeia a entidade para dto(transforma a entidade em dto)
    public RegisterResponseDTO toResponse(User user) {
        return new RegisterResponseDTO(
                user.getName()
        );
    }

    public UpdatePerfilResponseDTO toUpdatePerfilResponse(User user) {
        return UpdatePerfilResponseDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(MaskUtils.maskEmail(user.getEmail()))
                .cpf(MaskUtils.maskcpf(user.getCpf()))
                .telephone(MaskUtils.maskTelephone(user.getTelephone()))
                .Role(user.getRole().name())
                .build();
    }


}
