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

    // Metodo de lógica para registro de usuário
    public RegisterResponseDTO register(RegisterRequestDTO dto) {

        if (repository.findByEmail(dto.getEmail().toLowerCase()).isPresent()) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        if (repository.findBycpf(dto.getCpf()).isPresent()) {
            throw new IllegalArgumentException("CPF já cadastrado");
        }

        User user = userMapper.toEntity(dto);
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(com.backend.infrastructure.model.UserRole.USER);

        repository.save(user);

        return userMapper.toResponse(user);
    }

    // Metodo de lógica para login de usuário
    public LoginResponseDTO login(AuthenticationDTO dto) {
        try {
            var authToken = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());

            var auth = authenticationManager.authenticate(authToken);

            var user = (User) auth.getPrincipal();

            var token = tokenService.generateToken(user);

            return new LoginResponseDTO(
                    user.getName(),
                    token);

        } catch (Exception e) {
            throw new LoginException("Email ou senha inválidos");
        }

    }

    public UserProfileResponseDTO updatePerfil(
            String emailUsuarioLogado,
            UpdatePerfilRequestDTO dto) {

        User user = repository.findByEmail(emailUsuarioLogado)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        if (dto.getEmail() != null && !dto.getEmail().toLowerCase().equals(user.getEmail())) {
            if (repository.findByEmail(dto.getEmail().toLowerCase()).isPresent()) {
                throw new IllegalArgumentException("Email já cadastrado");
            }
            user.setEmail(dto.getEmail().toLowerCase());
        }

        if (dto.getCpf() != null && !dto.getCpf().equals(user.getCpf())) {
            if (repository.findBycpf(dto.getCpf()).isPresent()) {
                throw new IllegalArgumentException("CPF já cadastrado");
            }
            user.setCpf(dto.getCpf());
        }

        if (dto.getName() != null) {
            user.setName(dto.getName());
        }

        if (dto.getTelephone() != null) {
            user.setTelephone(dto.getTelephone());
        }

        repository.save(user);

        return userMapper.toProfileResponse(user);
    }


    // metodo para buscar o obj usuario
    public UserProfileResponseDTO getPerfil(String email) {
        User user = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return userMapper.toUserProfileResponse(user);
    }

    public void updatePassword(String emailUsuarioLogado, UpdatePasswordRequestDTO dto) {

        User user = repository.findByEmail(emailUsuarioLogado)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        if (!passwordEncoder.matches(dto.getCurrentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Senha atual incorreta");
        }

        if (passwordEncoder.matches(dto.getNewPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Nova senha deve ser diferente da atual");
        }

        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));

        repository.save(user);
    }

    public CamposReaisResponseDTO getCamposReais(String emailUsuarioLogado) {
        User user = repository.findByEmail(emailUsuarioLogado)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        return userMapper.toCamposReaisDTO(user);
    }

    public void deleteAccount(String emailUsuarioLogado, DeleteAccountRequestDTO dto) {
        if (dto.getConfirmed() == null || !dto.getConfirmed()) {
            throw new IllegalArgumentException("Confirmação de deleção é obrigatória");
        }

        User user = repository.findByEmail(emailUsuarioLogado)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        repository.delete(user);
    }

}
