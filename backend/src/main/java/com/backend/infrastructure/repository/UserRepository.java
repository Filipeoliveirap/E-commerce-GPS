package com.backend.infrastructure.repository;

import com.backend.infrastructure.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
