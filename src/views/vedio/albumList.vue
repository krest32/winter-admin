<template>
  <div class="app-container">
    <h1>专辑列表</h1>

    <!-- 新增标签 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加/修改专辑">
      <el-form label-width="120px">
        <el-form-item label="分类名称">
          <el-input v-model="albumInfo.title" style="width: 300px" />
        </el-form-item>

        <el-form-item label="分类选择">
          <el-select v-model="albumInfo.catelogId" placeholder="请选择" style="width: 200px">
            <el-option v-for="catelog in catelogList" :key="catelog.id" :label="catelog.title" :value="catelog.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="专辑简介">
          <el-input v-model="albumInfo.intro" :rows="5" style="width: 500px" type="textarea" maxlength="200" show-word-limit />
        </el-form-item>

        <!-- 封面上传 -->
        <el-form-item label="封面上传">
          <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :action="BASE_API + '/others/Aliyun/oss'" class="avatar-uploader">
            <img :src="albumInfo.pictureAddress" style="width: 500px">
          </el-upload>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 条件查询专辑 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="专辑名称">
        <el-input v-model="queryAlbumVo.title" />
      </el-form-item>

      <el-form-item label="分类选择">
        <el-select v-model="queryAlbumVo.catelogId" placeholder="请选择" style="width: 200px">
          <el-option v-for="catelog in catelogList" :key="catelog.id" :label="catelog.title" :value="catelog.id" />
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="pageQueryAlbum()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
      <el-button
        type="primary"
        @click="
          dialogVideoFormVisible = true;
          albumInfoID = albumInfo.id;
        ">添加专辑</el-button>
    </el-form>

    <!-- 标签列表 -->
    <el-table :data="albumList" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          <!-- 自动生成博客的序号 -->
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="专辑名称" align="center" />

      <el-table-column prop="intro" label="简介" align="center" />

      <el-table-column prop="catelogTitle" label="分类名称" align="center" />

      <el-table-column prop="pictureAddress" label="头像" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.pictureAddress" fit="contain" />
        </template>
      </el-table-column>

      <el-table-column prop="vedioNum" label="视频数量" align="center" />

      <el-table-column prop="clickCount" label="点击数" align="center" />

      <el-table-column prop="collectCount" label="收藏数" align="center" />

      <el-table-column prop="puyCount" label="购买数" align="center" />

      <el-table-column prop="playCount" label="播放数" align="center" />

      <el-table-column prop="gmtCreate" label="添加时间" align="center" />

      <el-table-column prop="gmtModified" label="修改时间" align="center" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <!-- <router-link :to="'/edu/teacher/edit/' + scope.row.id"> -->
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="getAlbumById(scope.row.id)">修改</el-button>
          <!-- </router-link> -->
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页插件 -->
    <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center" layout="total, prev, pager, next, jumper" @current-change="pageQueryAlbum" />

  </div>
</template>

<script>
import vedioApi from '@/api/vedio'
export default {
  inject: ['reload'], // 引入方法
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用,
      BASE_API: process.env.BASE_API, // 接口API地址
      saveVideoBtnDisabled: false, // 按钮是否禁用
      dialogVideoFormVisible: false, // 是否显示表单
      queryAlbumVo: {},
      page: 0,
      limit: 10,
      total: 0,
      albumList: [],
      albumInfo: {
        pictureAddress: '../static/cover.jpg'
      },
      catelogList: []
    }
  },

  // 当页面加载时获取数据
  created() {
    this.listCateLog()
    this.pageQueryAlbum()
  },

  // 调用api层获取数据库中的数据
  methods: {
    // 条件查询album列表
    pageQueryAlbum(page = 1) {
      this.page = page
      vedioApi.pageQueryAlbum(this.page, this.limit, this.queryAlbumVo).then(Response => {
        this.total = Response.data.total
        this.albumList = Response.data.albumList
        console.log('total:', this.total)
        console.log('albumlist:', this.albumList)
      })
    },
    // 添加专辑
    addAlbum() {
      vedioApi.addAlbum(this.albumInfo).then(Response => {
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
      })
    },

    // 列出所有的catelog
    listCateLog() {
      vedioApi.listCateLog().then(Response => {
        this.catelogList = Response.data.list
        console.log('catelogList:', this.catelogList)
      })
    },

    // 保存Tag的操作
    helpSave() {
      this.dialogVideoFormVisible = false // 如果保存成功则关闭对话框
      this.reload()
      this.listCateLog() // 刷新列表
      this.saveVideoBtnDisabled = false
    },

    // 保存或更新
    saveOrUpdate() {
      if (!this.albumInfo.id) {
        this.addAlbum()
        this.helpSave()
      } else {
        this.updateAlbum()
        this.helpSave()
      }
    },
    // 取消保存
    cancel() {
      this.dialogVideoFormVisible = false
      this.reload()
    },

    // 上传封面成功调用方法
    handleAvatarSuccess(res, file) {
      console.log(res) // 上传响应
      console.log(URL.createObjectURL(file.raw)) // base64编码
      this.albumInfo.pictureAddress = res.data.url
      this.albumInfo.pictureName = res.data.filename
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
    // /////////////////////////////////////////////////////////////////

    // 清空搜索条件
    resetData() {
      this.queryAlbumVo = {}
      this.pageQueryAlbum()
    },
    // 根据id删除catelog
    removeDataById(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          vedioApi.deleteAlbum(id).then(Response => {
            this.pageQueryAlbum()
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

    // 根据id的搭配catelog
    getAlbumById(id) {
      vedioApi.getAlbumById(id).then(Response => {
        this.albumInfo = Response.data.album
        this.dialogVideoFormVisible = true
        console.log('albumInfo:', this.albumInfo)
      })
    },

    // 更新catelog信息
    updateAlbum() {
      vedioApi.updateAlbumById(this.albumInfo).then(Response => {
        this.$message({
          type: 'success',
          message: '更新成功!'
        })
      })
    }

  }
}
</script>

<style></style>
