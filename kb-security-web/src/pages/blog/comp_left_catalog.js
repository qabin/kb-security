import {ajax_get_blog_list} from '../../api/blog/blog_info_api'
import {Optional} from '../../utils/Optional'
import {show_modal_blog_create, show_modal_blog_update} from './modal_blog_all'

export default {
  name: 'compLeftCatalog',
  data: () => ({
    blogList: [],
    blog: null,
  }),
  methods: {
    render_list_header (h) {
      return h('div', {
        staticClass: 'row items-center q-ml-md text-weight-bold'
      }, [
        h('div', {
          style:{
            minHeight:'44px',
            lineHeight:'44px',
            verticalAlign:'middle',
            display:'inline-block'
          }
        }, ['攻略列表']),
        this.$store.state.user.type === 2 ? h('q-btn', {
          staticClass: 'q-ml-sm',
          props: {
            icon: 'add',
            flat: true,
            color: 'primary',
            round: true
          },
          nativeOn: {
            click: () => show_modal_blog_create()
          }
        }) : null
      ])
    },

    render_no_item (h) {
      return h('tr', {
        style: {}
      }, [
        h('td', {
          staticClass: 'text-left',
          'class': {},
        }, [
          h('div', {
            staticClass: 'q-ma-md',
            style: {
              fontWeight: '700'
            },
          }, '无数据')
        ])])
    },
    refresh_catalog () {
      this.blogList = []
      ajax_get_blog_list().then(data => {
        this.blogList = this.blogList.concat(data.data || [])
        !this.blog && this.blogList.length > 0 && this.blog_select(this.blogList[0])
      })
    },
    blog_select (blog) {
      this.blog = blog
      this.$emit('select', blog)
    },
    render_table_row (h, data) {
      return h('tr', {
        style: {}
      }, [
        h('td', {
          staticClass: 'text-left row',
          'class': {
            'pp-selected-bg-high': this.blog && this.blog.id === data.id,
          },
          on: {
            click: () => this.blog_select(data)
          }
        }, [
          h('div', {
            staticClass: 'q-ma-md',
            style: {
              fontWeight: '700'
            },
          }, Optional.ofNullable(data.title).orElse('--')),
          this.$store.state.user.type === 2 ? h('q-btn', {
            staticClass: 'q-mt-sm',
            props: {
              icon: 'edit',
              flat: true,
              round: true,
              size: '12px'
            },
            on: {
              click: () => show_modal_blog_update(data)
            }
          }) : null
        ])])
    },
    render_table_body (h) {
      return h('tbody', {
        staticClass: 'text-tertiary',

      }, [this.blogList && this.blogList.length > 0 ? this.blogList.map(data => [
        this.render_table_row(h, data)]) : this.render_no_item(h)])
    },
    render_xss_list_table (h) {
      return h('table', {
        staticClass: 'q-table q-table-horizontal-separator no-shadow'
      }, [
        this.render_table_body(h),
      ])
    },

  },
  render (h) {
    return h('div', {
      staticClass: ''
    }, [
      this.render_list_header(h),
      this.blogList && this.blogList.length > 0 ?
        this.render_xss_list_table(h) : this.render_no_item(h)
    ])
  },
  mounted () {
    this.refresh_catalog()
  }
}
