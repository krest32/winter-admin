<template>
  <div class="app-container">
    <h1>分类列表</h1>
    <!-- 新增标签 -->

    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加/修改分类">
      <el-form label-width="120px">
        <el-form-item label="分类名称">
          <el-input v-model="sortInfo.title" style="width: 240px" />
        </el-form-item>
      </el-form>
      <el-form label-width="120px">
        <el-form-item label="文章简介">
          <el-input v-model="sortInfo.content" :rows="5" type="textarea" style="width: 400px" maxlength="200" show-word-limit />
        </el-form-item>

        <!-- 封面上传 -->
        <el-form-item label="封面上传">

          <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :action="BASE_API + '/others/Aliyun/oss'" class="avatar-uploader">
            <img :src="sortInfo.pictureAddress" style="width: 500px">
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdateData">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 条件查询博客 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="作者名称">
        <el-input v-model="querySortVo.title" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="PageQuerySort()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
      <el-button
        type="primary"
        @click="dialogVideoFormVisible = true;
                sortInfoId = sortInfo.id;
        ">添加博客分类</el-button>
    </el-form>

    <!-- Sort 列表部分 -->
    <el-table :data="sortList" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          <!-- 自动生成博客的序号 -->
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="分类名称" align="center" />

      <el-table-column prop="content" label="分类简介" align="center" />

      <el-table-column prop="blogNum" label="文章数量" align="center" />

      <el-table-column prop="pictureAddress" label="封面图片" align="center" width="300">
        <template slot-scope="scope">
          <el-image :src=" scope.row.pictureAddress" fit="contain" />
        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="添加时间" align="center" />

      <el-table-column prop="gmtModified" label="修改时间" align="center" />

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- <router-link :to="'/edu/teacher/edit/' + scope.row.id"> -->
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="getSortById(scope.row.id)">修改</el-button>
          <!-- </router-link> -->
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteSort(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center" layout="total, prev, pager, next, jumper" @current-change="PageQuerySort" />

  </div>
</template>

<script>
import blogApi from '@/api/blog'
export default {
  inject: ['reload'], // 引入方法
  data() {
    return {
      BASE_API: process.env.BASE_API, // 接口API地址
      // 阿里云OSS地址
      fileUploadBtnText: '上传到服务器', // 按钮文字
      importBtnDisabled: false, // 按钮是否禁用,
      loading: false,
      saveBtnDisabled: false, // 保存按钮是否禁用,
      saveVideoBtnDisabled: false, // 课时按钮是否禁用
      dialogVideoFormVisible: false, // 是否显示课时表单
      sortInfo: {
        pictureAddress: '../static/cover.jpg'
      },
      limit: 10,
      page: 1,
      total: 0,
      querySortVo: {},
      sortList: []
    }
  },

  // 当页面加载时获取数据
  created() {
    this.PageQuerySort()
  },

  // 调用api层获取数据库中的数据
  methods: {
    resetData() {
      this.querySortVo = {}
      this.PageQuerySort()
    },
    deleteSort(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          blogApi.deleteSort(id).then(Response => {
            this.PageQuerySort()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
        .catch((response) => {
          // 失败
          if (response === 'cancel') {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          }
        })
    },

    // 更新Sort信息
    updateSort() {
      blogApi.updateSort(this.sortInfo).then(Response => {
        this.$message({
          type: 'success',
          message: '更新成功!'
        })
        this.PageQuerySort()
      })
    },

    // 根据Id获取Sort信息
    getSortById(id) {
      blogApi.getSortById(id).then(Response => {
        this.sortInfo = Response.data.sort
        this.dialogVideoFormVisible = true
        console.log('sortInfo:', this.sortInfo)
      })
    },

    // 获取所有的Sort信息
    PageQuerySort(page = 1) {
      this.page = page
      blogApi.PageQuerySort(this.page, this.limit, this.querySortVo).then(Response => {
        this.total = Response.data.total
        this.sortList = Response.data.list
        console.log('sortList:', this.sortList)
      })
    },

    // 添加新的分类
    addSort() {
      blogApi.addSort(this.sortInfo).then(Response => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
      })
    },
    // 保存或新增
    saveOrUpdateData() {
      if (!this.sortInfo.id) {
        this.addSort()
        this.btnaction()
      } else {
        this.updateSort()
        this.btnaction()
      }
    },
    // 上传封面成功调用方法
    handleAvatarSuccess(res, file) {
      console.log(res) // 上传响应
      console.log(URL.createObjectURL(file.raw)) // base64编码
      this.sortInfo.pictureAddress = res.data.url
      this.sortInfo.pictureName = res.data.filename
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
    // 取消新增
    cancel() {
      this.dialogVideoFormVisible = false
      this.btnaction()
    },
    //   刷新页面
    btnaction() {
      this.PageQuerySort()
      this.reload() // 调用方法
    }

  }
}
</script>

<style></style>
