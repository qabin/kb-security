import CatalogMixin from '../../components/catalog/MixinExpandableCatalogBase'
import {Optional} from '../../utils/Optional'
import {chat_order_by_enum} from '../../dictionary/chat_dictionary'
import LazyInput from '../../components/catalog/ComponentLazyInput'
import {ajax_chat_info_list_search} from '../../api/chat/chat_info_api'
import Editor from '../../components/editor/Editor'

export default {
  name: 'comp_chatlist_catalog',
  mixins: [CatalogMixin],
  data: () => ({
    table_class: 'flex items-center ',
    order_by_type: 1,
    search_key: '',
    sql_hack: false,
    contentStyle: {backgroundColor: '#e3f2fd!important', fontSize: '18px', textAlign: 'left'},
    table_columns: [
      {
        name: 'id',
        align: 'left',
        field: 'id',
        label: 'ID',
        renderData: {staticClass: 'text-tertiary ', style: {minWidth: '50px', fontWeight: '700'}}
      },
      {
        name: 'title',
        align: 'left',
        field: 'title',
        label: '标题',
        renderData: {
          staticClass: 'text-primary nowrap ellipsis overflow-hidden',
          style: {
            maxWidth: '600px',
            fontWeight: '700',
          }
        },
        render: (h, value, props) => {
          return h('div', {
            staticClass: 'cursor-pointer',
            on: {
              click: () => props.expand = !props.expand
            }
          }, Optional.ofNullable(value).orElse('--'))
        }

      },
      {
        name: 'praise_count',
        align:
          'left',
        field:
          'praise_count',
        label:
          '获赞数',
        renderData:
          {
            staticClass: 'text-tertiary', style:
              {
                minWidth: '100px', fontWeight:
                  '700'
              }
          }
        ,
        render: (h, value, props) => Optional.ofNullable(value).orElse('0')
      }
      ,
      {
        name: 'login_name',
        align:
          'left',
        field:
          'login_name',
        label:
          '创建人',
        renderData:
          {
            staticClass: 'text-tertiary', style:
              {
                minWidth: '100px', fontWeight:
                  '700'
              }
          }
        ,
        render: (h, value, props) => Optional.ofNullable(value).orElse('--')
      }
      ,
      {
        name: 'create_time',
        align:
          'left',
        field:
          'create_time',
        label:
          '创建时间',
        renderData:
          {
            staticClass: 'text-tertiary', style:
              {
                minWidth: '100px', fontWeight:
                  '700'
              }
          }
        ,
        render: (h, value, props) => Optional.ofNullable(value).orElse('--')
      },
    ],
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
    }
    ,
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
    render_sql_hack_btn (h) {
      return h('div', {
        staticClass: 'q-ml-md',
        style: {
          marginTop: '5px'
        }
      }, [
        h('q-btn', {
          staticClass: 'no-shadow',
          props: {
            label: this.sql_hack ? '关闭' : '开启',
            color: 'deep-orange-1',
            textColor: this.sql_hack ? 'deep-orange' : 'dark',
            flat: this.sql_hack ? false : true,
          },
          nativeOn: {
            click: () => {
              this.sql_hack = !this.sql_hack
            }
          }
        }, [h('q-tooltip', {
          staticClass: 'font-md q-pa-sm',
          props: {
            self: 'bottom left',
            anchor: 'top right',
            offset: [0, 0],
          },
        }, ['注入开关'])])
      ])
    }
    ,
    render_table_expand (h, props) {
      if (!props.row.content || props.row.content.length === 0) {
        return h('span', {staticClass: 'text-faded q-pl-lg'}, '无聊天内容信息！')
      }
      return h(Editor, {
        props: {
          editorStyle: this.editorStyle,
          contentStyle: this.contentStyle,
          desText: props.row.content,
          border: false,
          readonly: true,
          toolBarHide: true
        }
      })
    }
    ,
    request () {
      this.refresh_catalog()
    }
    ,
    refresh_catalog () {
      ajax_chat_info_list_search(this.search_key, this.page, this.order_by_type, this.sql_hack)
        .then(d => {
          this.rows = d.data.dataList || []
          this.rowsNumber = d.data.count
        })
        .catch(() => this.$q.err('获取聊天列表异常'))
    },
  }
  ,
  render (h) {
    return h('div', {staticClass: 'q-ml-md q-mr-md'}, [
      h('div', {staticClass: 'row col-12 flex q-pt-md'}, [
        this.render_search(h),
        h('div', {
          staticClass: 'row q-ml-md',
        }, [
          Object.keys(chat_order_by_enum).map(key => [
            this.render_order_btn(h, chat_order_by_enum[key])
          ])]),
        this.render_sql_hack_btn(h)
      ]),
      h('q-table', {
        staticClass: 'shadow-0 overflow-hidden' + this.table_class,
        props: {
          color: 'primary',
          data: this.rows,
          columns: this.table_columns,
          rowKey: this.table_row_key,
          pagination: this.pagination_ctl,
          rowsPerPageOptions: [10],
          rowsPerPageLabel: this.rowsPerPageLabel,
          noDataLabel: this.noDataLabel,
          hideBottom: !this.rowsNumber,
        },
        scopedSlots: this.__render_scope_slot(h),
        on: {request: this.__request}
      })
    ])
  }
}
