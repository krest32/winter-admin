<template>
<div class="app-container">
    <el-row :gutter="20">
        <!-- 总分类列表 -->
        <el-col :span="17">
            <h1>商品列表：共计{{total}}款</h1>
            <!-- 条件查询产品 -->
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="商品名称" width="200">
                    <el-input v-model="queryPuoductVo.title" />
                </el-form-item>

                <el-form-item label="品牌">
                    <el-select v-model="queryPuoductVo.bandId" filterable placeholder="请选择" width="200">
                        <el-option v-for="brand in brandList" :key="brand.id" :label="brand.title" :value="brand.id" />
                    </el-select>
                </el-form-item>

                <el-form-item label="分类">
                    <el-cascader :options="catelogList" :props="optionProps" filterable v-model="selectedCateList" @change="handleCateLogCheck" style="width:280px" />
                </el-form-item>

                <el-button type="primary" icon="el-icon-search" @click="ListAllProduct()">查询</el-button>
                <el-button type="default" @click="resetData()">清空</el-button>
                <el-button type="primary" @click="addproduct">添加商品</el-button>
            </el-form>

            <!-- 产品列表 -->
            <el-table :data="productList" element-loading-text="拼命加载中" border fit highlight-current-row>
                <el-table-column label="序号" width="70" align="center">
                    <template slot-scope="scope">
                        <!-- 自动生成博客的序号 -->
                        {{ (page - 1) * limit + scope.$index + 1 }}
                    </template>
                </el-table-column>

                <el-table-column prop="title" label="名称" align="center" />

                <el-table-column prop="brandTitle" label="品牌" align="center" />

                <el-table-column prop="oneSortTitle" label="一级分类" align="center" />

                <el-table-column prop="twoSortTitle" label="二级分类" align="center" />

                <el-table-column prop="threeSortTitle" label="三级分类" align="center" />

                <el-table-column prop="price" label="价格" align="center" sortable />

                <el-table-column :show-overflow-tooltip="true" prop="status" label="是否上架" align="center">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.status" @change="statusChanged(scope.row.id)" />
                    </template>
                </el-table-column>

                <el-table-column prop="封面" label="头像" align="center">
                    <template slot-scope="scope">
                        <el-image :src=" scope.row.picture" fit="contain" style="width: 80px; height: 60px" />
                    </template>
                </el-table-column>

                <el-table-column prop="gmtCreate" label="修改时间" align="center" sortable />

                <el-table-column label="属性" align="center" width="110">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="showAttrList(scope.row.id)">属性列表</el-button>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <!-- <router-link :to="'/edu/teacher/edit/' + scope.row.id"> -->
                        <el-button type="primary" size="mini" @click="modifiedDataById(scope.row.id)">修改</el-button>
                        <!-- </router-link> -->
                        <el-button type="danger" size="mini" @click="removeDataById(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页插件 -->
            <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center" layout="total, prev, pager, next, jumper" @current-change="ListAllProduct" />

        </el-col>

        <el-col :span="7" v-if="showAttr">
            <h1>属性列表</h1>
            <el-row>
                <el-button type="primary" @click="showDialog">
                    为{{productInfo.title}}添加属性</el-button>

                <el-button type="primary" @click="toStockPage">
                    库存管理</el-button>
            </el-row>

            <el-dialog :visible.sync="dialogVisible" title="添加/修改属性">
                <el-tree :data="productAttrGroupInfo" :props="defaultProps" :default-checked-keys="productInfo.attrIdList" show-checkbox ref="tree" node-key="id" default-expand-all :expand-on-click-node="false" />
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addNewAttr" type="primary">添加属性信息</el-button>
                    <el-button @click="cancelAddAttr">取 消</el-button>
                    <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="SaveOrupdateAttr">确 定</el-button>
                </div>
            </el-dialog>

            <el-table :data="AttrList" element-loading-text="拼命加载中" border fit highlight-current-row>
                <el-table-column label="序号" width="70" align="center">
                    <template slot-scope="scope">
                        {{ scope.$index + 1 }}
                    </template>
                </el-table-column>

                <el-table-column prop="attrGroupTitle" label="名称" align="center" />

                <el-table-column prop="attrTitle" label="属性值" align="center" />

                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" icon="el-icon-edit" @click="removeRelation(scope.row.id)">删除关联</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </el-col>
    </el-row>
</div>
</template>

<script>
import productAPi from "@/api/product";
export default {
    inject: ['reload'], // 引入方法
    data() {
        return {
            AttrList: [],
            showAttr: false,
            queryPuoductVo: {},
            page: 0,
            limit: 10,
            total: 0,
            productList: [],
            productInfo: {
                attrIdList: []
            },
            selectedCateList: [],
            catelogList: [],
            optionProps: {
                value: 'id',
                label: 'title',
                children: 'childrenCatelogs'
            },
            defaultProps: {
                children: 'attrList',
                label: 'title'
            },
            productAttrGroupInfo: [],
            saveProductAttrVo: {},
            ///
            saveVideoBtnDisabled: false, // 课时按钮是否禁用
            dialogVisible: false,
            CheckbrandList: [],
            checkbrand: {},
            checkedList: [],
            brandList: [],
            brandInfo: {},
            title: '',
        }
    },

    // 当页面加载时获取数据
    created() {
        this.ListAllBrand()
        this.GetAllCateLog()
        this.ListAllProduct()
    },

    methods: {
        // 商品上下架状态切换
        statusChanged(id) {
            productAPi.changeProductStatus(id).then(Response => {
                this.ListAllProduct()
                this.GetEsProductInfo(id)
            })
        },

        //根据id得到数据，并对Es进行处理
        GetEsProductInfo(id) {
            productAPi.GetEsProductInfo(id).then(Response => {
                this.esProductInfo = Response.data.esProduct
                console.log("esProductInfo:", this.esProductInfo)
                if (this.esProductInfo.status) {
                    this.saveProductToEs();
                }else{
                    this.deleteEsProduct();
                }
            })
        },

        // 上传数据到Es中
        saveProductToEs() {
            productAPi.saveProductToEs(this.esProductInfo).then(Response => {
                this.$message({
                    type: 'success',
                    message: '商品上架成功!'
                })
            })
        },

        // 将数据从Es中删除
        deleteEsProduct(){
            productAPi.deleteEsProduct(this.esProductInfo.id).then(Response => {
                this.$message({
                    type: 'success',
                    message: '商品下架成功!'
                })
            })
        },

        // 跳转库存页面
        toStockPage() {
            this.$router.push({
                path: '/product/editStock/' + this.productInfo.id
            })
        },
        // 删除商品的关联属性
        removeRelation(id) {
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    return productAPi.deleteProductAttr(id)
                })
                .then(() => {
                    this.afterEditAttrInfo();
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                })
        },

        // 删除商品
        removeDataById(id) {
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    return productAPi.deleteProductById(id)
                })
                .then(() => {
                    this.ListAllProduct();
                    this.reload();
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                })
        },

        // 修改商品xinxi
        modifiedDataById(id) {
            this.$router.push({
                path: '/product/editproduct/' + id
            })
        },

        // 获取选中的属性
        addNewAttr() {
            this.$router.push({
                path: '/product/catelogAttr'
            })
        },

        // 为product添加属性信息
        editAttrForProduct() {
            this.saveProductAttrVo.catelogAttrList = this.$refs.tree.getCheckedNodes()
            console.log("saveProductAttrVo", this.saveProductAttrVo)
            productAPi.addAttrForProduct(this.saveProductAttrVo).then(Response => {
                this.$message({
                    type: 'success',
                    message: '保存成功!'
                })
                this.afterEditAttrInfo();
            })
        },

        //添加或保存attr按钮
        SaveOrupdateAttr() {
            this.editAttrForProduct();
            this.afterEditAttrInfo();
        },

        afterEditAttrInfo() {
            this.dialogVisible = false
            // console.log("afterEditAttrInfo", this.productInfo)
            this.getProductById(this.productInfo.id)
        },

        // 显示属性添加对话框
        showDialog() {
            this.dialogVisible = true
            productAPi.GetAttrGroupById(this.productInfo.oneSortId).then(Response => {
                this.productAttrGroupInfo = Response.data.attrGopurList
                // console.log("productAttrGroupInfo:", this.productAttrGroupInfo)
            })
        },

        // 列出所有的catelog
        GetAllCateLog() {
            productAPi.GetAllCateLog().then(Response => {
                this.catelogList = this.getTreeData(Response.data.catelogList)
                // console.log('分类菜单', this.catelogList)
            })
        },

        // 处理返回的 catelogList 数据
        getTreeData(data) {
            // 循环遍历json数据
            for (var i = 0; i < data.length; i++) {
                if (data[i].childrenCatelogs.length < 1) {
                    // children若为空数组，则将children设为undefined
                    data[i].childrenCatelogs = undefined
                } else {
                    // children若不为空数组，则继续 递归调用 本方法
                    this.getTreeData(data[i].childrenCatelogs)
                }
            }
            return data
        },

        // 显示所有的产品信息
        ListAllProduct(page = 1) {
            this.page = page
            productAPi.ListAllProduct(this.page, this.limit, this.queryPuoductVo).then(Response => {
                this.total = Response.data.productVo.total
                this.productList = Response.data.productVo.productList
                // console.log("Response:", Response)
                // console.log("total:", this.total)
                // console.log("productList:", this.productList)
            })
        },

        handleCateLogCheck(data) {
            console.log('数据是:', data)
            console.log('=====', this.queryPuoductVo.sortId == data[2])
            this.queryPuoductVo.sortId = data[2]
            console.log(this.queryPuoductVo)
        },

        dialogturue() {
            this.dialogVideoVisible = true;
            this.ListAllBrand();
        },

        //得到品牌列表
        ListAllBrand() {
            productAPi.ListAllBrand().then(Response => {
                this.brandList = Response.data.list
            })
        },

        // 清空搜索数据
        resetData() {
            this.queryPuoductVo = {},
                this.selectedCateList = [],
                this.ListAllProduct()
        },

        showAttrList(id) {
            this.productInfo.id = id
            this.saveProductAttrVo.productId = id
            this.showAttr = true
            this.getProductById(id)
            // console.log("AttrList:", this.AttrList)

        },

        // 根据id得到商品的详细信息
        getProductById(id) {
            productAPi.getProductById(id).then(Response => {
                this.productInfo = Response.data.product
                this.AttrList = Response.data.product.attrList
            })
        },

        addproduct() {
            this.$router.push({
                path: '/product/addproduct'
            })
        },
        cancelAddAttr() {},

    }

}
</script>

<style>

</style>
