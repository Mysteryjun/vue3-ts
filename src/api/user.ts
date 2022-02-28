import request from '@/plugins/axios'

interface userInfo extends Promise<any> {
  currentUserPower?: Array<string>;
  CurrentUser?: object;
}
interface prefix extends Promise<any> {
  prefix?: string
}
interface common extends Promise<any> {
}
export function getWs_prefix(): prefix {
  return request({
    url: '/cloud/cloudResource/getWebSocketAddressPrefix',
    method: 'get'
  })
}

export function login(data: any): common {
  return request({
    url: '/admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo(): userInfo {
  return request({
    url: '/admin/user/getCurrentUserInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/admin/user/logOut',
    method: 'get'
  })
}

export function updateUserFav(data: any) {
  return request({
    url: '/config/home/updateUserFav',
    method: 'post',
    data
  })
}

export function messageList(query: any) {
  return request({
    url: '/config/home/userMsg',
    method: 'get',
    params: query
  })
}
export function modifyPass(data: any) {
  return request({
    url: '/config/userConfig/updateUserPwd',
    method: 'post',
    data
  })
}

export function changeFav(query: any): common {
  return request({
    url: '/config/home/updateUserFav',
    method: 'get',
    params: query
  })
}