import {axiosInstance} from '../../plugins/axios'

export function ajax_add_chat_info (form) {
  return axiosInstance({
    url: '/api/chatinfos',
    method: 'post',
    data: form
  })

}

export function ajax_chat_info_list_search (key, pageNum, type, openSqlHack) {
  let form = {
    searchKey: key,
    pageNum: pageNum,
    type: type,
    openSqlHack: openSqlHack,
    login_name: ''
  }
  return axiosInstance({
    url: '/api/chatinfos/search',
    method: 'get',
    params: form
  })
}

export function ajax_chat_praise (id) {
  let form = {
    id: id,
  }
  return axiosInstance({
    url: '/api/chat/praise',
    method: 'get',
    params: form
  })
}

export function ajax_get_chat_info (id) {

  return axiosInstance({
    url: '/api/chatinfos/' + id,
    method: 'get',
  })
}

export function ajax_delete_chat_info (id) {

  return axiosInstance({
    url: '/api/chatinfos/' + id,
    method: 'delete',
  })
}
