package com.bin.kong.security.core.utils;

import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.codec.binary.Base64;

import javax.crypto.Cipher;
import java.security.*;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class PPRsaUtils {
    private static final String ALGORITHM_RSA = "RSA";
    private static final Integer RSA_LENGTH = 1024;
    private static final String PUBLIC_KEY = "publicKey";
    private static final String PRIVATE_KEY = "privateKey";
    private static final String RSA_CHARSET = "UTF-8";

    public final static String KB_SECURITY_PUBLIC_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDEVjTHrMtmRojRJN6wX7oRxR6qCHNjrMbA5/ESyl5ApRU5tlbfHgV6q1d978aCLvuPFXMYxnbBehvXH3654TohRjss7tJ3dcwXLQmMfnJ9fK07G+lj9Uv2Wy9UG7MfR3ZIu7njASuKRv5YypNVbjax1LM0qft08uadROTT+d/mdQIDAQAB";
    public final static String KB_SECURITY_PRIVATE_KEY = "MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAMRWNMesy2ZGiNEk3rBfuhHFHqoIc2OsxsDn8RLKXkClFTm2Vt8eBXqrV33vxoIu+48VcxjGdsF6G9cffrnhOiFGOyzu0nd1zBctCYx+cn18rTsb6WP1S/ZbL1Qbsx9Hdki7ueMBK4pG/ljKk1VuNrHUszSp+3Ty5p1E5NP53+Z1AgMBAAECgYAWHwBjXvyr0Vao+dZ9WMvGJMeHsNwPZvAd3AQ1ccec0PzLO9gd22wSniuFbPaYxGJjhK8rI3FN60wnuMy2dMHvu0tKGl+UM4eYy0nfGIoCI1RtSeuYKGGM8VYs/A/k0yPC6cpftLLz0SpdDdIk6X3cf68Eeuix6cEcvLOsmJY/IQJBAOPC4t64UNu5Dw0AZUZZrtaWeHJq4ebI2Bo7ylaMnzOPdmupvJerQF+f+1bC7swSMxv3SiEQ475BH+Zkjl42E78CQQDcrejKtGkPQ7JSbBY3gQAcSuHIhwi2zu3kwsgZBS/RCdYA1UxxLMlYUNYYl3K2BB0tYROETJWO9bKyhpsp2ULLAkB8J8deG2FQdS+kKbwLPmYVac7cqDDeiktq+X7R8TPzelfWVp+MmfisZ9wtrnNX4O/lZccOAVP0aTHHeLc22gmnAkB1QRp+ChoAeFHZpYCwgSST493P9J/WsmCIuk4jrTPY+EbzLmJtiAR7nogDjQTwXYM7R2ddVmvpB/epEAiF1eC9AkAj5F1x3kzvNN0cN/2NVU0Zl6WZMJendWmrggO/P4ABEVApinZQcixq/L6ex4Nm3rqDiG9pP4p1MJiSmwz9H+dB";

    /**
     * 获取RSA 公钥和私钥
     *
     * @return
     * @throws Exception
     */
    public static Map<String, String> initRsaKeyMap() {
        try {
            KeyPairGenerator keyPairGen = KeyPairGenerator.getInstance(ALGORITHM_RSA);
            keyPairGen.initialize(RSA_LENGTH);
            KeyPair keyPair = keyPairGen.generateKeyPair();
            RSAPublicKey rsaPublicKey = (RSAPublicKey) keyPair.getPublic();
            byte[] keyBs = rsaPublicKey.getEncoded();
            //公钥
            String publicKey = encodeBase64(keyBs);
            RSAPrivateKey rsaPrivateKey = (RSAPrivateKey) keyPair.getPrivate();
            keyBs = rsaPrivateKey.getEncoded();
            //私钥
            String privateKey = encodeBase64(keyBs);
            Map<String, String> resultMap = new HashMap<>();
            resultMap.put(PUBLIC_KEY, publicKey);
            resultMap.put(PRIVATE_KEY, privateKey);
            return resultMap;
        } catch (Exception e) {
            log.error("initRsaKeyMap异常：" + e);
            return null;
        }
    }

    /**
     * 使用公钥进行数据加密
     *
     * @param content
     * @param pubKey
     * @return
     * @throws Exception
     */
    public static String encodeRsaByPubKey(String content, String pubKey) {
        try {
            PublicKey publicKey = getRSAPubKey(pubKey);
            Cipher cipher = Cipher.getInstance(publicKey.getAlgorithm());
            cipher.init(Cipher.ENCRYPT_MODE, publicKey);
            cipher.update(content.getBytes(RSA_CHARSET));
            return encodeBase64(cipher.doFinal());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 使用公钥进行解密
     *
     * @param content
     * @param pubKey
     * @return
     * @throws Exception
     */
    private static String decodeRsaByPubKey(String content, String pubKey) {
        try {
            PublicKey publicKey = getRSAPubKey(pubKey);
            Cipher cipher = Cipher.getInstance(publicKey.getAlgorithm());
            cipher.init(Cipher.DECRYPT_MODE, publicKey);
            cipher.update(decodeBase64(content));
            return new String(cipher.doFinal(), RSA_CHARSET);
        } catch (Exception e) {
            log.error("decodeRsaByPubKey异常：" + e);
            return null;
        }
    }

    /**
     * 使用私钥进行加密
     *
     * @param content
     * @param priKey
     * @return
     * @throws Exception
     */
    public static String encodeRsaByPriKey(String content, String priKey) {
        try {
            PrivateKey privateKey = getRSAPriKey(priKey);
            Cipher cipher = Cipher.getInstance(privateKey.getAlgorithm());
            cipher.init(Cipher.ENCRYPT_MODE, privateKey);
            cipher.update(content.getBytes(RSA_CHARSET));
            return encodeBase64(cipher.doFinal());
        } catch (Exception e) {
            log.error("encodeRsaByPriKey异常：" + e);
            return null;
        }
    }

    /**
     * 使用私钥进行解密
     *
     * @param content
     * @param priKey
     * @return
     * @throws Exception
     */
    public static String decodeRsaByPriKey(String content, String priKey) {
        try {
            PrivateKey privateKey = getRSAPriKey(priKey);
            Cipher cipher = Cipher.getInstance(privateKey.getAlgorithm());
            cipher.init(Cipher.DECRYPT_MODE, privateKey);
            cipher.update(decodeBase64(content));
            return new String(cipher.doFinal(), RSA_CHARSET);
        } catch (Exception e) {
            log.error("decodeRsaByPriKey异常：" + e);
            return null;
        }
    }

    /**
     * 获取RSA公钥
     *
     * @param pubKey
     * @return
     * @throws Exception
     */
    private static PublicKey getRSAPubKey(String pubKey) {
        try {
            X509EncodedKeySpec publicKeySpec = new X509EncodedKeySpec(decodeBase64(pubKey));
            KeyFactory keyFactory = KeyFactory.getInstance(ALGORITHM_RSA);
            return keyFactory.generatePublic(publicKeySpec);
        } catch (Exception e) {
            log.error("getRSAPubKey异常：" + e);
            return null;
        }
    }

    /**
     * 获取RSA私钥
     *
     * @param priKey
     * @return
     * @throws Exception
     */
    private static PrivateKey getRSAPriKey(String priKey) {
        try {
            PKCS8EncodedKeySpec privateKeySpec = new PKCS8EncodedKeySpec(decodeBase64(priKey));
            KeyFactory keyFactory = KeyFactory.getInstance(ALGORITHM_RSA);
            return keyFactory.generatePrivate(privateKeySpec);
        } catch (Exception e) {
            log.error("getRSAPriKey异常：" + e);
            return null;
        }
    }

    /**
     * BASE64加密
     *
     * @param source
     * @return
     * @throws Exception
     */
    private static String encodeBase64(byte[] source) throws Exception {
        return new String(Base64.encodeBase64(source), RSA_CHARSET);
    }

    /**
     * BASE64解密
     *
     * @param target
     * @return
     * @throws Exception
     */
    private static byte[] decodeBase64(String target) throws Exception {
        return Base64.decodeBase64(target.getBytes(RSA_CHARSET));
    }

}
