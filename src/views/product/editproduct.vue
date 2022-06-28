<template>
<div class="app-container">
    <h1>商品信息页面</h1>
    <el-form ref="form" :model="productInfo" label-width="80px">
        <!-- 商品名称 -->
        <el-form-item label="商品名称">
            <el-input v-model="productInfo.title" style="width: 300px"></el-input>
        </el-form-item>

        <!-- 品牌选择 -->
        <el-form-item label="品牌选择">
            <el-select v-model="productInfo.brandId" placeholder="请选择" style="width: 300px">
                <el-option v-for="brand in brandList" :key="brand.id" :label="brand.title" :value="brand.id" />
            </el-select>
        </el-form-item>

        <!-- 分类选择 -->
        <el-form-item label="产品分类">
            <el-cascader style="width: 300px" :options="catelogList" :props="optionProps" v-model="productInfo.sortIdList" @change="handleCateLogCheck" />
        </el-form-item>

        <el-form-item label="图片上传">
            <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :action="BASE_API + '/others/Aliyun/oss'" class="avatar-uploader">
                <img :src="productInfo.picture" style="width: 500px">
            </el-upload>
        </el-form-item>

        <el-form-item label="价格">
            <el-input-number v-model="productInfo.price" style="width: 300px" />
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即添加</el-button>
            <el-button @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>

</div>
</template>

<script>
import productAPi from '@/api/product'
export default {

    data() {
        return {
            isIndeterminate: true,
            num: 0,
            checkAll: true,
            BASE_API: process.env.BASE_API, // 接口API地址
            // 阿里云OSS地址
            fileUploadBtnText: '上传到服务器', // 按钮文字
            importBtnDisabled: false, // 按钮是否禁用,
            loading: false,
            saveBtnDisabled: false, // 保存按钮是否禁用,
            saveVideoBtnDisabled: false, // 课时按钮是否禁用
            count: 0,
            optionProps: {
                value: 'id',
                label: 'title',
                children: 'childrenCatelogs'
            },
            productInfo: {
                status: false,
                title: '',
                brandId: '',
                oneSortId: '',
                attrIds: [],
                sortIdList: [],
                picture: '/static/cover.jpg',
                pictureName: '',
            },
            attrGroupList: [],
            attrgroup: '',
            brandList: [],
            catelogList: [0],
            selectedCateList: [0],
            listAttrGroup: [0],
            attrsList: [0],
            attrGroupAttrList: [0]
        }

    },
    created() {
        this.ListAllBrand();
        this.GetAllCateLog();
        this.getProductInfo();

    },
    methods: {

        //根据Id得到商品的详细信息
        getProductInfo() {
            if (this.$route.params && this.$route.params.id) {
                const id = this.$route.params.id;
                productAPi.getProductById(id).then(Response => {
                    this.productInfo = Response.data.product;
                    console.log("productInfo:", this.productInfo)
                })
            }
        },

        // 上传之前检查文件
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },

        // 上传封面成功调用方法
        handleAvatarSuccess(res, file) {
            console.log(res) // 上传响应
            console.log(URL.createObjectURL(file.raw)) // base64编码
            this.productInfo.picture = res.data.url
            this.productInfo.pictureName = res.data.filename
        },

        handleCateLogCheck(data) {
            this.productInfo.oneSortId = data[2];
            this.productInfo.sortIdList = data;
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

        //添加商品的品牌
        ListAllBrand() {
            productAPi.ListAllBrand().then(Response => {
                this.brandList = Response.data.list;
                console.log(this.brandList)
            })
        },

        onSubmit() {
            if (!this.productInfo.id) {
                this.addNewProduct();
            } else {
                this.updateProduct()
            }

        },

        updateProduct() {
            console.log("保存的数据是：", this.productInfo);
            productAPi.updateProduct(this.productInfo).then(Response => {
                    return this.$message({
                        type: 'success',
                        message: '更新成功!'
                    })
                })
                .then((resposne) => {
                    this.$router.push({
                        path: '/product/productList'
                    })
                })
        },

        addNewProduct() {
            console.log("保存的数据是：", this.productInfo);
            productAPi.addNewProduct(this.productInfo).then(Response => {
                    return this.$message({
                        type: 'success',
                        message: '保存成功!'
                    })
                })
                .then((resposne) => {
                    this.$router.push({
                        path: '/product/productList'
                    })
                })
        },

        //取消添加商品
        cancel() {
            this.$router.push({
                path: '/product/productList'
            })
        }
    }

}
</script>

<style>
.text {
    font-size: 14px;
}

.item {
    padding: 18px 0;
}

.box-card {
    width: 800px;
}
</style>
