import Editor from '../../components/editor/Editor'
import {ajax_add_chat_info} from '../../api/chat/chat_info_api'
import {string_escape} from '../../utils/string_utils'

export default {
  name: 'comp_chat_editor',
  data: () => ({
    show_editor: true,
    model: {
      title: null,
      content: ''
    },
    contentStyle: {
      maxHeight: '100px',
    },
    xss_escape: true
  }),
  computed: {
    can_submit () {
      return !this.model.title ? true : false
    }
  },
  methods: {
    render_title (h) {
      return h('div', {
        staticClass: 'pp-border-5',
        style: {
          borderLeft: '6px solid var(--q-color-primary)',
          borderRight: '6px solid var(--q-color-primary)',
          marginLeft: '-6px',
          marginRight: '-6px'
        }
      }, [
        h('q-input', {
          staticClass: 'no-shadow text-weight-bold',
          style: {
            height: '50px',
            padding: '4px',
            fontSize: '15px',
          },
          props: {
            placeholder: '此处有妹儿，快来撩一下...',
            value: this.model.title,
            hideUnderline: true,
            color: 'primary',
            before: [{icon: 'title'}]
          },
          on: {
            focus: (v) => this.show_editor = true,
            input: (v) => this.model.title = v
          }
        })])
    },
    render_editor (h) {
      return h('div', {
        staticClass: 'q-pt-sm pp-border-5',
        style: {
          borderTop: 'none',
          textAlign: 'left',
        }
      }, [
        h(Editor, {
          props: {
            editorStyle: this.editorStyle,
            contentStyle: this.contentStyle,
            desText: this.model.content,
            placeholder: '请输入详情',
            border: false
          },
          on: {
            input: (v) => this.model.content = v
          }
        })
      ])
    },
    render_web_xss_escape (h) {
      return h('q-toggle', {
        staticClass: 'font-13 text-weight-bold float-right',
        style: {
          marginTop: '10px',
          marginRight: '15px'
        },
        props: {
          label: '转义',
          leftLabel: true,
          value: this.xss_escape,
          color: 'deep-orange'
        },
        on: {
          input: (v) => {
            this.xss_escape = v
          }
        }
      })
    },
    render_footer (h) {
      return h('div', {
        staticClass: 'bg-blue-grey-1',
        style: {
          height: '40px',
        }
      }, [
        h('q-btn', {
          staticClass: 'pp-radius-1 float-right',
          style: {
            marginTop: '5px',
            marginRight: '15px'
          },
          props: {
            label: '发布',
            color: 'primary',
            disable: this.can_submit
          },
          on: {
            click: () => {
              if (!this.xss_escape && this.model.content) {
                this.model.content = string_escape(this.model.content)
              }
              if (this.$store.state.user.login_name) {
                ajax_add_chat_info(this.model).then(data => {
                  this.$emit('refresh')
                  this.$q.notify({type: 'positive', message: '发布话题成功！'})
                }).catch(e => {
                  this.console.log(e)
                })
              } else {
                this.$router.push({path: '/login'})
              }
            }
          }
        }),
        h('q-btn', {
            staticClass: 'pp-radius-1 float-right',
            style: {
              marginTop: '5px',
              marginRight: '15px'
            },
            props: {
              label: '收起',
              color: 'text-tertiary',
              flat: true,
              size: '13px'
            },
            nativeOn: {
              click: () => this.show_editor = false
            }
          },
          [h('q-icon', {
            props: {
              name: 'expand_less'
            }
          })]
        ),
        this.render_web_xss_escape(h)
      ])
    }

  },
  render (h) {
    return h('div', {}, [
      this.render_title(h),
      this.show_editor ? this.render_editor(h) : null,
      this.show_editor ? this.render_footer(h) : null
    ])
  }
}
