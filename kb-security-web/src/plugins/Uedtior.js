import '../../static/ueditor/ueditor.config.js'
import '../../static/ueditor/ueditor.all.js'
import '../../static/ueditor/lang/zh-cn/zh-cn.js'
import '../../static/ueditor/jquery-2.2.3.min.js'

export default {
  name: 'UEditor',
  data: () => ({
    editor: null
  }),
  props: {
    id: {
      type: String
    },
    config: {
      type: Object
    },
    content: {
      type: String,
      default: '0000000'
    }
  },
  mounted () {
    //初始化UE
    this.editor = UE.delEditor('editor')
    this.editor = UE.getEditor('editor', this.config)
    // this.setUEContent()
  },
  destoryed () {
    this.editor.destory()
  },
  methods: {
    getUEContent () {
      return this.editor.getContent()
    },
    setUEContent (data) {
      let vm = this
      this.editor.addListener('ready', function () {
        // editor准备好之后才可以使用
        vm.editor.setContent(data)
      })
    },
    getContentTxt () {
      return this.editor.getContentTxt()
    }
  },
  render (h) {
    return h('div', {}, [
      h('script', {
        attrs: {
          id: 'editor',
          type: 'text/plain'
        }
      })
    ])
  }
}
