package com.backend.business.service;

import com.backend.business.DTO.UserDTOs.*;
import com.backend.business.mappers.UserMapper;
import com.backend.infrastructure.model.User;
import com.backend.infrastructure.repository.UserRepository;
import com.backend.infrastructure.security.TokenService;
import com.backend.shared.exceptions.LoginException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;

    private final UserMapper userMapper;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final TokenService tokenService;

    //Metodo de lógica para registro de usuário
    public RegisterResponseDTO register(RegisterRequestDTO dto) {

        if (repository.findByEmail(dto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        if (repository.findBycpf(dto.getCpf()).isPresent()) {
            throw new IllegalArgumentException("CPF já cadastrado");
        }

        User user = userMapper.toEntity(dto);
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        repository.save(user);

        return userMapper.toResponse(user);
    }


    //Metodo de lógica para login de usuário
    public LoginResponseDTO login(AuthenticationDTO dto) {
        try {
            var authToken = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());

            var auth = authenticationManager.authenticate(authToken);

            var user = (User) auth.getPrincipal();

            var token = tokenService.generateToken(user);

            return new LoginResponseDTO(
                    user.getName(),
                    token
            );

        } catch (Exception e) {
            throw new LoginException("Email ou senha inválidos");
        }

    }

    public UpdatePerfilResponseDTO updatePerfil(String emailUsuarioLogado, UpdatePerfilRequestDTO dto) {
        User user = repository.findByEmail(emailUsuarioLogado)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        if (dto.getName() != null) {
            user.setName(dto.getName());
        }
        if (dto.getEmail() != null) {
            user.setEmail(dto.getEmail());
        }
        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }
        if (dto.getTelephone() != null) {
            user.setTelephone(dto.getTelephone());
        }


        repository.save(user);

        return userMapper.toUpdatePerfilResponse(user);
    }


}
