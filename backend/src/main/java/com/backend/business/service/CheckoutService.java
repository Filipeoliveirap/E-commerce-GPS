package com.backend.business.service;

import com.backend.business.DTO.checkoutDTO.CheckoutRequestDTO;
import com.backend.business.DTO.checkoutDTO.CheckoutResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CheckoutService {

    private final OrderService orderService;
    private final PaymentService paymentService;

    public CheckoutResponseDTO checkout(String email, CheckoutRequestDTO dto) {
        String orderId = orderService.createOrder(email, dto);

        return paymentService.generatePayment(orderId, dto.getPaymentMethod());
    }
}