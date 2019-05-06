package com.bin.kong.security.server.config;

import com.bin.kong.security.server.filter.UrlFilter;
import com.bin.kong.security.server.filter.XssFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.Resource;

@Configuration
public class FilterConfig {

    @Resource
    private XssFilter xssFilter;

    @Bean
    public FilterRegistrationBean UrlFilterRegistration() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(new UrlFilter());
        registration.addUrlPatterns("/*");
        registration.setName("UrlFilter");
        registration.setOrder(1);
        return registration;
    }

    @Bean
    public FilterRegistrationBean XssFilterRegistration() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(xssFilter);
        registration.addUrlPatterns("/*");
        registration.setName("XssFilter");
        registration.setOrder(0);
        return registration;
    }
}
