<template>
<div class="app-container">
    <h1>品牌列表：{{total}}</h1>

    <!-- 条件查询博客 -->
    <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="品牌名称">
            <el-input v-model="queryBrandVo.title" />
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="ListAllBrand()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
        <el-button type="primary" @click="
        dialogVideoFormVisible = true;
        brandInfoID = brandInfo.id;
      ">添加新品牌</el-button>
    </el-form>

    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加/修改品牌">
        <el-form label-width="120px">
            <el-form-item label="品牌名称">
                <el-input v-model="brandInfo.title" style="width: 240px" />
            </el-form-item>
        </el-form>

        <!-- 封面上传 -->
        <el-form label-width="120px">
            <el-form-item label="Logo上传">
                <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :action="BASE_API + '/others/Aliyun/oss'" class="avatar-uploader">
                    <img :src="brandInfo.brandImage" style="width: 500px">
                </el-upload>
            </el-form-item>
        </el-form>
        <el-form label-width="120px">
            <el-form-item label="品牌介绍">
                <el-input v-model="brandInfo.intro" :rows="5" type="textarea" style="width: 500px" maxlength="200" show-word-limit />
            </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdateData">确 定</el-button>
        </div>
    </el-dialog>

    <el-table :data="brandList" element-loading-text="拼命加载中" border fit highlight-current-row>
        <el-table-column label="序号" width="70" align="center">
            <template slot-scope="scope">
                <!-- 自动生成博客的序号 -->
                {{ scope.$index + 1 }}
            </template>
        </el-table-column>

        <el-table-column prop="title" label="品牌名称" align="center" />

        <el-table-column prop="intro" label="品牌介绍" align="center" />

        <el-table-column prop="productNum" label="产品数量" align="center" />

        <el-table-column prop="brandImage" label="品牌图片" align="center">
            <template slot-scope="scope">
                <el-image :src=" scope.row.brandImage" fit="contain" style="width: 80px; height: 60px" />
            </template>
        </el-table-column>

        <el-table-column prop="gmtCreate" label="添加时间" align="center" />

        <el-table-column prop="gmtModified" label="修改时间" align="center" />

        <el-table-column label="操作" width="200" align="center">

            <template slot-scope="scope">
                <!-- <router-link :to="'/edu/teacher/edit/' + scope.row.id"> -->
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="GetBrandById(scope.row.id)">修改</el-button>
                <el-button v-if="scope.row.productNum === 0" type="danger" size="mini" icon="el-icon-edit" @click="DeleteBrandById(scope.row.id)">删除</el-button>
            </template>

        </el-table-column>
    </el-table>
    <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center" layout="total, prev, pager, next, jumper" @current-change="ListAllBrand" />

</div>
</template>

<script>
import productAPi from '@/api/product'

export default {
    inject: ['reload'], // 引入方法
    data() {
        return {

            saveBtnDisabled: false, // 保存按钮是否禁用,
            num: 1,
            showCancel: false,
            submitting: false,
            BASE_API: process.env.BASE_API, // 接口API地址
            saveVideoBtnDisabled: false, // 课时按钮是否禁用
            dialogVideoFormVisible: false, // 是否显示课时表单
            vedioSortList: [],
            brandList: [],
            brandInfo: {
                brandImage: '../static/cover.jpg'
            },
            catelogList: [],
            catelogInfo: {},
            CateLogOne: [],
            CateLogTwo: [],
            CateLogThree: [],
            catelogone: {},
            page: 0,
            limit: 10,
            total: 0,
            queryBrandVo: {
                title: ''
            }

        }
    },

    // 当页面加载时获取数据
    created() {
        this.GetAllCateLog();
        this.ListAllBrand();
    },

    methods: {
        // 清空查询条件
        resetData() {
            this.queryBrandVo = {}
            this.ListAllBrand()
        },

        // 获得分类列表的信息   
        GetAllCateLog() {
            productAPi.GetAllCateLog()
                .then(Response => {
                    this.catelogList = Response.data.catelogList
                    // console.log(this.catelogList)
                })
        },

        //删除品牌
        DeleteBrandById(id) {
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    return productAPi.DeleteBrandById(id)
                })
                .then(() => {
                    this.ListAllBrand();
                    this.reload();
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                })
        },

        //得到品牌列表
        ListAllBrand(page = 1) {
            this.page = page
            this.page = page
            productAPi.pageQueryBrand(this.page, this.limit, this.queryBrandVo).then(Response => {
                this.brandList = Response.data.brandList
                this.total = Response.data.total
                console.log(this.brandList)
            })
        },

        // 上传封面成功调用方法
        handleAvatarSuccess(res, file) {
            console.log(res) // 上传响应
            console.log(URL.createObjectURL(file.raw)) // base64编码
            this.brandInfo.brandImage = res.data.url
            this.brandInfo.brandImageFilename = res.data.filename
        },

        // 上传之前检查文件
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$message.error('图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },
        // 取消新增
        cancel() {
            this.dialogVideoFormVisible = false
            this.btnaction()
        },
        //   刷新页面
        btnaction() {
            this.ListAllBrand()
            this.reload() // 调用方法
        },
        // 保存或新增
        saveOrUpdateData() {
            this.saveVideoBtnDisabled = true
            if (!this.brandInfo.id) {
                this.AddNewBrand()
                this.btnaction()
            } else {
                this.UpdateBrandInfo()
                this.btnaction()
            }
        },

        // 更新标签
        UpdateBrandInfo() {
            productAPi.updateBrand(this.brandInfo).then(response => {
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                })
            })
        },

        // 新增AddNewBrand方法
        AddNewBrand() {
            productAPi.AddNewBrand(this.brandInfo).then(Response => {
                this.$message({
                    type: 'success',
                    message: '保存成功!'
                })
                this.helpSaveVideo()
            }).catch(error => {
                console.log(error.message)
                this.$message({
                    type: 'error',
                    message: error.message
                })
            })
        },

        // 保存成功之后的操作
        helpSaveVideo() {
            this.dialogVideoFormVisible = false // 如果保存成功则关闭对话框
            this.ListAllBrand() // 刷新列表
            this.saveVideoBtnDisabled = false
        },

        GetBrandById(id) {
            this.dialogVideoFormVisible = true
            productAPi.GetBrandById(id).then(Response => {
                this.brandInfo = Response.data.brand
                console.log(this.brandInfo)
            })
        },

        //条件分页查询Brand
        pageQueryBrand(page = 1) {

        }
    }
}
</script>

<style></style>
