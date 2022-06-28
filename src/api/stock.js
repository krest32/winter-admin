import request from '@/utils/request'

export default {

    // //////////////////////////////////////////////catelog管理 -start /////////////////////////////////////////////////////////
    // 获取所有的分类
    queryPageStock(page, limit, queryStock) {
        return request({
            url: `/product/stock/queryPageStock/${page}/${limit}`,
            method: 'post',
            data: queryStock
        })
    },

    flushStock() {
        return request({
            url: `/product/stock/flushStock`,
            method: 'get',
        })
    },

    getStockById(id) {
        return request({
            url: `/product/stock/getStockById/${id}`,
            method: 'get',
        })
    },

    updateStock(stock) {
        return request({
            url: `/product/stock/updateStock`,
            method: 'post',
            data: stock
        })
    },

    getStockByProductId(id) {
        return request({
            url: `/product/stock/getStockByProductId/${id}`,
            method: 'get',
        })
    }
}