import {ajax_get_chat_info} from '../../api/chat/chat_info_api'
import Editor from '../../components/editor/Editor'
import {vm as Vue} from '../../main'
import {Optional} from '../../utils/Optional'
import XssCompChatDetail from'./xss_comp_chat_detail'
export function show_chat_info_detail_modal (id, title) {
  let content = ''
  ajax_get_chat_info(id).then(d => {
    let model={
      id:'chat_modal_'+id,
      content:title
    }
    if (d.status === 1) {
      content = d.data.content
      Vue.$q.ppDialogBase(
        h => h('div', {
            staticClass: 'relative-position pp-radius-1',
            style: {
              width: '80vw',
              maxHeight: '80vh'
            }
          }, [
            h(XssCompChatDetail, {
              staticClass: 'font-18 q-pa-md bg-grey-3' ,
              props: {
                model:model
              }
            }),
            h('div', {
              staticClass: 'q-ml-md q-mr-md'
            }, [h(Editor, {
              props: {
                desText: Optional.ofNullable(content).orElse('无聊天内容信息!'),
                readonly: true,
                toolBarHide: true,
                border: false,
              }
            })])
          ]
        ),
        {noBackdropDismiss: false, noEscDismiss: false}
      )
    }
  })

}


