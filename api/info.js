import request from '@/utils/request'

export function _getAtts(query) {
  return request({
    url: 'tp/info/atts',
    method: 'get',
    params: query
  })
}

export function _getAtt(id, query = {}) {
  return request({
    url: 'tp/info/att/' + id,
    method: 'get',
    params: query
  })
}

// export function _getAttsLive() {
//   let query = {
//     mode: 'live'
//   }
//   return request({
//     url: 'tp/info/atts',
//     method: 'get',
//     params: query
//   })
// }
