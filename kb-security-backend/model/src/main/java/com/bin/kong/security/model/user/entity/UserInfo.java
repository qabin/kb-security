package com.bin.kong.security.model.user.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInfo {
    private Integer id;

    private String login_name;

    private String login_pwd;

    private Integer encrypt_type;

    private Date create_time;

    private Date update_time;

    private String phone;

    private String description;

    private Integer user_type;

}
