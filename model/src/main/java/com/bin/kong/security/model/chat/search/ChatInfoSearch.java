package com.bin.kong.security.model.chat.search;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatInfoSearch {
    private String searchKey;
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
