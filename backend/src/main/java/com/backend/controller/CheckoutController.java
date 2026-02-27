package com.backend.controller;

import com.backend.business.DTO.checkoutDTO.CheckoutRequestDTO;
import com.backend.business.DTO.checkoutDTO.CheckoutResponseDTO;
import com.backend.business.service.CheckoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/checkout")
@RequiredArgsConstructor
public class CheckoutController {

    private final CheckoutService checkoutService;

    @PostMapping
    public ResponseEntity<CheckoutResponseDTO> checkout(
            Authentication authentication,
            @RequestBody CheckoutRequestDTO dto
    ) {
        String email = authentication.getName();

        CheckoutResponseDTO response = checkoutService.checkout(email, dto);

        return ResponseEntity.ok(response);
    }
}