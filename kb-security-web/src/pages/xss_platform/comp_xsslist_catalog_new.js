import CatalogMixin from '../../components/catalog/MixinExpandableCatalogBase'
import {Optional} from '../../utils/Optional'
import LazyInput from '../../components/catalog/ComponentLazyInput'
import {ajax_xss_info_list_search, ajax_xss_info_upadte_command} from '../../api/xss/xss_info_api'
import {xss_type_enum} from '../../dictionary/xss_dictionary'

export default {
  name: 'comp_xss_catalog',
  mixins: [CatalogMixin],
  data: () => ({
    search_key: '',
    xss_type: 0,
    dataList: [],
    dataCount: 0,
    command_request_mode: {},
  }),
  computed: {
    footer_can_turn_left () {
      return this.page <= 1 ? false : true
    },
    footer_can_turn_right () {
      return this.page * this.rowsPerPage > this.dataCount ? false : true
    }
  },
  methods: {
    render_search (h) {
      return h('div', {
        staticClass: 'q-mb-sm'
      }, [
        h(LazyInput, {
          props: {
            value: this.search_key,
            placeholder: '按域名搜索',
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
    render_type_btn (h, data) {
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
            textColor: this.xss_type === data.type ? 'deep-orange' : data.color,
            flat: this.xss_type === data.type ? false : true,
          },
          nativeOn: {
            click: () => {
              this.xss_type = data.type
              this.refresh_catalog()
            }
          }
        },)
      ])
    },
    render_table_header (h) {
      return h('thead', [
        h('tr', [
          // h('th', {staticClass: 'text-left',}, 'ID'),
          h('th', {staticClass: 'text-left'}, '域名'),
          h('th', {staticClass: 'text-left'}, '攻击类型'),
          h('th', {staticClass: 'text-left'}, '地址'),
          h('th', {staticClass: 'text-left'}, 'Cookie'),
          h('th', {staticClass: 'text-left',}, '站点截图'),
          h('th', {staticClass: 'text-left'}, '输入命令'),
          h('th', {staticClass: 'text-left'}, '创建时间'),
        ])
      ])
    },
    render_table_row (h, data) {
      return h('tr', {
        style: {
          height: '120px'
        }
      }, [
        // h('td', {staticClass: 'text-left'}, [
        //   h('div', {
        //     style: {
        //       fontWeight: '700'
        //     }
        //   }, data.id)]),
        h('td', {staticClass: 'text-left'}, [
          h('div', {
            style: {
              fontWeight: '700'
            }
          }, Optional.ofNullable(data.domain).orElse('--'))]),
        h('td', {staticClass: 'text-left'}, [
          h('div', {
            staticClass: xss_type_enum[data.type].color || 'text-tertiary',
            style: {
              fontWeight: '700'
            }
          }, Optional.ofNullable(xss_type_enum[data.type].label).orElse('--'))]),
        h('td', {staticClass: 'text-left'}, [
          h('div', {
            style: {
              fontWeight: '700',
              width: '200px',
              wordWrap: 'break-word',
              whiteSpace: 'normal'
            }
          }, Optional.ofNullable(data.url).orElse('--'))]),
        h('td', {staticClass: 'text-left'}, [
          h('div', {
            style: {
              width: '300px',
              fontWeight: '700',
              wordWrap: 'break-word',
              whiteSpace: 'normal'
            }
          }, Optional.ofNullable(decodeURIComponent(data.cookie)).orElse('--'))]),
        h('td', {staticClass: 'text-left'}, [
          data.img != null ? h('div', {
            staticClass: 'q-ma-sm',
            style: {
              width: '180px',
              height: '120px',
            },
            on: {
              click: () => this.showImgModal(data)
            }
          }, [h('img', {
            staticClass: 'cursor-pointer',
            style: {
              width: '100%',
              height: '100%'
            },
            attrs: {
              src: data.img
            }
          })]) : null]),
        h('td', {staticClass: 'text-left'}, [
          data.type === xss_type_enum['3'].type ?
            h('div', {
              staticClass: 'nowrap row ellipsis  pp-radius-1 pp-border-5',
              style: {
                width: '450px',
                height: '80px',
                marginTop: '20px',
                marginBottom: '20px',
                verticalAlign: 'middle',
                fontWeight: '700'
              }
            }, [
              h('div', {
                staticClass: 'col-10 q-ml-sm',
                width: '200px'
              }, [
                h('q-input', {
                  staticClass: 'text-dark shadow-0',
                  attrs: {
                    rows: 3
                  },
                  props: {
                    color: 'grey-1',
                    type: 'textarea',
                    maxHeight: 80,
                    value: data.command,
                    placeholder: '请输入要执行的命令',
                    hideUnderline: true
                  },
                  on: {
                    input: (v) => this.command_request_mode[data.id] = v,
                  }
                })
              ]),
              h('div', {
                style: {
                  float: 'right'
                }
              }, [h('q-btn', {
                staticClass: '',
                style: {
                  marginTop: '40px',
                },
                props: {
                  color: 'primary',
                  flat: true,
                  icon: 'send',
                },
                nativeOn: {
                  click: () => {
                    ajax_xss_info_upadte_command(data.id, this.command_request_mode[data.id])
                      .then(d => {
                        if (d.status === 1) {
                          this.$q.notify({type: 'positive', message: '更新命令成功！'})
                        }
                      })
                      .catch(() => this.$q.err('更新命令异常!'))
                  }
                }
              })])
            ]) : null
        ]),
        h('td', {staticClass: 'text-left'}, [
          h('div', {
            style: {
              fontWeight: '700'
            }
          }, Optional.ofNullable(data.create_time).orElse('--'))]),
      ])
    },
    render_table_body (h) {
      // 参数属性添加：
      this.dataList.map(data => {
        this.command_request_mode[data.id] = data.command
      })

      return h('tbody', {
        staticClass: 'text-tertiary',

      }, [this.dataList.map(data => [
          this.render_table_row(h, data)
        ]
      )])
    },
    render_table_footer (h) {
      return h('div', {
        staticClass: 'q-table-bottom nowrap row items-center justify-end',
        style: {
          width: '100%'
        }
      }, [
        h('div', {
          staticClass: ''
        }, []),
        h('div', {
          staticClass: 'q-table-control',
        }, [h('span', {staticClass: 'q-table-bottom-item'}, [
          ((this.page - 1) * this.rowsPerPage > this.dataCount ? this.dataCount : (this.page - 1) * this.rowsPerPage) + '-' + ((this.page) * this.rowsPerPage > this.dataCount ? this.dataCount : (this.page) * this.rowsPerPage) + ' of ' + this.dataCount
        ]),
          h('q-btn', {
            props: {
              icon: 'chevron_left',
              flat: true,
              color: 'primary',
              round: true,
              size: 'md',
              disable: !this.footer_can_turn_left
            },
            on: {
              click: () => {
                this.pagination_ctl.page -= 1
                this.refresh_catalog()
              }
            }
          }),
          h('q-btn', {
            props: {
              icon: 'chevron_right',
              flat: true,
              color: 'primary',
              round: true,
              size: 'md',
              disable: !this.footer_can_turn_right
            },
            on: {
              click: () => {
                this.pagination_ctl.page += 1
                this.refresh_catalog()
              }
            }
          })
        ])
      ])
    },
    render_xss_list_table (h) {
      return h('table', {
        staticClass: 'q-table q-table-horizontal-separator no-shadow'
      }, [
        this.render_table_header(h),
        this.render_table_body(h),
      ])
    },

    request () {
      this.refresh_catalog()
    }
    ,
    refresh_catalog () {
      ajax_xss_info_list_search(this.search_key, this.page, this.xss_type)
        .then(d => {
          this.dataList = d.data.dataList || []
          this.dataCount = d.data.count || 0
        })
        .catch(() => this.$q.err('获取XSS列表异常'))
    },
    showImgModal (data) {
      this.$q.ppDialogBase(
        h => h('div', {
            staticClass: 'bg-grey-3 relative-position pp-radius-1',
            style: {padding: '4px 4px 2px 4px'}
          }, [
            h('img', {
              staticClass: 'pp-radius-1 pp-border-5',
              style: {
                height: 'auto',
                width: 'auto',
                maxHeight: '90vh',
                maxWidth: '90vw'
              },
              attrs: {
                src: data.img
              }
            }),
            h('div', {
              staticClass: 'absolute flex justify-center absolute-bottom',
              style: {
                transform: 'translateY(85%)'
              }
            }, [
              // h('div', {
              //   staticClass: ' bg-dark text-white text-weight-bold font-14 q-pl-sm q-pr-sm pp-radius-5 flex no-wrap items-center',
              //   style: {lineHeight: '24px', border: '2px solid white'}
              // }, [
              //   h('div', {staticClass: 'q-mr-md', style: {whiteSpace: 'nowrap'}}, data.domain),
              //   h('div', {staticClass: 'q-mr-md', style: {whiteSpace: 'nowrap'}}, data.create_time),
              // ])
            ])
          ]
        ),
        {noBackdropDismiss: false, noEscDismiss: false}
      )
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
          Object.keys(xss_type_enum).map(key => [
            this.render_type_btn(h, xss_type_enum[key])
          ])]),
      ]),
      this.render_xss_list_table(h),
      this.render_table_footer(h)
    ])
  }
}
