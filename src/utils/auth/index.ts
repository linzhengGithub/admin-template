import Cookies from 'js-cookie'

const TokenKey = 'basic_token'

export function getTokenToCookie() {
  return Cookies.get(TokenKey)
}

export function setTokenToCookie(token: string) {
  return Cookies.set(TokenKey, token)
}

export function removeCookieToken() {
  return Cookies.remove(TokenKey)
}
