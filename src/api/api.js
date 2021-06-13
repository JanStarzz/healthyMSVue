import request from '../request/request'

export function saveMapData (maps) {
  return request({
    url:'/map/maps',
    method:'post',
    data:{
      maps
    }
  })
}


export function getRiskArea(status){
  return request({
    url:'/area/area/'+status,
    method:'get'
  })
}

export function setRiskArea(status,code){
  return request({
    url:'/area/area',
    method: 'put',
    data:{
      status,code
    }
  })
}
