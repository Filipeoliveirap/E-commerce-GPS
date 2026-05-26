package com.backend.infrastructure.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "orders")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Order {

    @Id
    private String id;

    private String userId;

    private String userName;

    private String customerName;

    private List<OrderItem> items;

    private Double totalAmount;

    private String status;

    private String addressId;

    private String address;

    private LocalDateTime createdAt;
}
