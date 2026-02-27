package com.backend.business.DTO.checkoutDTO;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class CheckoutRequestDTO {

    @NotEmpty
    private List<CheckoutItemDTO> items;

    @NotNull
    private String paymentMethod;
}
