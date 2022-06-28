<template>
<div class="app-container">
    <h1>添加/修改博客</h1>
    <el-form label-width="100px">
        <el-form-item label="标题" style="width: 1000px">
            <el-input v-model="blogInfo.title" />
        </el-form-item>

        <el-form-item label="作者">
            <el-select v-model="blogInfo.authorId" placeholder="请选择" style="width: 200px">
                <el-option v-for="author in authorList" :key="author.id" :label="author.name" :value="author.id" />
            </el-select>
        </el-form-item>

        <!-- 分类信息下拉列表 -->
        <el-form-item label="分类">
            <el-select v-model="blogInfo.blogSortId" placeholder="请选择" style="width: 200px">
                <el-option v-for="blogSort in sortList" :key="blogSort.id" :label="blogSort.title" :value="blogSort.id" />
            </el-select>
        </el-form-item>

        <el-form-item label="价格">
            <el-input-number v-model="blogInfo.price" controls-position="right" style="width: 200px" placeholder="0为免费" />
        </el-form-item>

        <el-form-item label="标签选择">
            <el-checkbox-group v-model="blogInfo.tagIdList" :min="1" :max="3">
                <el-checkbox v-for="tag in tagList" :label="tag.id" :key="tag.id">{{ tag.title }}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>

        <el-form-item label="文章简介">
            <el-input v-model="blogInfo.summary" :rows="5" type="textarea" style="width: 1000px" maxlength="200" show-word-limit />
        </el-form-item>

        <!-- 封面上传 -->
        <el-form-item label="封面上传">
            <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :action="BASE_API + '/others/Aliyun/oss'" class="avatar-uploader">
                <img :src="blogInfo.pictureAddress" style="width: 1000px">
            </el-upload>
        </el-form-item>

        <!-- 富文本编辑器 -->
        <el-form-item label="博客文章">
            <tinymce :height="300" v-model="blogInfo.content" style="width: 1000px" />
        </el-form-item>

        <el-form-item>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import blogApi from '@/api/blog'
import Tinymce from '@/components/Tinymce'

export default {
    components: {
        Tinymce
    },
    data() {
        return {
            saveBtnDisabled: false, // 保存按钮是否禁用,
            BASE_API: process.env.BASE_API, // 接口API地址
            blogInfo: {
                pictureAddress: '../static/cover.jpg',
                tagIdList: []
            },
            authorList: [],
            sortList: [],
            tagList: []

        }
    },

    // 当页面加载时获取数据
    created() {
        this.init()
        this.listAllAuthor()
        this.listAllSort()
        this.TagList()
    },

    // 调用api层获取数据库中的数据
    methods: {
        init() {
            if (this.$route.params && this.$route.params.id) {
                const id = this.$route.params.id
                this.getBlogById(id)
            } else {
                this.listAllAuthor()
                this.listAllSort()
                this.TagList()
            }
        },

        // 根据id得到Blog信息
        getBlogById(id) {
            blogApi.getBlogById(id).then(Response => {
                this.blogInfo = Response.data.blog
                console.log('blogInfo:', this.blogInfo)
            })
        },
        // 得到所有的标签
        TagList() {
            blogApi.TagList().then(Response => {
                this.tagList = Response.data.tagList
                console.log('tagList:', this.tagList)
            })
        },

        // 上传封面成功调用方法
        handleAvatarSuccess(res, file) {
            console.log(res) // 上传响应
            console.log(URL.createObjectURL(file.raw)) // base64编码
            this.blogInfo.pictureAddress = res.data.url
            this.blogInfo.pictureName = res.data.filename
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
        // 获得所有Sort下拉列表
        listAllSort() {
            blogApi.listAllSort().then(Response => {
                this.sortList = Response.data.sortList
                console.log('sortList:', this.sortList)
            })
        },

        // 获取所有的Author下拉列表
        listAllAuthor() {
            blogApi.listAllAuthor().then(Response => {
                this.authorList = Response.data.authorList
                console.log('authorList:', this.authorList)
            })
        },
        // 添加新的博客
        addBlog() {
            blogApi.addBlog(this.blogInfo).then(Response => {
                this.$message({
                    type: 'success',
                    message: '保存成功!'
                })
            })
        },

        updateBlog() {
            blogApi.updateBlog(this.blogInfo).then(
                this.$message({
                    type: 'success',
                    message: '更新成功!'
                })
            )
        },
        // 保存或更新Blog信息
        saveOrUpdate() {
            this.saveBtnDisabled = true
            console.log('blogInfo:', this.blogInfo)
            if (!this.blogInfo.id) {
                this.addBlog()
                this.$router.push({
                    path: '/blogs/blogList'
                })
            } else {
                this.updateBlog()
                this.$router.push({
                    path: '/blogs/blogList'
                })
            }
        }

    }
}
</script>

<style scoped>
.tinymce-container {
    line-height: 29px;
}
</style>
