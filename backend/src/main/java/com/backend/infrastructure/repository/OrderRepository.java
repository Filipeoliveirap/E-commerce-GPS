package com.backend.infrastructure.repository;

import com.backend.infrastructure.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}