package com.bin.kong.security.model.blog.entity;

import lombok.*;

import java.util.Date;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlogInfo {
    private Integer id;

    private String title;

    private Date create_time;

    private Date update_time;

    private String content;

}
