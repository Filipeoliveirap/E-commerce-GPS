package com.backend.infrastructure.repository;

import com.backend.infrastructure.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}