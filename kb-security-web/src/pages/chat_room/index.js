import ChatEditor from './comp_chat_editor'
import ChatCatalog from './comp_chat_catalog'

export default {
  name: 'chat_room_index',
  data: () => ({}),
  methods: {
    render_left (h) {
      return h('div', {staticClass: 'col-12'}, [
        h(ChatEditor, {
          ref: 'ChatEditor',
          on: {
            refresh: (v) => this.$nextTick(this.refresh_catalog)
          }
        }),
        h(ChatCatalog, {
          ref: 'ChatCatalog'
        }),
      ])

    },
    refresh_catalog () {
      this.$refs.ChatCatalog.refresh_catalog()
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'row col-12 q-ma-md'
    }, [
      this.render_left(h),
    ])
  }

}
