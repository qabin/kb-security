package com.bin.kong.security.core.enums;

public enum EncryptTypeEnum {
    //类型： 1. img 2. screen 3. md5 4. aes
    NO_ENCRYPT(1, "明文"), BASE64(2, "BASE64"), MD5(3, "MD5"), AES(4, "AES"),RSA(5, "RSA");

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    private Integer code;
    private String desc;


    EncryptTypeEnum(Integer code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public static EncryptTypeEnum getByCode(Integer code) {
        for (EncryptTypeEnum statusEnum : values()) {
            if (statusEnum.getCode() == code) {
                return statusEnum;
            }
        }
        return null;
    }

    public static String getDescByCode(Integer code) {
        for (EncryptTypeEnum statusEnum : values()) {
            if (statusEnum.getCode() == code) {
                return statusEnum.getDesc();
            }
        }
        return null;
    }
}
