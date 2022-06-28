import request from '@/utils/request'

export default {

// //////////////////////////////////////////////标签管理 -start /////////////////////////////////////////////////////////
  // 获取TagList
  listCateLog() {
    return request({
      url: `/vedio/catelog/listCateLog`,
      method: 'get'
    })
  },

  // 添加新的CateLog
  addCateLog(catelogInfo) {
    return request({
      url: `/vedio/catelog/addCateLog`,
      method: 'post',
      data: catelogInfo
    })
  },

  // 根据id得到Catelog信息
  getCatelogById(id) {
    return request({
      url: `/vedio/catelog/getCatelogById/${id}`,
      method: 'get'
    })
  },

  // 更新catelog信息
  updateCatelog(catelogInfo) {
    return request({
      url: `/vedio/catelog/updateCatelog`,
      method: 'post',
      data: catelogInfo
    })
  },

  // 根据id删除Catelog
  deleteCatelog(id) {
    return request({
      url: `/vedio/catelog/deleteCatelog/${id}`,
      method: 'delete'
    })
  },
  // //////////////////////////////////////////////标签管理 -end /////////////////////////////////////////////////////////

  // //////////////////////////////////////////////专辑管理 -start /////////////////////////////////////////////////////////
  // 添加专辑
  addAlbum(albumInfo) {
    return request({
      url: `/vedio/album/addAlbum`,
      method: 'post',
      data: albumInfo
    })
  },

  // 条件查询album
  pageQueryAlbum(page, limit, queryAlbumVo) {
    return request({
      url: `/vedio/album/pageQueryAlbum/${page}/${limit}`,
      method: 'post',
      data: queryAlbumVo
    })
  },

  // 列出所有的album
  listAlbum() {
    return request({
      url: `/vedio/album/listAlbum`,
      method: 'get'
    })
  },

  // 删除album
  deleteAlbum(id) {
    return request({
      url: `/vedio/album/deleteAlbum/${id}`,
      method: 'delete'
    })
  },

  // 根据id得到album
  getAlbumById(id) {
    return request({
      url: `/vedio/album/getAlbumById/${id}`,
      method: 'get'
    })
  },

  // 更新album信息
  updateAlbumById(albumInfo) {
    return request({
      url: `/vedio/album/updateAlbumById`,
      method: 'post',
      data: albumInfo
    })
  },
  // //////////////////////////////////////////////专辑管理 -end /////////////////////////////////////////////////////////
  // //////////////////////////////////////////////视频管理 -start /////////////////////////////////////////////////////////

  // 获取所有的album
  querySearchVedio(page, limit, queryVedioVo) {
    return request({
      url: `/vedio/vedio/querySearchVedio/${page}/${limit}`,
      method: 'post',
      data: queryVedioVo
    })
  },
  addVedio(vedioInfo) {
    return request({
      url: `/vedio/vedio/addVedio`,
      method: 'post',
      data: vedioInfo
    })
  },

  // 删除视频文件
  removeVedioSourceId(id) {
    return request({
      url: `/others/Aliyun/removeVedioById/${id}`,
      method: 'delete'
    })
  },

  // 根据id得到视频信息
  getVedio(id) {
    return request({
      url: `/vedio/vedio/getVedio/${id}`,
      method: 'get'
    })
  },

  // 更新视频信息

  updateVedio(vedioInfo) {
    return request({
      url: `/vedio/vedio/updateVedio`,
      method: 'post',
      data: vedioInfo
    })
  },

  // 删除视频
  deleteVedio(id) {
    return request({
      url: `/vedio/vedio/deleteVedio/${id}`,
      method: 'delete'
    })
  }

  // //////////////////////////////////////////////视频管理 -end /////////////////////////////////////////////////////////

}
