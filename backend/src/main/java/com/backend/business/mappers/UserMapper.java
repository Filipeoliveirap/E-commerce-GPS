package com.backend.business.mappers;

import com.backend.business.DTO.UserDTOs.AddressDTO;
import com.backend.business.DTO.UserDTOs.RegisterRequestDTO;
import com.backend.infrastructure.model.Address;
import com.backend.infrastructure.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public User toEntity(RegisterRequestDTO dto){
        return User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .CPF(dto.getCPF())
                .role(dto.getRole())
                .address(toAddress(dto.getAddress()))
                .build();
    }

    private Address toAddress(AddressDTO dto) {
        return new Address(
                dto.getRua(),
                dto.getNumero(),
                dto.getBairro(),
                dto.getCidade(),
                dto.getEstado(),
                dto.getCep()
        );
    }


}
