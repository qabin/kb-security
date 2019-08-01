package com.bin.kong.security.core.enums;

public enum XssStatusEnum {
    //类型： 1. 连接中 2. 已断开
    CONNECTING(1, "连接中"), CLOSED(2, "已断开");

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


    XssStatusEnum(Integer code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public static XssStatusEnum getByCode(Integer code) {
        for (XssStatusEnum statusEnum : values()) {
            if (statusEnum.getCode() == code) {
                return statusEnum;
            }
        }
        return null;
    }

    public static String getDescByCode(Integer code) {
        for (XssStatusEnum statusEnum : values()) {
            if (statusEnum.getCode() == code) {
                return statusEnum.getDesc();
            }
        }
        return null;
    }
}
