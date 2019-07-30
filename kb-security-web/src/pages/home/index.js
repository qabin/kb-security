const module_list = [
  {
    img: '../../static/img/module_img_1.jpg',
    title: '跨站点脚本攻击',
    introduction: '这是一个XSS脚本攻击学习与练习最好的平台，即提供技术教程，又有可以一展身手的演武场。还在等什么，戳我开启黑客之旅。',
    url: '/chat_room'
  },
  {
    img: '../../static/img/module_img_2.jpg',
    title: '数据库脚本注入',
    introduction: 'SQL注入能做什么？充值提现->抹去记录->删库跑路->发家致富？没有你做不到，只是你可能还不知道。',
    url: '/chat_list'
  },
  {
    img: '../../static/img/module_img_3.jpg',
    title: 'Session劫持攻击',
    introduction: '会话劫持功能可以伪装成被劫持用户，利用劫持的会话完成用户大部分可以使用的功能和敏感的操作。',
    url: '/login'
  },
  {
    img: '../../static/img/module_img_4.jpg',
    title: '加密与解密',
    introduction: '生活处处要密码，你对加密与解密技术了解多少？什么样的密码才是相对安全的密码？点击这里，试一试哦',
    url: '/register'
  },
  {
    img: '../../static/img/module_img_5.jpg',
    title: 'XSS攻击劫持平台',
    introduction: '你发现一个网站有XSS安全漏洞，却不知道怎么利用？这里有一站式的解决方案，帮你完美劫持受害者网站。',
    url: '/xss_platform'
  },
  {
    img: '../../static/img/module_img_6.jpg',
    title: '待开发',
    introduction: 'CSRF？WebShell?钓鱼？暴破？提权？业务安全漏洞？。。。',
    url: ''
  },
]

export default {
  name: 'home_page',
  data: () => ({
    show_welcome: false
  }),
  methods: {
    render_welcome (h) {
      return h('div', {
        staticClass: 'text-left bg-negative q-pa-md text-white text-weight-bold'
      }, [h('div', {
        staticClass: ''
      }, [
        h('div', {
          style: {
            fontSize: '48px'
          }
        }, ['您已经被黑客攻击了！！！']),
        h('div', {
          staticClass: 'font-20 q-ma-md'
        }, ['欢迎您被劫持到《安全攻防演练平台》！！！如果想的话，您的域账号密码已经被窃取了！！！']),
        h('div', {
          staticClass: 'font-20 q-ml-md'
        }, [h('span', {}, '想了解这其中的原理吗？想解锁你的安全技能包吗？请点击下面的分类，开启您的安全之旅！')])
      ])])
    },

    render_module_item (h, d) {
      return h('div', {
        staticClass: 'pp-border-2 col-4 cursor-pointer pp-intro-div',
        style: {
          height: '260px',
          padding: '2%'
        },
        on: {
          click: () => this.$router.push({path: d.url})
        }
      }, [
        h('div', {
          staticClass: 'q-mt-sm'
        }, [
          h('img', {
            style: {
              width: '80px',
              height: '80px'
            },
            attrs: {
              src: d.img
            }
          })
        ]),
        h('div', {
          staticClass: 'text-weight-bold text-black font-18'
        }, [
          d.title
        ]),
        h('div', {
          staticClass: 'text-weight-bold text-light font-14 q-mt-sm'
        }, [
          d.introduction
        ])
      ])
    },
    render_module_list (h) {
      return h('div', {
        staticClass: 'row col-12 q-mt-md q-ml-xl q-mr-xl'
      }, [
        module_list.map(d => [this.render_module_item(h, d)])
      ])
    },
  },
  mounted () {
    try {
      if (this.$route.query.hack != 'undefined') {
        this.show_welcome = this.$route.query.hack
      }
    } catch (e) {
    }
  },
  render (h) {
    return h('div', {}, [
        this.show_welcome ? this.render_welcome(h) : null,
        this.render_module_list(h)
      ]
    )
  }
}
