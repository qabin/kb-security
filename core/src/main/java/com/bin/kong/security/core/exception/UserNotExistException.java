package com.bin.kong.security.core.exception;

public class UserNotExistException extends RuntimeException {
    public UserNotExistException() {
        super("user not found");
    }
}
