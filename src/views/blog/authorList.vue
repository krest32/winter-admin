<template>
  <div class="app-container">
    <h1>作者列表</h1>

    <!-- 新增作者对话框 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加/修改作者">
      <el-form ref="authorInfo" :model="authorInfo" label-width="120px">
        <el-form-item label="名字">
          <el-input v-model="authorInfo.name" style="width: 240px" />
        </el-form-item>

        <el-form-item label="性别" style="width: 1000px">
          <el-select v-model="authorInfo.sex" clearable="clearable" placeholder="性别" style="width: 200px">
            <el-option :value="0" label="男" />
            <el-option :value="1" label="女" />
          </el-select>
        </el-form-item>

        <el-form-item label="头像">
          <!-- 头衔缩略图 -->
          <pan-thumb :image="authorInfo.pictureAddress" />
          <!-- 文件上传按钮 -->
          <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow = true">更换头像</el-button>
          <!-- v-show：是否显示上传组件 :key：类似于id，如果一个页面多个图片上传控件，可以做区分 :url：后台上传的url地址
                    @close：关闭上传组件 @crop-upload-success：上传成功后的回调 -->
          <image-cropper v-show="imagecropperShow" :width="300" :height="300" :key="imagecropperKey" :url="BASE_API + '/others/Aliyun/oss'" field="file" @close="close" @crop-upload-success="cropSuccess" />
        </el-form-item>

        <!-- 作者简介 -->
        <el-form-item label="简介">
          <el-input v-model="authorInfo.summary" style="width: 240px" type="textarea" maxlength="40" show-word-limit="show-word-limit" />
        </el-form-item>

        <!-- 作者资历 -->
        <el-form-item label="资历">
          <el-input v-model="authorInfo.intro" :rows="5" type="textarea" style="width: 400px" maxlength="200" show-word-limit="show-word-limit" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 条件查询博客 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="作者名称">
        <el-input v-model="queryAuthorVo.name" />
      </el-form-item>

      <el-form-item label="性别">
        <el-select v-model="queryAuthorVo.sex" clearable placeholder="请选择">
          <el-option :value="0" label="男" />
          <el-option :value="1" label="女" />
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="PageQueryAuthor()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
      <el-button type="primary" @click="dialogVideoFormVisible = true">添加作者</el-button>
    </el-form>

    <!-- Author表格 -->
    <el-table :data="authorList" element-loading-text="拼命加载中" border="border" fit="fit" highlight-current-row="highlight-current-row">
      <!-- 序号 -->
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          <!-- 自动生成博客的序号 -->
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名字" align="center" />

      <el-table-column prop="sex" label="性别" align="center">
        <template slot-scope="scope">
          {{ scope.row.sex == 0 ? "男" : "女" }}
        </template>
      </el-table-column>

      <el-table-column prop="pictureAddress" label="头像" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.pictureAddress" fit="contain" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>

      <el-table-column prop="summary" label="简介" align="center" />

      <el-table-column prop="intro" label="个人总结" align="center" />

      <el-table-column prop="publishBlogNum" label="文章数量" align="center" />

      <el-table-column prop="gmtCreate" label="添加时间" align="center" />

      <el-table-column prop="gmtModified" label="修改时间" align="center" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <!-- <router-link :to="'/edu/teacher/edit/' + scope.row.id"> -->
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="getAuthorById(scope.row.id)">修改</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页插件 -->
    <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center" layout="total, prev, pager, next, jumper" @current-change="PageQueryAuthor" />
  </div>
</template>

<script>
import blogApi from '@/api/blog'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
  components: {
    ImageCropper,
    PanThumb
  },
  inject: ['reload'], // 引入方法
  data() {
    return {
      fit: 'contain',
      page: 1,
      limit: 20,
      total: 0,
      queryAuthorVo: {},
      authorInfo: {
        pictureAddress: '../static/cover.jpg'
      },
      authorList: [],
      saveVideoBtnDisabled: false, // 课时按钮是否禁用
      dialogVideoFormVisible: false, // 是否显示课时表单
      BASE_API: process.env.BASE_API, // 接口API地址
      imagecropperShow: false, // 是否显示上传组件
      imagecropperKey: 0 // 上传组件id
    }
  },

  // 当页面加载时获取数据
  created() {
    this.PageQueryAuthor()
  },

  // 调用api层获取数据库中的数据
  methods: {
    // 根据Id删除Author
    removeDataById(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          blogApi.deleteAuthor(id).then(Response => {
            this.PageQueryAuthor()
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
    // 更新Author信息
    updateAuthor() {
      blogApi.updateAuthor(this.authorInfo).then(Response => {
        this.$message({
          type: 'success',
          message: '更新成功!'
        })
      })
    },

    // 根据Id得到Author信息
    getAuthorById(id) {
      blogApi.getAuthorById(id).then(Response => {
        this.authorInfo = Response.data.author
        console.log('authorInfo:', this.authorInfo)
        this.dialogVideoFormVisible = true
      })
    },

    // 清空搜索条件
    resetData() {
      this.queryAuthorVo = {}
      this.PageQueryAuthor()
    },

    // 获取Author列表
    PageQueryAuthor(page = 1) {
      this.page = page
      blogApi.PageQueryAuthor(this.page, this.limit, this.queryAuthorVo).then((Response) => {
        this.total = Response.data.total
        this.authorList = Response.data.list
        console.log('total:', this.total)
        console.log('authorList:', this.authorList)
      })
    },

    // 新增作者
    addAuthor() {
      blogApi.addAuthor(this.authorInfo).then((Response) => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
      })
    },

    // 上传成功后的回调函数
    cropSuccess(data) {
      console.log(data)
      this.imagecropperShow = false
      this.authorInfo.pictureAddress = data.url
      this.authorInfo.pictureName = data.filename
      // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1
    },

    // 关闭上传组件
    close() {
      this.imagecropperShow = false
      // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1
    },

    // 取消上传
    cancel() {
      this.dialogVideoFormVisible = false
      this.btnaction()
    },

    // 页面切换刷新
    btnaction() {
      this.dialogVideoFormVisible = true
      this.PageQueryAuthor()
      this.reload()
    },

    // 提交注册信息
    saveOrUpdate() {
      if (!this.authorInfo.id) {
        this.addAuthor()
        this.btnaction()
      } else {
        this.updateAuthor()
        this.btnaction()
      }
    }
  }
}
</script>

<style></style>
