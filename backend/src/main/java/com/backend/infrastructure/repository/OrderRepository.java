package com.backend.infrastructure.repository;

import com.backend.infrastructure.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, String> {
}
