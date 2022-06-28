<template>
  <div class="app-container">
    <h1>添加视频</h1>
    <el-form label-width="120px">

      <!-- 视频标题 -->
      <el-form-item label="标题">
        <el-input v-model="vedioInfo.title" style="width: 240px" />
      </el-form-item>

      <!-- 价格输入框 -->
      <el-form-item label="价格">
        <el-input-number v-model="vedioInfo.price" :min="0" style="width: 240px" />
      </el-form-item>

      <!-- 分类信息下拉列表 -->
      <el-form-item label="分类">
        <el-select v-model="vedioInfo.catelogId" placeholder="分类选择" style="width: 240px" @change="catelogChanged">
          <el-option v-for="catelog in catelogList" :key="catelog.id" :label="catelog.title" :value="catelog.id" />
        </el-select>

        <el-select v-model="vedioInfo.albumId" placeholder="专辑选择" style="width: 240px">
          <el-option v-for="album in albumList" :key="album.title" :label="album.title" :value="album.id"/>
        </el-select>
      </el-form-item>、

      <!-- 封面上传 -->
      <el-form-item label="封面上传">
        <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :action="BASE_API + '/others/Aliyun/oss'" class="avatar-uploader">
          <img :src="vedioInfo.pictureAddress" style="width: 500px">
        </el-upload>
      </el-form-item>

      <!-- 上传视频组件 -->
      <el-form label-width="120px">
        <el-form-item label="上传视频">
          <el-upload :on-success="handleVodUploadSuccess" :on-remove="handleVodRemove" :before-remove="beforeVodRemove" :on-exceed="handleUploadExceed" :file-list="fileList" :action="BASE_API + '/others/Aliyun/uploadvideo'" :limit="1" class="upload-demo">
            <el-button size="small" type="primary">上传视频</el-button>
            <el-tooltip placement="right-end">
              <div slot="content">
                最大支持1G，<br>
                支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                SWF、TS、VOB、WMV、WEBM 等视频格式上传
              </div>
              <i class="el-icon-question" />
            </el-tooltip>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
        </el-form-item>

      </el-form>

  </el-form></div>
</template>

<script>
import vedioApi from '@/api/vedio'
export default {
  inject: ['reload'], // 引入方法
  data() {
    return {

      fileList: [], // 上传文件列表
      saveBtnDisabled: false, // 保存按钮是否禁用,
      BASE_API: process.env.BASE_API, // 接口API地址
      catelogList: [],
      vedioInfo: {
        albumId: '',
        pictureAddress: '../static/cover.jpg',
        videoSourceId: '',
        videoOriginalName: '',
        size: 0
      },
      albumList: []
    }
  },

  // 当页面加载时获取数据
  created() {
    this.init()
  },

  methods: {

    // 上传封面成功调用方法
    handleAvatarSuccess(res, file) {
      console.log(res) // 上传响应
      console.log(URL.createObjectURL(file.raw)) // base64编码
      this.vedioInfo.pictureAddress = res.data.url
      this.vedioInfo.pictureName = res.data.filename
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

    // 页面初始化程序
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        // 根据id获取课程基本信息
        this.getVedio(id)
        this.listCateLog()
        this.listAlbum()
      } else {
        this.listCateLog()
      }
    },
    // 列出所有的album
    listAlbum() {
      vedioApi.listAlbum().then(Response => {
        this.albumList = Response.data.albumList
      })
    },
    // 根据id得到视频信息
    getVedio(id) {
      vedioApi.getVedio(id).then(Response => {
        this.vedioInfo = Response.data.vedio
        console.log('vedioInfo:', this.vedioInfo)
        this.fileList = [{
          name: this.vedioInfo.videoOriginalName
        }]
      })
    },

    // 下拉链表多级联动
    catelogChanged(value) {
      for (let i = 0; i < this.catelogList.length; i++) {
        if (this.catelogList[i].id === value) {
          this.albumList = this.catelogList[i].albumList
          this.vedioInfo.albumId = ''
        }
      }
    },

    // 添加新的Vedio
    addVedio() {
      vedioApi.addVedio(this.vedioInfo).then(Response => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
      })
    },

    // 获取所有的一级分类列表
    listCateLog() {
      vedioApi.listCateLog().then(Response => {
        this.catelogList = Response.data.list
        console.log('catelogList:', this.catelogList)
      })
    },

    // 路由跳转
    changeRoute() {
      this.$router.push({
        path: '/vedio/vedioList'
      })
    },

    // 更新视频信息
    updateVedio() {
      vedioApi.updateVedio(this.vedioInfo).then(Response => {
        this.$message({
          type: 'success',
          message: '更新成功!'
        })
      })
    },
    //  保存或者修改vedio信息
    saveOrUpdate() {
      if (this.$route.params && this.$route.params.id) {
        console.log('更新vedioInfo:', this.vedioInfo)
        this.updateVedio()
        this.changeRoute()
      } else {
        console.log('保存vedioInfo:', this.vedioInfo)
        this.addVedio()
        this.changeRoute()
      }
    },

    // 删除之前确认信息
    beforeVodRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },

    // 处理删除的视频文件
    handleVodRemove(file, fileList) {
      console.log(file)
      vedioApi.removeVedioSourceId(this.vedioInfo.videoSourceId).then(response => {
        this.vedioInfo.videoSourceId = ''
        this.vedioInfo.videoOriginalName = ''
        this.vedioInfo.size =
        console.log(this.vedioInfo)
        this.$message({
          type: 'success',
          message: response.message
        })
      })
    },

    // 视频上上传成功显示信息
    handleVodUploadSuccess(response, file, fileList) {
      console.log('file:', file)
      this.vedioInfo.size = file.size
      this.vedioInfo.videoSourceId = response.data.videoId
      this.vedioInfo.videoOriginalName = file.name
    },

    // 处理上传多于一个视频
    handleUploadExceed(files, fileList) {
      this.$message.warning('想要重新上传视频，请先删除已上传的视频')
    }

  }
}
</script>

<style></style>
