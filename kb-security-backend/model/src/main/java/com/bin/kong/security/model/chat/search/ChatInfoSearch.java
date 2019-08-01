package com.bin.kong.security.model.chat.search;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatInfoSearch {
    private String searchKey;
    private Integer user_id;
    @Builder.Default
    private Integer pageSize = 10;
    @Builder.Default
    private Integer pageNum = 1;
    private Integer startNum;
    private Integer type;
    private String login_name;
    private String content;

    public Integer getStartNum() {
        if (pageNum > 0) {
            return pageSize * (pageNum - 1);
        } else {
            return 0;
        }
    }
}
