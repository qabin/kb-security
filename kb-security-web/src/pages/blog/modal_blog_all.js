import CompBlogEditor from './comp_blog_editor'
import {vm as Vue} from '../../main'

export function show_modal_blog_create () {
  Vue.$q.ppDialogBase(
    h => h('div', {
        staticClass: 'bg-grey-3 relative-position pp-radius-1',
        style: {padding: '4px 4px 2px 4px'},
        on: {
          refresh: () => this.$emit('refresh')
        }
      }, [
        h(CompBlogEditor)
      ]
    ),
    {noBackdropDismiss: false, noEscDismiss: false}
  )
}

export function show_modal_blog_update (data) {
  Vue.$q.ppDialogBase(
    h => h('div', {
        staticClass: 'bg-grey-3 relative-position pp-radius-1',
        style: {padding: '4px 4px 2px 4px'}
      }, [
        h(CompBlogEditor, {
          ref: 'CompBlogEditor',
          props: {
            props_title: data.title,
            props_content: data.content,
            props_id: data.id
          },
          on: {
            refresh: () => Vue.$emit('refresh')
          }
        })
      ]
    ),
    {noBackdropDismiss: false, noEscDismiss: false}
  )
}
