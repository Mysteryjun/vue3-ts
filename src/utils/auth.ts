import Cookies from 'js-cookie'

const TokenKey = 'CS_Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token: string) {
  let seconds = 60 * 1000 * 30; //单位：ms -- 总 30分钟
  let expires = new Date(new Date().getTime() + seconds);

  return Cookies.set(TokenKey, token, { expires: expires })
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}
