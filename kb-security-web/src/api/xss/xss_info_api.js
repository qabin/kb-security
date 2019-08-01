import {axiosInstance} from '../../plugins/axios'

export function ajax_xss_info_list_search(searchKey, pageNum, type) {
  let form = {
    searchKey: searchKey,
    pageNum: pageNum,
    type: type
  }
  return axiosInstance({
    url: '/api/xssinfos/search',
    method: 'get',
    params: form
  })

}

export function ajax_xss_info_upadte_command(id, command) {
  let form = {
    command: command
  }
  return axiosInstance({
    url: '/api/xssinfos/' + id,
    method: 'patch',
    data: form
  })
}

export function ajax_xss_info_delete(id) {
  return axiosInstance({
    url: '/api/xssinfos/' + id,
    method: 'delete',
  })
}
