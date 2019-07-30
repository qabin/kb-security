import FontColorCard from './componentFontsColorCard'
import PpField from '../elements/pp_field'

export default {
  name: 'Editor',
  data: () => ({
    fz: ['12', '13', '16', '18', '24', '32', '48'],
    fontLabel: '12',
    editorToolBar: [
      ['bold', 'fonts_color_btn',
        {
          label: this.fontLabel,
          fixedLabel: true,
          fixedIcon: true,
          list: 'no-icons',
          options: this.fontSizeTitles,
        }
      ],
      ['link'],
      ['left', 'center', 'right'],
      ['ordered', 'unordered'],
      ['undo', 'redo']
    ]
  }),
  props: {
    desText: '',
    toolBarHide: false,
    readonly: false,
    editorStyle: {},
    contentStyle: {},
    border: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '描述'
    }
  },
  mounted () {
    this.$q.i18n.label.update = '更新'
    this.$q.i18n.label.remove = '移除'
  },
  computed: {
    editFz () {
      let length = this.fz.length
      let fontSizeData = []
      for (let index = 0; index < length; index++) {
        fontSizeData['font' + this.fz[index]] = {
          cmd: 'fontSize',
          param: index + 1,
          tip: this.fz[index],
          label: this.fz[index],
          icon: this.fz[index],
          handler: () => {
            this.fontLabel = this.fz[index]
            document.execCommand('fontSize', false, index + 1)
          }
        }
      }

      return fontSizeData
    },

    fontSizeTitles () {
      return this.fz.map(f => `font${f}`)
    },
    description () {
      return this.desText
    }
  },
  methods: {
    init () {
      this.fontLabel = this.fz[0]
    },
    render_model_editor (h) {
      return h('div', {staticClass: 'editor-full-screen relative-position'},
        [
          h('q-editor', {
            class: !this.border ? 'no-border' : '',
            staticClass: 'pp-radius-3 describe-edit scroll',
            ref: 'editor',
            style: this.editorStyle,
            props: {
              value: this.description,
              placeholder: this.placeholder,
              readonly: this.readonly,
              toolbar: this.toolBarHide ? [] : this.editorToolBar,
              definitions: {
                bold: {label: null, tip: '加粗'},
                undo: {tip: '撤销'},
                redo: {tip: '前进'},
                left: {tip: '居左'},
                center: {tip: '居中'},
                right: {tip: '居右'},
                justify: {tip: '自动'},
                ordered: {tip: '有序列表'},
                unordered: {tip: '无序列表'},
                link: {tip: '超链接'},
                ...this.editFz
              },
              toolbarBg: 'white',
              contentStyle: this.contentStyle
            },
            on: {
              input: (v) => {
                this.$emit('input', v)
              },
            }
          }, [this.render_font_color(h)])
        ])
    },
    render_font_color (h) {
      return h('q-btn', {
          slot: 'fonts_color_btn',
        }, [h(PpField, {}, [
          h(FontColorCard, {
            on: {
              click: (v) => {
                document.execCommand('foreColor', false, v)
              }
            }
          })
        ])
        ]
      )
    },
  },
  render (h) {
    return this.render_model_editor(h)
  },
  activated () {
    this.init()
  }
}

