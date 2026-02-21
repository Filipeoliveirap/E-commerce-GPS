package com.backend.infrastructure.repository;

import com.backend.infrastructure.model.Product;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product, String> {
    List<Product> findByCategory(String category);

}