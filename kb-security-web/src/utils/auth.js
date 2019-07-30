import Cookies from 'js-cookie'

const TokenKey = 'Batme-Authorization'

export function getToken() {
    // return sessionStorage.getItem(TokenKey)
  return Cookies.get(TokenKey)
}

export function setToken(token) {
    // return sessionStorage.setItem(TokenKey,token)
  return Cookies.set(TokenKey, token, { expires: 1 })
}

export function removeToken() {
    // return sessionStorage.removeItem(TokenKey)
  return Cookies.remove(TokenKey)
}
