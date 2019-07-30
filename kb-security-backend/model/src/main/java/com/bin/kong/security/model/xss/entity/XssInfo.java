package com.bin.kong.security.model.xss.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class XssInfo {
    private Integer id;

    private String domain;

    private String url;

    private String cookie;

    private String ip;

    private String img;

    private Date create_time;

    private String user_agent;

    private String command;

    private Integer type;
}
