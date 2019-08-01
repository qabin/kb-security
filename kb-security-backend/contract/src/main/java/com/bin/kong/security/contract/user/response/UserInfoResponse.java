package com.bin.kong.security.contract.user.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoResponse {
    private Integer id;

    private String login_name;

    private Integer encrypt_type;

    private Integer user_type;

    private String ip;
}
