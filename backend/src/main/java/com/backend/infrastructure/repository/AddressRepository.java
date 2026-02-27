package com.backend.infrastructure.repository;

import com.backend.infrastructure.model.Address;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AddressRepository extends MongoRepository<Address, String> {
    Optional<Address> findByUserId(String userId);

}
