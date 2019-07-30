import {axiosInstance} from '../../plugins/axios'

export function ajax_login_in (form) {

  return axiosInstance({
    url: '/api/login',
    method: 'post',
    data: form
  })
}

export function ajax_get_user_info () {
  return axiosInstance({
    url: '/api/user/info',
    method: 'get',
  })
}

export function ajax_login_out () {
  return axiosInstance({
    url: '/api/logout',
    method: 'get',
  })
}

export function ajax_add_user_info (form) {
  return axiosInstance({
    url: '/api/register',
    method: 'post',
    data: form
  })
}
