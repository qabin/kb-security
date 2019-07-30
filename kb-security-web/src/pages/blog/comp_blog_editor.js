import UEditor from '../../plugins/Uedtior'
import {ajax_add_blog, ajax_update_blog} from '../../api/blog/blog_info_api'
import store from '../../store/index'
import {vm as Vue} from '../../main'
export default {
  name: 'comp_blog_editor',
  data: () => ({
    model: {
      title: null,
      content: null,
      id: null
    },
    config: {
      autoHeightEnabled: false,
      autoFloatEnabled: false,
      initialContent: '请输入内容',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
      autoClearinitialContent: true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
      initialFrameWidth: null,
      initialFrameHeight: 450,
      zIndex: 10000,
      BaseUrl: '',
      UEDITOR_HOME_URL: 'static/ueditor/'
    },
  }),
  props: {
    props_title: null,
    props_content: null,
    props_id: null
  },
  computed: {
    can_submit () {
      return !this.model.title ? true : false
    }
  },
  methods: {
    init (data) {
      this.model.title = data.title
      this.model.content = data.content
    },
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
            placeholder: '请输入博客名称',
            value: this.model.title,
            hideUnderline: true,
            color: 'primary',
            before: [{icon: 'title'}]
          },
          on: {
            input: (v) => this.model.title = v
          }
        })])
    },
    render_editor (h) {
      return h('div', {
        staticClass: 'q-pl-md q-mr-md'
      }, [
        h(UEditor, {
          ref: 'UEditor',
          props: {
            config: this.config,
            content: '88888'
          },
        })
      ])
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
              if (store.state.user.login_name) {
                this.model.content = this.get_ueditor_content()
                if (this.model.id && this.model.id > 0) {
                  ajax_update_blog(this.model).then(data => {
                    this.$emit('refresh')
                    this.$q.notify({type: 'positive', message: '修改攻略成功！'})
                  }).catch(e => {
                    this.console.log(e)
                  })
                } else {
                  ajax_add_blog(this.model).then(data => {
                    this.$emit('refresh')
                    this.$q.notify({type: 'positive', message: '发布攻略成功！'})
                  }).catch(e => {
                    this.console.log(e)
                  })
                }

              } else {
                Vue.$router.push({path: '/login'})
              }
            }
          }
        }),
      ])
    },
    get_ueditor_content () {
      return this.$refs.UEditor.getUEContent()
    }

  },
  mounted () {
    if (this.props_title) {
      this.model.title = this.props_title
    }
    if (this.props_content) {
      this.model.content = this.props_content
    }
    if (this.props_id) {
      this.model.id = this.props_id
    }

    if (this.props_content) {
      return this.$refs.UEditor.setUEContent(this.props_content)
    }

  },
  render (h) {
    return h('div', {}, [
      this.render_title(h),
      this.render_editor(h),
      this.render_footer(h)
    ])
  }
}
