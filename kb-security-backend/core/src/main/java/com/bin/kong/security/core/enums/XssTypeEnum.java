package com.bin.kong.security.core.enums;

public enum XssTypeEnum {
    //类型： 1. img 2. screen 3. command
    IMG(1, "img"), SCREEN(2, "screen"), COMMAND(3, "command");

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


    XssTypeEnum(Integer code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public static XssTypeEnum getByCode(Integer code) {
        for (XssTypeEnum statusEnum : values()) {
            if (statusEnum.getCode() == code) {
                return statusEnum;
            }
        }
        return null;
    }

    public static String getDescByCode(Integer code) {
        for (XssTypeEnum statusEnum : values()) {
            if (statusEnum.getCode() == code) {
                return statusEnum.getDesc();
            }
        }
        return null;
    }
}
