<template>
  <div class="app-container">
    <h1>视频订单列表</h1>

    <!-- 条件查询博客 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="作者名称">
        <el-input v-model="queryMemberVo.name" />
      </el-form-item>

      <el-form-item label="性别">
        <el-select v-model="queryMemberVo.sex" clearable placeholder="请选择">
          <el-option :value="0" label="男" />
          <el-option :value="1" label="女" />
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="PageQueryMember()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- Author表格 -->
    <el-table :data="memberList" element-loading-text="拼命加载中" border="border" fit="fit" highlight-current-row="highlight-current-row">
      <!-- 序号 -->
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          <!-- 自动生成博客的序号 -->
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="id" label="用户ID" align="center" />

      <el-table-column prop="nickname" label="用户昵称" align="center" />

      <el-table-column prop="sex" label="性别" align="center" >
      <template slot-scope="scope">
          {{ scope.row.sex == 0 ? "男" : "女" }}
        </template>
      </el-table-column>

      
      <el-table-column prop="avatar" label="头像" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.avatar" fit="contain" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
          

      <el-table-column prop="mobile" label="手机号码" align="center" />

      <el-table-column prop="mail" label="邮箱" align="center" />
      
      <el-table-column prop="gmtCreate" label="注册时间" align="center" />

    </el-table>

    <!-- 分页插件 -->
    <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center" layout="total, prev, pager, next, jumper" @current-change="PageQueryMember" />
  </div>
</template>

<script>
import memberApi from '@/api/member'
import vedioOrderApi from '@/api/order'
export default {
  inject: ['reload'], // 引入方法
  data() {
    return {
      fit: 'contain',
      page: 1,
      limit: 10,
      total: 0,
      queryVedioOrder: {},
      queryMemberVo:{},
      orderList:[],
      memberList:[],
    }
  },

  // 当页面加载时获取数据
  created() {
    this.PageQueryMember();
  },

  // 调用api层获取数据库中的数据
  methods: {
    // 获取会员列表
    PageQueryMember(page = 1) {
      this.page = page
      memberApi.getMemberList(this.page, this.limit, this.queryMemberVo).then((Response) => {
        this.total = Response.data.total
        this.memberList = Response.data.records
        console.log('total:', this.total)
        console.log('memberList:', this.memberList)
      })
    },


    // 清空搜索条件
    resetData() {
      this.queryMemberVo = {}
      this.PageQueryMember()
    }
  }
}
</script>

<style></style>
