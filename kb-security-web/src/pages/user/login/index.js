import {ajax_login_in} from '../../../api/user/user_login_api'

export default {
  name: 'login_index',
  data: () => ({
    model: {
      login_name: null,
      login_pwd: null,
      cookie_type: 3,
      http_only: true,
    },
    remember_me: true,
  }),
  methods: {
    remember_user () {
      this.$q.localStorage.set('login_form', this.model)
    },
  },
  render (h) {
    return h('div', {
      staticClass: 'pp-login-bg',
      style: {
        marginTop: '-60px',
      }
    }, [
      h('div', {
        staticClass: 'pp-login-wrap animated flipInY shadow-3 pp-radius-3',

      }, [
        h('div', {
            staticClass: 'cursor-pointer',
            style: {
              position: 'absolute',
              top: '0px',
              right: '0px',
              width: '60px',
              height: '60px',
              border: 'solid',
              borderWidth: '0px 60px 60px 0px',
              borderColor: 'transparent #027be3 transparent transparent',
            },
            on: {
              click: () => this.$router.push({path: '/register'})
            }
          },
          [h('q-icon', {
            style: {
              marginTop: '8px',
              marginLeft: '26px'
            },
            props: {
              name: 'person_add',
              size: '30px',
              color: 'white'
            }
          }, [h('q-tooltip', {
            staticClass: 'font-md q-pa-sm',
            props: {
              self: 'bottom left',
              anchor: 'top right',
              offset: [0, 0],
            },
          }, ['注册'])])]
        ),
        h('div', {
          staticClass: 'text-tertiary text-center',
          style: {
            fontSize: '30px',
            fontWeight: '700',
            margin: '20px 0 80px'
          }
        }, ['安全攻防演练平台']),
        h('q-input', {
          staticClass: 'bg-white pp-radius-3 font-13 q-pl-xs q-pr-sm pp shadow-1 q-mb-md login-input',
          style: {
            height: '33px',
            fontWeight: '400',
            border: '1px solid white',

          },
          props: {
            color: 'dark',
            type: 'text',
            hideUnderline: true,
            value: this.model.login_name,
            placeholder: '请输入账号',
            before: [{
              icon: 'person'
            }]
          },
          on: {
            input: (v) => this.model.login_name = v
          }
        }),
        h('q-input', {
          staticClass: 'bg-white pp-radius-3 font-13 q-pl-xs q-pr-sm pp shadow-1 login-input',
          style: {
            height: '33px',
            fontWeight: '400',
          },
          props: {
            color: 'dark',
            type: 'password',
            hideUnderline: true,
            value: this.model.login_pwd,
            placeholder: '请输入密码',
            clearable: true,
            before: [{
              icon: 'lock',
            }]
          },
          on: {
            input: (v) => this.model.login_pwd = v
          }
        }),
        h('div', {
          staticClass: 'flex items-center font-12 text-dark',
          style: {
            marginTop: '20px'
          }
        }, [
          h('q-checkbox', {
            class: 'no-ripple',
            props: {
              color: 'tertiary',
              value: this.remember_me,
            },
            on: {
              input: (v) => this.remember_me = v
            }
          }, [
            h('span', {
              staticClass: 'q-ml-sm'
            }, '记住我')
          ]),
        ]),
        h('q-btn', {
          staticClass: 'login-btn font-13 full-width shadow-1 pp-radius-2',
          style: {
            marginTop: '10px',
            height: '33px',
            minHeight: '33px',
            fontWeight: '400'
          },
          props: {
            color: 'primary'
          },
          on: {
            click: () => {
              if (this.remember_me) {
                this.remember_user()
              }
              ajax_login_in(this.model)
                .then(d => {
                  if (d.status === 1) {
                    this.$store.dispatch('user/getUserInfo').then().catch()
                    this.$router.push({path: '/home'})
                  } else {
                    if (d.message) {
                      this.$q.err(d.message)
                    } else {
                      this.$q.err('登录异常！')
                    }
                  }
                }).catch(e => {
                this.$q.err('登录异常！')
              })
            }
          }

        }, '登 录'),
        h('div', {
          staticClass: 'flex items-center font-12 text-dark',
          style: {
            marginTop: '10px'
          }
        }, [h('span', {
          staticClass: 'font-14 text-weight-bold'
        }, 'Session:'),
          h('q-option-group', {
            staticClass: 'font-12 q-ml-sm',
            props: {
              type: 'radio',
              options: [{
                label: '明文', value: 1
              }, {
                label: '加密', value: 2
              }, {
                label: '不可读', value: 3
              }],
              value: this.model.cookie_type,
              inline: true
            },
            on: {
              input: (v) => this.model.cookie_type = v
            }
          }, [])]),
        h('div', {
          staticClass: 'flex items-center font-12 text-dark',
          style: {
            marginTop: '10px'
          }
        }, [h('q-toggle', {
          staticClass: 'font-13 text-weight-bold float-right',
          style: {},
          props: {
            label: 'HttpOnly:',
            leftLabel: true,
            value: this.model.http_only,
            color: 'primary'
          },
          on: {
            input: (v) => {
              this.model.http_only = v
            }
          }
        })]),
      ])
    ])
  }
}
