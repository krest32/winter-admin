<template>
  <div class="app-container">
    <h1>博客列表</h1>

    <!-- 条件查询博客 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="博客名称">
        <el-input v-model="queryBlogVo.title" />
      </el-form-item>

      <el-form-item label="作者">
        <el-select v-model="queryBlogVo.authorId" placeholder="请选择">
          <el-option v-for="author in authorList" :key="author.id" :label="author.name" :value="author.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="主题分类">
        <el-select v-model="queryBlogVo.blogSortId" placeholder="请选择">
          <el-option v-for="blogSort in sortList" :key="blogSort.id" :label="blogSort.title" :value="blogSort.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="发布状态">
        <el-select v-model="queryBlogVo.status" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="0" label="草稿" />
          <el-option :value="1" label="已发布" />
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="PageQueryBlog()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!--列表部分 -->
    <el-table :data="blogList" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label="序号" align="center">
        <template slot-scope="scope">
          <!-- 自动生成博客的序号 -->
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="标题" align="center" />

      <el-table-column prop="summary" label="简介" align="center" />

      <el-table-column prop="authorName" label="作者" align="center" />

      <el-table-column prop="blogSortTitle" label="分类" align="center" />

      <el-table-column prop="price" label="价格" align="center" >
        <template slot-scope="scope">
          {{ scope.row.price === 0 ? "免费" : scope.row.price }}
        </template>
      </el-table-column>

      <el-table-column prop="puyCount" label="购买数" align="center" />

      <el-table-column prop="collectCount" label="收藏数" align="center" />

      <el-table-column prop="clickCount" label="点击数" align="center" />

      <el-table-column :show-overflow-tooltip="true" prop="status" label="是否上架" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" @change="stateChanged(scope.row.id)"/>
        </template>
      </el-table-column>

      <el-table-column prop="pictureAddress" label="图片" align="center" >
        <template slot-scope="scope">
          <el-image :src=" scope.row.pictureAddress" fit="contain" />
        </template>
      </el-table-column>

      <el-table-column prop="gmtModified" label="修改时间" align="center" />

      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <!-- <router-link :to="'/edu/teacher/edit/' + scope.row.id"> -->
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="getBlogById(scope.row.id)">修改</el-button>
          <!-- </router-link> -->
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteBlogById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center" layout="total, prev, pager, next, jumper" @current-change="PageQueryBlog" />

  </div>
</template>

<script>
import blogApi from '@/api/blog'
export default {
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      blogList: [],
      blogInfo: {},
      queryBlogVo: {},
      authorList: [],
      sortList: []

    }
  },

  // 当页面加载时获取数据
  created() {
    this.PageQueryBlog()
    this.listAllAuthor()
    this.listAllSort()
  },

  // 调用api层获取数据库中的数据
  methods: {

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

    // 更改blog状态
    stateChanged(id) {
      blogApi.changeStatus(id).then(Response => {
        this.PageQueryBlog()
      })
    },

    // 跳转修改页面
    getBlogById(id) {
      this.$router.push({
        path: '/blogs/blog_update/' + id
      })
    },
    // 删除Blog
    deleteBlogById(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          blogApi.deleteBlog(id).then(Response => {
            this.PageQueryBlog()
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
    // 获取博客列表
    PageQueryBlog(page = 1) {
      this.page = page
      blogApi.PageQueryBlog(this.page, this.limit, this.queryBlogVo).then(Response => {
        this.blogList = Response.data.list
        this.total = Response.data.total
        console.log('total:', this.total)
        console.log('blogList:', this.blogList)
      })
    },
    resetData() {
      this.queryBlogVo = {}
      this.PageQueryBlog()
    }

  }
}
</script>

<style></style>
