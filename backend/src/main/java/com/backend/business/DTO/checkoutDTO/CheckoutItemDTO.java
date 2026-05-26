package com.backend.business.DTO.checkoutDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class CheckoutItemDTO {

    @NotBlank
    private Long productId;

    @NotNull
    @Positive
    private Integer quantity;
}