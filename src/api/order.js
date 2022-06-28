import request from '@/utils/request'

export default {

    // //////////////////////////////////////////////幻灯片管理 -start /////////////////////////////////////////////////////////
    // 获取视频订单List
    listVedioOrder(page, limit, queryVedioOrder) {
        return request({
            url: `/member/order-vedio/listVideoOrder/${page}/${limit}`,
            method: 'post',
            data: queryVedioOrder
        })
    },

    listProductOrder(page, limit, queryProductOrder) {
        return request({
            url: `/others/product-order/listOrderList/${page}/${limit}`,
            method: 'post',
            data: queryProductOrder
        })
    },

}
