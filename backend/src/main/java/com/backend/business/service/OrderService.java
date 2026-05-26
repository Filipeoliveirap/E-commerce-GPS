package com.backend.business.service;

import com.backend.business.DTO.checkoutDTO.CheckoutRequestDTO;
import com.backend.infrastructure.model.*;
import com.backend.infrastructure.repository.*;
import com.backend.shared.exceptions.AddressNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public String createOrder(String email, CheckoutRequestDTO dto) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Address address = addressRepository.findByUserId(user.getId())
                .orElseThrow(AddressNotFoundException::new);

        List<OrderItem> orderItems = new ArrayList<>();
        double total = 0;

        for (var item : dto.getItems()) {
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

            total += product.getPrice() * item.getQuantity();

            orderItems.add(OrderItem.builder()
                    .productId(product.getId())
                    .productName(product.getName())
                    .price(product.getPrice())
                    .quantity(item.getQuantity())
                    .build());
        }

        Order order = Order.builder()
                .userId(user.getId())
                .userName(user.getName())
                .customerName(user.getName())
                .items(orderItems)
                .totalAmount(total)
                .status("PENDING")
                .addressId(address.getId())
                .address(address.getFullAddress())
                .createdAt(LocalDateTime.now())
                .build();

        orderRepository.save(order);

        return order.getId();
    }
}