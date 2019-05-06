package com.bin.kong.security.contract.user.request;

import com.bin.kong.security.core.enums.EncryptTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String login_name;
    private String login_pwd;
    @Builder.Default
    private Integer encrypt_type = EncryptTypeEnum.AES.getCode();
}
