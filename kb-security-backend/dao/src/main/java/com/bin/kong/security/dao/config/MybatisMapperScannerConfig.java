//package com.bin.kong.security.dao.config;
//
//import org.mybatis.spring.annotation.MapperScan;
//import org.mybatis.spring.mapper.MapperScannerConfigurer;
//import org.springframework.boot.autoconfigure.AutoConfigureAfter;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//@AutoConfigureAfter(DruidConfig.class)
//@MapperScan("com.bin.kong.security.dao.mapper")
//public class MybatisMapperScannerConfig {
//    public MapperScannerConfigurer mapperScannerConfigurer() {
//        MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer();
//        mapperScannerConfigurer.setSqlSessionFactoryBeanName("sqlSessionFactory");
//        mapperScannerConfigurer.setBasePackage("com.bin.kong.security.dao.mapper");
//        return mapperScannerConfigurer;
//    }
//}
