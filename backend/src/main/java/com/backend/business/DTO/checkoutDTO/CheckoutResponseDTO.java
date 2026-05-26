package com.backend.business.DTO.checkoutDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CheckoutResponseDTO {

    private String boletoPdfBase64;
    private String pixKey;
}
