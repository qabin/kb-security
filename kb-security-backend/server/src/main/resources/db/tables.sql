CREATE TABLE `kb-security`.`blog_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL COMMENT '攻略名称',
  `content` longtext NOT NULL COMMENT '攻略内容',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `kb-security`.`chat_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL COMMENT '聊天标题',
  `content` varchar(1024) DEFAULT NULL COMMENT '聊天内容',
  `login_name` varchar(128) NOT NULL COMMENT '登录名',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `praise_count` int(11) NOT NULL DEFAULT '0' COMMENT '点赞数量',
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `kb-security`.`user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login_name` varchar(256) NOT NULL COMMENT '登录名',
  `login_pwd` varchar(256) NOT NULL COMMENT '登录密码',
  `encrypt_type` int(11) NOT NULL COMMENT '加密方式：\\n1. 不加密 2. Base64加密 3. md5加密 4.aes加密',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '修改时间',
  `user_type` int(11) NOT NULL DEFAULT '1' COMMENT '1. 普通用户 2. 管理员',
  PRIMARY KEY (`id`),
  UNIQUE KEY `login_name_UNIQUE` (`login_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `kb-security`.`xss_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain` varchar(256) NOT NULL COMMENT '域名',
  `url` varchar(1024) DEFAULT NULL COMMENT '请求链接',
  `cookie` varchar(1024) DEFAULT NULL COMMENT 'Cookie',
  `ip` varchar(256) DEFAULT NULL COMMENT 'Ip地址',
  `img` longtext COMMENT '截图',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `user_agent` varchar(1024) DEFAULT NULL COMMENT '用户终端信息',
  `command` varchar(1024) DEFAULT NULL COMMENT '命令',
  `type` int(11) DEFAULT NULL COMMENT '类型： 1. img 2.screen 3. command',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `status` int(11) NOT NULL DEFAULT '2' COMMENT '1. 连接中   2 .断开',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
