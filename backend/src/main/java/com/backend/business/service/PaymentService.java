package com.backend.business.service;

import com.backend.business.DTO.checkoutDTO.CheckoutResponseDTO;
import com.backend.infrastructure.model.Order;
import com.backend.infrastructure.model.Payment;
import com.backend.infrastructure.payment.BoletoPdfGenerator;
import com.backend.infrastructure.repository.OrderRepository;
import com.backend.infrastructure.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;

    public CheckoutResponseDTO generatePayment(String orderId, String method) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        Payment payment;

        if ("PIX".equalsIgnoreCase(method)) {

            payment = Payment.builder()
                    .orderId(order.getId())
                    .method("PIX")
                    .amount(order.getTotalAmount())
                    .status("PENDING")
                    .pixKey("empresa@pix.com")
                    .createdAt(LocalDateTime.now())
                    .build();

        } else if ("BOLETO".equalsIgnoreCase(method)) {

            byte[] pdfBytes = BoletoPdfGenerator.generate(order);
            String base64Pdf = Base64.getEncoder().encodeToString(pdfBytes);

            payment = Payment.builder()
                    .orderId(order.getId())
                    .method("BOLETO")
                    .amount(order.getTotalAmount())
                    .status("PENDING")
                    .boletoPdfBase64(base64Pdf)
                    .createdAt(LocalDateTime.now())
                    .build();

        } else {
            throw new RuntimeException("Método de pagamento inválido");
        }

        paymentRepository.save(payment);

        if ("PIX".equalsIgnoreCase(method)) {
            return CheckoutResponseDTO.builder()
                    .pixKey(payment.getPixKey())
                    .build();
        }

        return CheckoutResponseDTO.builder()
                .boletoPdfBase64(payment.getBoletoPdfBase64())
                .build();
    }
}