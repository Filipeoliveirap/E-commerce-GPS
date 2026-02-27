package com.backend.business.service;

import com.backend.business.DTO.checkoutDTO.BoletoData;
import com.backend.infrastructure.model.Order;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class BoletoGenerator {

    public BoletoData generate(Order order) {

        String barcode = UUID.randomUUID().toString().replace("-", "");

        return BoletoData.builder()
                .payerName(order.getCustomerName())
                .companyName("FoodApp Company LTDA")
                .amount(order.getTotalAmount())
                .description(buildDescription(order))
                .dueDate(LocalDate.now().plusDays(3))
                .barcode(barcode)
                .lineDigitavel(generateLinhaDigitavel(barcode))
                .build();
    }

    private String buildDescription(Order order) {
        return order.getItems().stream()
                .map(item -> item.getProductName() + " x" + item.getQuantity())
                .collect(Collectors.joining(", "));
    }

    private String generateLinhaDigitavel(String barcode) {
        return barcode.substring(0, 47);
    }
}
