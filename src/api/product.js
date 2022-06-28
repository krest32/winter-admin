import request from '@/utils/request'

export default {

    // //////////////////////////////////////////////catelog管理 -start /////////////////////////////////////////////////////////
    // 获取所有的分类
    GetAllCateLog() {
        return request({
            url: `/product/catelog/GetALlCateLog`,
            method: 'get'
        })
    },

    // 根据Id删除catelog
    deleteCateLog(id) {
        return request({
            url: `/product/catelog/deleteCateLog/${id}`,
            method: 'delete'
        })
    },

    // 添加新的CateLog
    AddNewCateLog(cateLogInfo) {
        return request({
            url: `/product/catelog/AddNewCateLog`,
            method: 'post',
            data: cateLogInfo
        })
    },

    // 更新的CateLog
    UpdateNewCateLog(cateLogInfo) {
        return request({
            url: `/product/catelog/UpdateNewCateLog`,
            method: 'post',
            data: cateLogInfo
        })
    },

    // 根据id得到catelog
    GetCateLogByID(id) {
        return request({
            url: `/product/catelog/GetCateLogByID/${id}`,
            method: 'get',
        })
    },

    // 添加主分类
    AddNewMainCateLog(cateLogInfo) {
        return request({
            url: `/product/catelog/AddNewMainCateLog`,
            method: 'post',
            data: cateLogInfo
        })
    },
    // //////////////////////////////////////////////catelog管理 -end /////////////////////////////////////////////////////////
    // //////////////////////////////////////////////brand管理 -start /////////////////////////////////////////////////////////


    // 得到品牌列表
    ListAllBrand() {
        return request({
            url: `/product/brand/ListAllBrand`,
            method: 'get'
        })
    },

    // 删除品牌
    DeleteBrandById(id) {
        return request({
            url: `/product/brand/DeleteBrandById/${id}`,
            method: 'delete'
        })
    },

    // 添加新的品牌信息
    AddNewBrand(brandInfo) {
        return request({
            url: `/product/brand/AddNewBrand`,
            method: 'post',
            data: brandInfo
        })
    },

    // 通过id得到Brand信息
    GetBrandById(id) {
        return request({
            url: `/product/brand/getBrandById/${id}`,
            method: 'get'
        })
    },

    // 更新品牌信息
    updateBrand(brandInfo) {
        return request({
            url: `/product/brand/updateBrand`,
            method: 'post',
            data: brandInfo
        })
    },

    //条件查询brand
    pageQueryBrand(page, limit, queryBrandVo) {
        return request({
            url: `/product/brand/pageQueryBrand/${page}/${limit}`,
            method: 'post',
            data: queryBrandVo
        })
    },


    // //////////////////////////////////////////////brand管理 -end /////////////////////////////////////////////////////////
    // //////////////////////////////////////////////brandSort管理 -start /////////////////////////////////////////////////////////


    // 得到sortId对应的BrandList
    getBrandBySortId(id) {
        return request({
            url: `/product/brand-sort/getBrandBySortId/${id}`,
            method: 'get'
        })
    },

    // 添加sort与Brand的关联信息
    addNewRelation(SaveBrandSortvo) {
        return request({
            url: `/product/brand-sort/addNewRelation`,
            method: 'post',
            data: SaveBrandSortvo
        })
    },

    // 解除sortId与Brand之间的关联
    cancelRelation(SortId, BrandId) {
        return request({
            url: `/product/brand-sort/cancelRelation/${SortId}/${BrandId}`,
            method: 'get'
        })
    },
    // //////////////////////////////////////////////brandSort管理 -end /////////////////////////////////////////////////////////
    // //////////////////////////////////////////////属性分组管理 -start /////////////////////////////////////////////////////////
    // 根据sortId得到属性分组信息
    GetAttrGroupById(id) {
        return request({
            url: `/product/catelog-attrgroup/GetAttrGroupById/${id}`,
            method: 'get'
        })
    },


    // 添加新的属性分组
    addNewAttrGroup(AttrGroup) {
        return request({
            url: `/product/catelog-attrgroup/addNewAttrGroup`,
            method: 'post',
            data: AttrGroup
        })
    },


    // 根据Id删除分组属性
    deleteAttrGroup(id) {
        return request({
            url: `/product/catelog-attrgroup/deleteAttrGroup/${id}`,
            method: 'delete'
        })
    },

    // 根据id得到AttrGroupInfo
    getAttrGroupInfo(id) {
        return request({
            url: `/product/catelog-attrgroup/getAttrGroupInfo/${id}`,
            method: 'get'
        })
    },

    // 更新的属性分组
    updateNewAttrGroup(AttrGroup) {
        return request({
            url: `/product/catelog-attrgroup/updateNewAttrGroup`,
            method: 'post',
            data: AttrGroup
        })
    },

    // //////////////////////////////////////////////属性分组管理 -end /////////////////////////////////////////////////////////


    // //////////////////////////////////////////////属性信息管理 -start /////////////////////////////////////////////////////////


    // 根据Id得到Attr
    getAttrByGroupId(id) {
        return request({
            url: `/product/catelog-attr/getAttrByGroupId/${id}`,
            method: 'get'
        })
    },

    // 添加新的Attr
    addNewAttr(attrInfo) {
        return request({
            url: `/product/catelog-attr/addNewAttr`,
            method: 'post',
            data: attrInfo
        })
    },

    // 根据id删除attr
    deleteAttrById(id) {
        return request({
            url: `/product/catelog-attr/deleteAttrById/${id}`,
            method: 'delete'
        })
    },

    // 根据Id得到Attr
    getAttrById(id) {
        return request({
            url: `/product/catelog-attr/getAttrById/${id}`,
            method: 'get'
        })
    },

    // 修改已有的Attr
    updateAttr(attrInfo) {
        return request({
            url: `/product/catelog-attr/updateAttr`,
            method: 'post',
            data: attrInfo
        })
    },

    // //////////////////////////////////////////////属性信息管理 -end /////////////////////////////////////////////////////////

    // //////////////////////////////////////////////产品管理 -start /////////////////////////////////////////////////////////
    // 显示所有的产品列表
    ListAllProduct(page, limit, queryPuoductVo) {
        return request({
            url: `/product/product/pageQueryAllProduct/${page}/${limit}`,
            method: 'post',
            data: queryPuoductVo
        })
    },

    // 添加新商品
    addNewProduct(productInfo) {
        return request({
            url: `/product/product/addNewProduct`,
            method: 'post',
            data: productInfo
        })
    },

    // 根据id得到商品的详细信息
    getProductById(id) {
        return request({
            url: `/product/product/getProductById/${id}`,
            method: 'get',
        })
    },

    // 更新产品信息
    updateProduct(productInfo) {
        return request({
            url: `/product/product/updateProduct`,
            method: 'post',
            data: productInfo
        })
    },

    // 根据id删除商品信息
    deleteProductById(id) {
        return request({
            url: `/product/product/deleteProductById/${id}`,
            method: 'delete',
        })
    },

    // //////////////////////////////////////////////产品管理 -end /////////////////////////////////////////////////////////
    // //////////////////////////////////////////////产品管理 -end /////////////////////////////////////////////////////////
    addAttrForProduct(productInfo) {
        return request({
            url: `/product/attr/addAttrForProduct`,
            method: 'post',
            data: productInfo
        })
    },

    deleteProductAttr(id) {
        return request({
            url: `/product/attr/deleteProductAttr/${id}`,
            method: 'delete',
        })
    },

    // 商品上架功能
    changeProductStatus(id) {
        return request({
            url: `/product/product/changeProductStatus/${id}`,
            method: 'get',
        })
    },

    // 根据id得到商品的上架信息
    GetEsProductInfo(id) {
        return request({
            url: `/product/product/GetEsProductInfo/${id}`,
            method: 'get',
        })
    },


    // 商品上架功能:上传数据到Es中
    saveProductToEs(esProductInfo) {
        return request({
            url: `/others/es/saveEsProduct`,
            method: 'post',
            data: esProductInfo
        })
    },

    // 商品下架架功能，将数据从Es中删除
    deleteEsProduct(id) {
        return request({
            url: `/others/es/deleteEsProduct/${id}`,
            method: 'delete',
        })
    },


    // //////////////////////////////////////////////产品管理 -end /////////////////////////////////////////////////////////


}
