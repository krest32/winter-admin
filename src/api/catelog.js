import request from '@/utils/request'
export default {
    // 条件查询获取bolg的分页列表
    GetALlCateLog() {
        return request({
            url: `/shop/w-catelog-sort/GetALlCateLog`,
            method: 'get'

        })
    },
    deleteCateLog(id) {
        return request({
            url: `/shop/w-catelog-sort/deleteCateLog/${id}`,
            method: 'delete'
        })
    },

    // 添加新的CateLog
    AddNewCateLog(cateLogInfo) {
        return request({
            url: `/shop/w-catelog-sort/AddNewCateLog`,
            method: 'post',
            data: cateLogInfo
        })
    },

    // 添加新的CateLog
    UpdateNewCateLog(cateLogInfo) {
        return request({
            url: `/shop/w-catelog-sort/UpdateNewCateLog`,
            method: 'post',
            data: cateLogInfo
        })
    },

    // 添加主分类
    AddNewMainCateLog(cateLogInfo) {
        return request({
            url: `/shop/w-catelog-sort/AddNewMainCateLog`,
            method: 'post',
            data: cateLogInfo
        })
    },

    // 得到品牌列表
    ListAllBrand() {
        return request({
            url: `/shop/w-brand-description/ListAllBrand`,
            method: 'get'
        })
    },

    // 删除品牌
    DeleteBrandById(id) {
        return request({
            url: `/shop/w-brand-description/DeleteBrandById/${id}`,
            method: 'delete'
        })
    },

    // 添加新的品牌信息
    AddNewBrand(brandInfo) {
        return request({
            url: `/shop/w-brand-description/AddNewBrand`,
            method: 'post',
            data: brandInfo
        })
    },

    // 得到所有一级分类
    ListCateLogOne() {
        return request({
            url: `/shop/w-catelog-sort/ListCateLogOne`,
            method: 'get'
        })
    },

    // 得到所有二级分类
    ListCateLogTwo(id) {
        return request({
            url: `/shop/w-catelog-sort/ListCateLogTwo/${id}`,
            method: 'get'
        })
    },

    // 得到所有三级分类
    ListCateLogThree(id) {
        return request({
            url: `/shop/w-catelog-sort/ListCateLogThree/${id}`,
            method: 'get'
        })
    },
    // 得到Brand纤细信息
    GetBrandById(id) {
        return request({
            url: `/shop/w-brand-description/GetBrandById/${id}`,
            method: 'get'
        })
    },

    // 更新品牌信息
    updateBrand(brandInfo) {
        return request({
            url: `/shop/w-brand-description/updateBrand`,
            method: 'post',
            data: brandInfo
        })
    },

    // 得到对应节点的属性信息
    getAttrBySortId(sortId) {
        return request({
            url: `/shop/w-attr-discription/getAttrBySortId/${sortId}`,
            method: 'get'

        })
    },

    // 根据Id得到分类属性组列表
    GetAttrGroupById(sortId) {
        return request({
            url: `/shop/w-catelog-attrgroup/GetAttrGroupById/${sortId}`,
            method: 'get'

        })
    },

    // 根据Id删除分组属性
    deleteAttrs(id) {
        return request({
            url: `/shop/w-catelog-attrgroup/deleteAttrs/${id}`,
            method: 'delete'
        })
    },

    // 添加新的属性分组
    addNewAttrGroup(AttrGroup) {
        return request({
            url: `/shop/w-catelog-attrgroup/addNewAttrGroup`,
            method: 'post',
            data: AttrGroup
        })
    },

    // 修改属性分组
    // 添加新的属性分组
    updateNewAttrGroup(AttrGroup) {
        return request({
            url: `/shop/w-catelog-attrgroup/updateNewAttrGroup`,
            method: 'post',
            data: AttrGroup
        })
    },

    getAttrGroup(id) {
        return request({
            url: `/shop/w-catelog-attrgroup/getAttrGroup/${id}`,
            method: 'get'
        })
    },

    // 根据id删除attr
    deleteAttrById(id) {
        return request({
            url: `/shop/w-attr-discription/deleteAttrById/${id}`,
            method: 'delete'
        })
    },

    // 添加新的Attr
    addNewAttr(attrInfo) {
        return request({
            url: `/shop/w-attr-discription/addNewAttr`,
            method: 'post',
            data: attrInfo
        })
    },

    // 修改已有的Attr
    updateAttr(attrInfo) {
        return request({
            url: `/shop/w-attr-discription/updateAttr`,
            method: 'post',
            data: attrInfo
        })
    },

    // 根据Id得到Attr
    getAttrById(id) {
        return request({
            url: `/shop/w-attr-discription/getAttrById/${id}`,
            method: 'get'
        })
    },

    // 得到sortId对应的BrandList

    getBrandBySortId(id) {
        return request({
            url: `/shop/w-brand-catelog/getBrandBySortId/${id}`,
            method: 'get'
        })
    },

    // 解除sortId与Brand之间的关联
    cancelRelation(SortId, BrandId) {
        return request({
            url: `/shop/w-brand-catelog/cancelRelation/${SortId}/${BrandId}`,
            method: 'get'
        })
    },

    // 添加sort与Brand的关联信息
    addNewRelation(SaveBrandSortvo) {
        return request({
            url: `/shop/w-brand-catelog/addNewRelation`,
            method: 'post',
            data: SaveBrandSortvo
        })
    },
    // 显示所有的产品列表
    ListAllProduct(page, limit, queryPuoductVo) {
        return request({
            url: `/shop/w-product/ListAllProduct/${page}/${limit}`,
            method: 'post',
            data: queryPuoductVo
        })
    },

    // 根据Id删除商品信息
    deleteProduct(id) {
        return request({
            url: `/shop/w-product/deleteProduct/${id}`,
            method: 'delete'
        })
    },

    // 通过AttrGroupList获取Attr
    getAttrByProduct(productInfo) {
        return request({
            url: `/shop/w-attr-discription/getAttrByProduct`,
            method: 'post',
            data: productInfo
        })
    },

    // 添加新的product
    addNewProduct(productInfo) {
        return request({
            url: `/shop/w-product/addNewProduct`,
            method: 'post',
            data: productInfo
        })
    },

    // 根据Id改变商品的上架状态
    changeProductStatus(id) {
        return request({
            url: `/shop/w-product/changeProductStatus/${id}`,
            method: 'get'
        })
    },

    // 根据Id得到商品的详细信息
    getProductInfo(id) {
        return request({
            url: `/shop/w-product/getProductInfo/${id}`,
            method: 'get'
        })
    },

    // 根据id跟新Product信息
    updateProductInfo(productInfo) {
        return request({
            url: `/shop/w-product/updateProductInfo`,
            method: 'post',
            data: productInfo
        })
    },

    // 当修改分类时，清空所有已经选择的商品信息
    changeProduceCateLog(productInfo) {
        return request({
            url: `/shop/w-product/changeProduceCateLog`,
            method: 'post',
            data: productInfo
        })
    },

    // 获得所库存列表
    ListStock() {
        return request({
            url: `/shop/w-stock/ListStock`,
            method: 'get'
        })
    },

    // 根据Id信息删除库存
    deleteStock(id) {
        return request({
            url: `/shop/w-stock/deleteStock/${id}`,
            method: 'delete'
        })
    },

    // 添加新的库存信息
    addNewStock(stockInfo) {
        return request({
            url: `/shop/w-stock/addNewStock`,
            method: 'post',
            data: stockInfo
        })
    },

    // 所有产品列表
    Producelist() {
        return request({
            url: `/shop/w-product/Producelist`,
            method: 'get'
        })
    },

    // 根据Id得到Stock信息
    getStockById(id) {
        return request({
            url: `/shop/w-stock/getStockById/${id}`,
            method: 'get'
        })
    },

    // 更新库存信息
    updateStock(stockInfo) {
        return request({
            url: `/shop/w-stock/updateStock`,
            method: 'post',
            data: stockInfo
        })
    },

    // 商品上架，并且保存数据到ES中
    GetEsProductInfo(id) {
        return request({
            url: `/shop/w-product/GetEsProductInfo/${id}`,
            method: 'get'
        })
    },

    // 商品上架功能
    saveProduct(esProduct) {
        return request({
            url: `/es/control/saveEsProduct`,
            method: 'post',
            data: esProduct
        })
    },

    // 商品下架功能
    deleteEsProduct(id) {
        return request({
            url: `/es/control/deleteEsProduct/${id}`,
            method: 'delete'
        })
    }
}
