package com.backend.infrastructure.repository;

import com.backend.infrastructure.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;


import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    //metodo que busca o usuario pelo email
    Optional<User> findByEmail(String email);
    //metodo que busca o usuario pelo cpf
    Optional<User> findBycpf(String cpf);

}
