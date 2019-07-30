package com.bin.kong.security.core.utils;

import org.springframework.util.DigestUtils;

public class PPMd5Utils {
    public static String encodeMd5(String input) {
        return DigestUtils.md5DigestAsHex(input.getBytes());
    }

}
