<template>
  <div class="app-container">
    <h1>幻灯片列表</h1>
    <!-- 新增幻灯片 -->
    <el-button
      type="primary"
      @click="
        dialogVideoFormVisible = true;
        bannerInfoID = bannerInfo.id;
      ">添加专辑</el-button>
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加/修改专辑">
      <el-form label-width="120px">
        <el-form-item label="分类名称">
          <el-input v-model="bannerInfo.title" style="width: 300px" />
        </el-form-item>

        <!-- 封面上传 -->
        <el-form-item label="封面上传">
          <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :action="BASE_API + '/others/Aliyun/oss'" class="avatar-uploader">
            <img :src="bannerInfo.imageAddress" style="width: 500px">
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>

    </el-dialog>
    <!-- 标签列表 -->
    <el-table :data="bannerList" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          <!-- 自动生成博客的序号 -->
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="名称" align="center" />

      <el-table-column prop="imageAddress" label="图片" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.imageAddress" fit="contain" />
        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="添加时间" align="center" />

      <el-table-column prop="gmtModified" label="修改时间" align="center" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <!-- <router-link :to="'/edu/teacher/edit/' + scope.row.id"> -->
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="getBannerById(scope.row.id)">修改</el-button>
          <!-- </router-link> -->
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import otherApi from '@/api/other'
export default {
  inject: ['reload'], // 引入方法
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用,
      BASE_API: process.env.BASE_API, // 接口API地址
      saveVideoBtnDisabled: false, // 按钮是否禁用
      dialogVideoFormVisible: false, // 是否显示表单
      bannerList: [],
      bannerInfo: {
        imageAddress: '../static/cover.jpg'
      }
    }
  },

  // 当页面加载时获取数据
  created() {
    this.listBanner()
  },

  // 调用api层获取数据库中的数据
  methods: {
    // 更新指定的banner
    updateBanner() {
      otherApi.updateBanner(this.bannerInfo).then(Response => {
        this.$message({
          type: 'success',
          message: '更新成功'
        })
      })
    },

    // 保存Tag的操作
    helpSave() {
      this.dialogVideoFormVisible = false // 如果保存成功则关闭对话框
      this.reload()
      this.listBanner() // 刷新列表
      this.saveVideoBtnDisabled = false
    },

    // 保存或更新
    saveOrUpdate() {
      if (!this.bannerInfo.id) {
        this.addBanner()
        this.helpSave()
      } else {
        this.updateBanner()
        this.helpSave()
      }
    },
    // 取消保存
    cancel() {
      this.dialogVideoFormVisible = false
      this.reload()
    },

    // 添加新的banner
    addBanner() {
      otherApi.addBanner(this.bannerInfo).then(Response => {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      })
    },

    // 根据id得到banner信息
    getBannerById(id) {
      otherApi.getBannerById(id).then(Response => {
        this.bannerInfo = Response.data.banner
        this.dialogVideoFormVisible = true
        console.log('bannerInfo:', this.bannerInfo)
      })
    },

    // 删除指定banner
    removeDataById(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          otherApi.deleteBanner(id).then(Response => {
            this.listBanner()
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
    // //////////////////////图片管理//////////////////////////////////
    // 上传封面成功调用方法
    handleAvatarSuccess(res, file) {
      console.log(res) // 上传响应
      console.log(URL.createObjectURL(file.raw)) // base64编码
      this.bannerInfo.imageAddress = res.data.url
      this.bannerInfo.imageFilename = res.data.filename
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
    listBanner() {
      otherApi.listBanner().then(Response => {
        this.bannerList = Response.data.bannerList
        console.log('bannerList：', this.bannerList)
      })
    }

  }
}
</script>

<style></style>
