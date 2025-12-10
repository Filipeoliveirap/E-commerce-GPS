package com.backend.business.service;

import com.backend.business.DTO.UserDTOs.AuthenticationDTO;
import com.backend.business.DTO.UserDTOs.LoginResponseDTO;
import com.backend.business.DTO.UserDTOs.RegisterRequestDTO;
import com.backend.business.DTO.UserDTOs.RegisterResponseDTO;
import com.backend.business.mappers.UserMapper;
import com.backend.infrastructure.model.User;
import com.backend.infrastructure.repository.UserRepository;
import com.backend.infrastructure.security.TokenService;
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

    public void saveUser(User user) {
        repository.save(user);
    }

    public RegisterResponseDTO register (RegisterRequestDTO dto ) {
        if(repository.findByEmail(dto.getEmail()) !=null) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = userMapper.toEntity(dto);

        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        repository.save(user);

        return new RegisterResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail()

        );

    }

    public LoginResponseDTO login(AuthenticationDTO dto) {
        var userNamePassword = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());

        var auth = authenticationManager.authenticate(userNamePassword);

        var user = (User) auth.getPrincipal();

        var token = tokenService.generateToken(user);

        return new LoginResponseDTO(
                user.getId(),
                user.getName(),
                token
        );
    }

}
