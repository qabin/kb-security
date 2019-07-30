// import CatalogMixin from '../../components/catalog/MixinExpandableCatalogBase'
// import {Optional} from '../../utils/Optional'
// import LazyInput from '../../components/catalog/ComponentLazyInput'
// import {ajax_xss_info_list_search} from '../../api/xss/xss_info_api'
// import {xss_type_enum} from '../../dictionary/xss_dictionary'
// import $ from 'jquery'
//
// export default {
//   name: 'comp_xss_catalog',
//   mixins: [CatalogMixin],
//   data: () => ({
//     table_class: 'flex items-center ',
//     search_key: '',
//     img_props: {id: 1},
//     xss_type: 0,
//     extend_bg: 'grey-1',
//     contentStyle: {backgroundColor: '#e3f2fd!important', fontSize: '18px', textAlign: 'left'},
//     table_columns: [
//       {
//         name: 'id',
//         align: 'left',
//         field: 'id',
//         label: 'ID',
//         renderData: {
//           style: {
//             fontWeight: '700',
//           }
//         },
//         render: (h, value, props) => Optional.ofNullable(value).orElse('--')
//
//       },
//       {
//         name: 'img',
//         align: 'left',
//         field: 'img',
//         label: '站点截图',
//         renderData: {
//           staticClass: 'text-primary nowrap ellipsis overflow-hidden cursor-pointer ',
//           style: {
//             width: '180px',
//           }
//         },
//         render: (h, value, props) => {
//           return h('div', {
//             style: {
//               width: '180px',
//               height: '120px'
//             },
//             on: {
//               click: () => props.expand = !props.expand
//             }
//           }, [h('img', {
//             style: {
//               width: 'auto',
//               height: 'auto',
//               maxWidth: '100%',
//               maxHeight: '100%'
//             },
//             domProps: {
//               src: value
//             },
//           })])
//         }
//       },
//       {
//         name: 'domain',
//         align: 'left',
//         field: 'domain',
//         label: '域名',
//         renderData: {
//           staticClass: 'nowrap ellipsis overflow-hidden',
//           style: {
//             maxWidth: '600px',
//             fontWeight: '700',
//           }
//         },
//         render: (h, value, props) => Optional.ofNullable(value).orElse('--')
//
//       },
//       {
//         name: 'url',
//         align: 'left',
//         field: 'url',
//         label: '地址',
//         renderData: {
//           staticClass: 'text-tertiary',
//           style: {
//             minWidth: '100px', fontWeight: '700'
//           }
//         },
//         render: (h, value, props) => Optional.ofNullable(value).orElse('--')
//       },
//       {
//         name: 'type',
//         align: 'left',
//         field: 'type',
//         label: '攻击类型',
//         renderData: {
//           staticClass: 'text-tertiary',
//           style: {
//             minWidth: '100px', fontWeight: '700'
//           }
//         },
//         render: (h, value, props) => Optional.ofNullable(xss_type_enum[value].label).orElse('--')
//       },
//       {
//         name: 'cookie',
//         align: 'left',
//         field: 'cookie',
//         label: 'Cookie',
//         renderData: {
//           staticClass: 'text-tertiary',
//           style: {
//             minWidth: '100px', fontWeight: '700'
//           }
//         },
//         render: (h, value, props) => Optional.ofNullable(value).orElse('--')
//       },
//       {
//         name: 'command',
//         align: 'left',
//         field: 'command',
//         label: '输入命令',
//         renderData: {
//           staticClass: 'text-tertiary',
//           style: {
//             minWidth: '100px', fontWeight: '700'
//           }
//         },
//         render: (h, value, props) => {
//           let model={
//             value:"33333"
//           }
//           return h('div', {
//             staticClass: 'pp-radius-1 pp-border-5'
//           }, [
//             h('q-input', {
//               staticClass: 'text-dark shadow-0',
//               props:{
//                 color: 'grey-1',
//                 type: 'textarea',
//                 inverted: true,
//                 maxHeight: '300',
//                 placeholder: '输入命令',
//                 value:model.value
//               },
//               on:{
//                 input:(v)=>{
//                   alert(model.value)
//                 }
//               }
//             }, [
//               h('q-btn', {
//                 staticClass: 'q-ma-sm',
//                 color: 'primary',
//                 flat: true,
//                 icon: 'send',
//                 disable: false,
//                 on: {
//                   click: (v) => {
//                     alert(1)
//                   }
//                 }
//               })
//             ])
//           ])
//         }
//       },
//       {
//         name: 'create_time',
//         align:
//           'left',
//         field:
//           'create_time',
//         label:
//           '创建时间',
//         renderData:
//           {
//             staticClass: 'text-tertiary', style:
//               {
//                 minWidth: '100px', fontWeight:
//                   '700'
//               }
//           }
//         ,
//         render: (h, value, props) => Optional.ofNullable(value).orElse('--')
//       }
//     ],
//   }),
//   methods: {
//     render_search (h) {
//       return h('div', {
//         staticClass: 'q-mb-sm'
//       }, [
//         h(LazyInput, {
//           props: {
//             value: this.search_key,
//             placeholder: '按域名搜索',
//             width: 245
//           },
//           on: {
//             input: v => {
//               this.search_key = v
//               this.$nextTick(this.refresh_catalog)
//             }
//           }
//         })
//       ])
//     }
//     ,
//     render_type_btn (h, data) {
//       return h('div', {
//         staticClass: 'q-ml-md',
//         style: {
//           marginTop: '5px'
//         }
//       }, [
//         h('q-btn', {
//           staticClass: 'no-shadow',
//           props: {
//             label: data.label,
//             color: 'deep-orange-1',
//             textColor: this.xss_type === data.type ? 'deep-orange' : data.color,
//             flat: this.xss_type === data.type ? false : true,
//           },
//           nativeOn: {
//             click: () => {
//               this.xss_type = data.type
//               this.refresh_catalog()
//             }
//           }
//         },)
//       ])
//     },
//     request () {
//       this.refresh_catalog()
//     }
//     ,
//     refresh_catalog () {
//       ajax_xss_info_list_search(this.search_key, this.page, this.xss_type)
//         .then(d => {
//           this.rows = d.data.dataList || []
//           this.rowsNumber = d.data.count
//         })
//         .catch(() => this.$q.err('获取XSS列表异常'))
//     },
//     render_table_expand (h, props) {
//
//       if (!props.row.img || props.row.img === 0) {
//         return h('span', {staticClass: 'text-faded q-pl-lg'}, '无聊截图信息！')
//       }
//       return h('img', {
//         style: {
//           width: '80vw',
//           height: '60vh'
//         },
//         attrs: {
//           src: props.row.img
//         }
//       })
//     }
//   }
//   ,
//   render (h) {
//     return h('div', {staticClass: 'q-ml-md q-mr-md'}, [
//       h('div', {staticClass: 'row col-12 flex q-pt-md'}, [
//         this.render_search(h),
//         h('div', {
//           staticClass: 'row q-ml-md',
//         }, [
//           Object.keys(xss_type_enum).map(key => [
//             this.render_type_btn(h, xss_type_enum[key])
//           ])]),
//       ]),
//       h('q-table', {
//         staticClass: 'shadow-0 overflow-hidden' + this.table_class,
//         props: {
//           color: 'primary',
//           data: this.rows,
//           columns: this.table_columns,
//           rowKey: this.table_row_key,
//           pagination: this.pagination_ctl,
//           rowsPerPageOptions: [10],
//           rowsPerPageLabel: this.rowsPerPageLabel,
//           noDataLabel: this.noDataLabel,
//           hideBottom: !this.rowsNumber,
//         },
//         scopedSlots: this.__render_scope_slot(h),
//         on: {request: this.__request}
//       })
//     ])
//   }
// }
