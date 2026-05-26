package com.backend.business.mappers;

import com.backend.business.DTO.AddressDTO.AddressResponseDTO;
import com.backend.business.DTO.AddressDTO.CreateAddressRequestDTO;
import com.backend.infrastructure.model.Address;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper {

    public Address toEntity(CreateAddressRequestDTO dto, String userId) {
        return Address.builder()
                .userId(userId)
                .street(dto.getStreet())
                .number(dto.getNumber())
                .complement(dto.getComplement())
                .neighborhood(dto.getNeighborhood())
                .city(dto.getCity())
                .state(dto.getState())
                .zipCode(dto.getZipCode())
                .build();
    }

    public AddressResponseDTO toResponse(Address address) {
        return new AddressResponseDTO(
                address.getId(),
                address.getStreet(),
                address.getNumber(),
                address.getComplement(),
                address.getNeighborhood(),
                address.getCity(),
                address.getState(),
                address.getZipCode()
        );
    }
}