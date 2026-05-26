package com.backend.infrastructure.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_id")
    private Long orderId;

    private String method;
    private Double amount;
    private String status;

    @Column(name = "pix_key")
    private String pixKey;

    @Column(name = "boleto_pdf_base64", columnDefinition = "TEXT")
    private String boletoPdfBase64;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}