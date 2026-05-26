package com.backend.business.service;

import com.backend.business.DTO.AddressDTO.AddressResponseDTO;
import com.backend.business.DTO.AddressDTO.CreateAddressRequestDTO;
import com.backend.business.mappers.AddressMapper;
import com.backend.infrastructure.model.Address;
import com.backend.infrastructure.model.User;
import com.backend.infrastructure.repository.AddressRepository;
import com.backend.infrastructure.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final AddressMapper addressMapper;

    public AddressResponseDTO createAddress(String emailUsuarioLogado, CreateAddressRequestDTO dto) {

        User user = userRepository.findByEmail(emailUsuarioLogado)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        if (addressRepository.findByUserId(user.getId()).isEmpty()) {
            throw new IllegalArgumentException("Usuário já possui endereço cadastrado");
        }

        Address address = addressMapper.toEntity(dto, user.getId());

        addressRepository.save(address);

        return addressMapper.toResponse(address);
    }

    public boolean userHasAddress(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return addressRepository.findByUserId(user.getId()).isEmpty();
    }

    public List<AddressResponseDTO> getUserAddresses(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return addressRepository.findByUserId(user.getId())
                .stream()
                .map(addressMapper::toResponse)
                .toList();
    }
}
