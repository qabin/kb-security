import {axiosInstance} from '../../plugins/axios'

export function ajax_add_blog (form) {

  return axiosInstance({
    url: '/api/blog',
    method: 'post',
    data: form
  })
}

export function ajax_get_blog_list () {
  return axiosInstance({
    url: '/api/blogs',
    method: 'get',
  })
}

export function ajax_update_blog (form) {

  return axiosInstance({
    url: '/api/blog',
    method: 'patch',
    data: form
  })
}
