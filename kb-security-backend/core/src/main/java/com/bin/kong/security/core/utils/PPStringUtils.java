package com.bin.kong.security.core.utils;

import java.net.URLDecoder;

public class PPStringUtils {

    public static String urlDecode(String input) {
        return URLDecoder.decode(input).replaceAll(" ", "+");
    }

    public static String getDomainForUrl(String url) {

        if (url == null) {
            return null;
        } else {
            try {
                if (url.startsWith("http://")) {
                    url = url.replace("http://", "");
                } else if (url.startsWith("https://")) {
                    url = url.replace("https://", "");
                }
                if (url.indexOf(":") != -1) {
                    url = url.substring(0, url.indexOf(":"));
                } else if (url.indexOf("/") != -1) {
                    url = url.substring(0, url.indexOf("/"));
                }

                return url;
            } catch (Exception e) {
                return null;
            }
        }
    }
}
