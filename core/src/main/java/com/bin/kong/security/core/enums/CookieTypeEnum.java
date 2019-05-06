package com.bin.kong.security.core.enums;

public enum CookieTypeEnum {
    //类型： 1. id 2. base64_id 3. sessionId
    ID(1, "ID"), BASE64_ID(2, "BASE64_ID"), SESSION_ID(3, "SESSION_ID");

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


    CookieTypeEnum(Integer code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public static CookieTypeEnum getByCode(Integer code) {
        for (CookieTypeEnum statusEnum : values()) {
            if (statusEnum.getCode() == code) {
                return statusEnum;
            }
        }
        return null;
    }

    public static String getDescByCode(Integer code) {
        for (CookieTypeEnum statusEnum : values()) {
            if (statusEnum.getCode() == code) {
                return statusEnum.getDesc();
            }
        }
        return null;
    }
}
