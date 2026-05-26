package com.backend.infrastructure.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "payments")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Payment {

    @Id
    private String id;

    private String orderId;

    private String method;

    private Double amount;

    private String status;

    private String pixKey;

    private String boletoPdfBase64;

    private LocalDateTime createdAt;
}
