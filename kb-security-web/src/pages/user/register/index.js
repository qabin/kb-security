import {ajax_add_user_info} from '../../../api/user/user_login_api'

export default {
  name: 'login_index',
  data: () => ({
    model: {
      login_name: null,
      login_pwd: null,
      encrypt_type: 4,
    },
    remember_me: true,
  }),
  methods: {},
  render (h) {
    return h('div', {
      staticClass: 'pp-login-bg',
      style: {
        marginTop: '-60px'
      }
    }, [
      h('div', {
        staticClass: 'pp-login-wrap animated flipInY shadow-3 pp-radius-3'
      }, [h('div', {
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
            click: () => this.$router.push({path: '/login'})
          }
        },
        [h('q-icon', {
          style: {
            marginTop: '8px',
            marginLeft: '30px'
          },
          props: {
            name: 'person',
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
        }, ['登录'])])]
      ),
        h('div', {
          staticClass: 'text-tertiary text-center',
          style: {
            fontSize: '30px',
            fontWeight: '700',
            margin: '20px 0 80px'
          }
        }, ['账号注册']),
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
        h('q-btn', {
          staticClass: 'login-btn font-13 full-width shadow-1 pp-radius-2',
          style: {
            marginTop: '51px',
            height: '33px',
            minHeight: '33px',
            fontWeight: '400'
          },
          props: {
            color: 'primary'
          },
          on: {
            click: () => {
              ajax_add_user_info(this.model)
                .then(d => {
                  if (d.status === 1) {
                    this.$store.dispatch('user/getUserInfo').then().catch()
                    this.$router.push({path: '/home'})
                  } else {
                    this.$q.err(d.message)
                  }
                }).catch(e => {
                this.$q.err('注册异常！')
              })
            }
          }

        }, '注  册'),
        h('div', {
          staticClass: 'flex items-center font-12 text-dark',
          style: {
            marginTop: '16px'
          }
        }, [h('span', {
          staticClass: 'font-14 text-weight-bold'
        }, '加密:'),
          h('q-option-group', {
            staticClass: 'font-12 row',
            style: {
              marginTop: '-30px',
              marginLeft: '40px'
            },
            props: {
              type: 'radio',
              options: [{
                label: '明文', value: 1
              }, {
                label: 'BASE64', value: 2
              }, {
                label: 'MD5', value: 3
              }, {
                label: 'AES', value: 4
              }, {
                label: 'RSA', value: 5
              }],
              value: this.model.encrypt_type,
              inline: true
            },
            on: {
              input: (v) => this.model.encrypt_type = v
            }
          }, [])]),
      ])
    ])
  }
}
