import request from '@/plugins/axios'
interface common extends Promise<any> {
}
export function showTargetList(query: any): common {
  return request({
    url: '/move/device/showTargetList',
    method: 'get',
    params: query
  })
}

export function getRemoteControl(query: any): common {
  return request({
    url: '/cloud/cloudResource/getRemoteControl',
    method: 'get',
    params: query
  })
}
export function getPlatformStragety(query: any): common {
  return request({
    url: '/cloud/cloudPlatform/getPlatformStragety',
    method: 'get',
    params: query
  })
}

export function getVncConfigByUuid(query: any): common {
  return request({
    url: '/move/device/getVncConfigByUuid',
    method: 'get',
    params: query
  })
}