package com.backend.shared.exceptions;

public class AddressNotFoundException extends RuntimeException {
    public AddressNotFoundException() {
        super("USER_WITHOUT_ADDRESS");
    }
}
