import LazyInput from '../../components/catalog/ComponentLazyInput'
import {ajax_chat_info_list_search, ajax_chat_praise,ajax_delete_chat_info} from '../../api/chat/chat_info_api'
import XssCompChatDetail from './xss_comp_chat_detail'
import {chat_order_by_enum} from '../../dictionary/chat_dictionary'
import {show_chat_info_detail_modal} from './modal_chat_info_detail'

const color_arr = ['#31ccec', '#f2c037', '#db2828', '#1976d2', '#9e9e9e', '#ec8b8b', '#027be3']

export default {
  name: 'comp_chat_filter',
  data: () => ({
    search_key: '',
    order_by_type: 1,
    pageNum: 1,
    chat_list: [],
    xss_escape: false,
  }),
  methods: {
    render_search (h) {
      return h('div', {
        staticClass: 'q-mb-sm'
      }, [
        h(LazyInput, {
          props: {
            value: this.search_key,
            placeholder: '按标题搜索',
            width: 245
          },
          on: {
            input: v => {
              this.search_key = v
              this.$nextTick(this.refresh_catalog)
            }
          }
        })
      ])
    },
    render_order_btn (h, data) {
      return h('div', {
        staticClass: 'q-ml-md',
        style: {
          marginTop: '5px'
        }
      }, [
        h('q-btn', {
          staticClass: 'no-shadow',
          props: {
            label: data.label,
            color: 'deep-orange-1',
            textColor: this.order_by_type === data.type ? 'deep-orange' : data.color,
            flat: this.order_by_type === data.type ? false : true,
          },
          nativeOn: {
            click: () => {
              this.order_by_type = data.type
              this.refresh_catalog()
            }
          }
        },)
      ])
    },
    render_chat_item (h, data) {
      return h('div', {
        staticClass: 'q-mt-sm q-pb-xl',
        style: {
          border: '1px solid var(--q-color-grey-3)'

        }
      }, [
        h('div', {
          staticClass: 'text-weight-bold text-left font-14 nowrap ellipsis overflow-hidden text-primary cursor-pointer bg-grey-1 q-pa-md',
          on: {
            click: () => {
              this.$router.push({path: '/chat_room', query: {id: data.id, title: data.title}})
              show_chat_info_detail_modal(data.id, data.title)
            }
          }
        }, [data.title]),
        h('div', {
          staticClass: 'q-ml-md q-mr-md q-mt-sm text-left'
        }, [
          h(XssCompChatDetail, {
            ref: 'XssCompChatDetail',
            props: {
              model: data
            }
          })]),
        this.render_chat_item_footer(h, data)
      ])
    },
    render_chat_item_footer (h, data) {
      return h('div', {
        staticClass: 'row col-12 no-wrap float-right q-mr-md flex',
        style: {
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex'
        }
      }, [
        h('div', {
          style: {
            borderRadius: '50px',
            width: '25px',
            height: '25px',
            backgroundColor: color_arr[Math.floor(Math.random() * 7)],
            color: '#fff',
            fontSize: '13px',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex'
          },
        }, [
          h('div', {}, data.login_name.substring(0, 1))]),
        h('div', {
          staticClass: 'font-12 text-weight-bold q-ml-sm'
        }, data.login_name),
        h('div', {
          staticClass: 'font-12 text-weight-bold q-ml-sm'
        }, data.create_time),
        h('q-icon', {
          staticClass: 'q-ml-md pp-icon-hover cursor-pointer',
          props: {
            name: 'thumb_up',
            size: '16px'
          },
          style: 'outline',
          nativeOn: {
            click: (v) => {
              if (this.$store.state.user.login_name) {
                ajax_chat_praise(data.id).then(d => {
                  if (d.status === 1) {
                    this.refresh_catalog()
                  }
                }).catch()
              } else {
                this.$router.push({path: '/login'})
              }
            }
          }
        }),
        h('div', {
          staticClass: 'font-12 text-weight-bold q-ml-sm'
        }, data.praise_count),
        h('q-icon', {
          staticClass: 'q-ml-md pp-icon-hover cursor-pointer',
          props: {
            name: 'delete',
            size: '16px'
          },
          style: 'outline',
          nativeOn: {
            click: (v) => {
              if (this.$store.state.user.login_name) {
                ajax_delete_chat_info(data.id).then(d => {
                  if (d.status === 1) {
                    this.refresh_catalog()
                  }
                }).catch()
              } else {
                this.$router.push({path: '/login'})
              }
            }
          }
        }),

      ])
    },
    refresh_catalog () {
      ajax_chat_info_list_search(this.search_key, this.pageNum, this.order_by_type).then(data => {
        if (data.status === 1) {
          this.chat_list = data.data.dataList
        } else {

        }
      })
    },
  }
  ,
  mounted () {
    this.refresh_catalog()
    try {
      if (this.$route.query.id != 'undefined' && this.$route.query.id > 0) {
        show_chat_info_detail_modal(this.$route.query.id, this.$route.query.title)
      }
    } catch (e) {
    }
  },
  render (h) {
    return h('div', {}, [
      h('div', {
        staticClass: 'row col-12 flex q-pt-md'
      }, [
        this.render_search(h),
        h('div', {
          staticClass: 'row q-ml-md',
        }, [
          Object.keys(chat_order_by_enum).map(key => [
            this.render_order_btn(h, chat_order_by_enum[key])
          ])]),
      ]),
      h('div', {}, [
        this.chat_list.map(chat => [
          this.render_chat_item(h, chat),
        ])
      ])
    ])
  }
}


