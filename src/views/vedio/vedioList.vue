<template>
  <div class="app-container">
    <h1>视频列表</h1>

    <!-- 条件查询视频 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input v-model="queryVedioVo.title" />
      </el-form-item>
      <!-- 分类信息下拉列表 -->
      <el-form-item label="分类">
        <el-select v-model="queryVedioVo.catelogId" placeholder="分类选择" style="width: 240px" @change="catelogChanged">
          <el-option v-for="catelog in catelogList" :key="catelog.id" :label="catelog.title" :value="catelog.id" />
        </el-select>

        <el-select v-model="queryVedioVo.albumId" placeholder="专辑选择" style="width: 240px">
          <el-option v-for="album in albumList" :key="album.title" :label="album.title" :value="album.id"/>
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="querySearchVedio()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 视频列表 -->
    <el-table :data="vedioList" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          <!-- 自动生成博客的序号 -->
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="分类名称" align="center" />

      <el-table-column prop="albumTitle" label="专辑名称" align="center" />

      <el-table-column prop="catelogTitle" label="视频分类" align="center" />

      <el-table-column prop="vedioSize" label="大小" align="center" />

      <el-table-column prop="price" label="价格" align="center" />

      <el-table-column prop="pictureAddress" label="封面" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.pictureAddress" fit="contain" />
        </template>
      </el-table-column>

      <el-table-column prop="clickCount" label="点击数" align="center" />

      <el-table-column prop="collectCount" label="收藏数" align="center" />

      <el-table-column prop="puyCount" label="购买数" align="center" />

      <el-table-column prop="gmtCreate" label="添加时间" align="center" />

      <el-table-column prop="gmtModified" label="修改时间" align="center" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <!-- <router-link :to="'/edu/teacher/edit/' + scope.row.id"> -->
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editVedioById(scope.row.id)">修改</el-button>
          <!-- </router-link> -->
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center" layout="total, prev, pager, next, jumper" @current-change="querySearchVedio" />

  </div>
</template>

<script>
import vedioApi from '@/api/vedio'
export default {
  inject: ['reload'], // 引入方法
  data() {
    return {
      catelogList: [],
      page: 0,
      limit: 10,
      total: 0,
      vedioList: [],
      queryVedioVo: {
        albumId: '',
        catelogId: ''
      },
      albumList: []

    }
  },

  // 当页面加载时获取数据
  created() {
    this.listCateLog()
    this.querySearchVedio()
  },

  // 调用api层获取数据库中的数据
  methods: {

    // 下拉链表多级联动
    catelogChanged(value) {
      for (let i = 0; i < this.catelogList.length; i++) {
        if (this.catelogList[i].id === value) {
          this.albumList = this.catelogList[i].albumList
          this.queryVedioVo.albumId = ''
        }
      }
    },

    resetData() {
      this.queryVedioVo = {}
      this.querySearchVedio()
    },

    // 获取vedio列表
    querySearchVedio(page = 1) {
      this.page = page
      vedioApi.querySearchVedio(this.page, this.limit, this.queryVedioVo).then(Response => {
        this.total = Response.data.total
        this.vedioList = Response.data.vedioList
        console.log('total：', this.total)
        console.log('vedioList:', this.vedioList)
      })
    },

    // 根据id删除 vedio
    removeDataById(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          vedioApi.deleteVedio(id).then(Response => {
            this.querySearchVedio()
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

    // 根据id的跳转修改vedio页面
    editVedioById(id) {
      this.$router.push({
        path: '/vedio/vedio_update/' + id
      })
    },

    // 列出所有的catelog
    listCateLog() {
      vedioApi.listCateLog().then(Response => {
        this.catelogList = Response.data.list
        console.log('catelogList:', this.catelogList)
      })
    }

  }
}
</script>

<style></style>
