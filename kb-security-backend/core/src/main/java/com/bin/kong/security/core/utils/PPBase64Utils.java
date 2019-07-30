package com.bin.kong.security.core.utils;

import java.util.Base64;

public class PPBase64Utils {
    /**
     * 编码
     *
     * @param input
     * @return
     * @throws Exception
     */
    public static String encodeBase64(String input) {
        try {
            byte[] inputByte = input.getBytes();
            return Base64.getEncoder().encodeToString(inputByte);
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 解码
     *
     * @param input
     * @return
     * @throws Exception
     */
    public static String decodeBase64(String input) {
        try {
            byte[] outByte = Base64.getDecoder().decode(input);
            return new String(outByte);
        } catch (Exception e) {
            return null;
        }

    }
}
