import request from '@/utils/request'

export default {

// //////////////////////////////////////////////幻灯片管理 -start /////////////////////////////////////////////////////////
  // 获取TagList
  listBanner() {
    return request({
      url: `/others/banner/listBanner`,
      method: 'get'
    })
  },

  // 添加新的banner
  addBanner(bannerInfo) {
    return request({
      url: `/others/banner/addBanner`,
      method: 'post',
      data: bannerInfo
    })
  },

  // 删除指定Banner
  deleteBanner(id) {
    return request({
      url: `/others/banner/deleteBanner/${id}`,
      method: 'delete'
    })
  },

  // 根据id得到对应的banner
  getBannerById(id) {
    return request({
      url: `/others/banner/getBannerById/${id}`,
      method: 'get'
    })
  },

  // 更新指定的banner
  updateBanner(bannerInfo) {
    return request({
      url: `/others/banner/updateBanner`,
      method: 'post',
      data: bannerInfo
    })
  }
// //////////////////////////////////////////////博客管理 -end//////////////////////////////////////////////////////////
}
