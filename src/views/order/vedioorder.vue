<template>
  <div class="app-container">
    <h1>视频订单列表</h1>

    <!-- 条件查询博客 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="作者名称">
        <el-input v-model="queryVedioOrder.memberName" />
      </el-form-item>

      <el-form-item label="支付状态">
        <el-select v-model="queryVedioOrder.status" clearable placeholder="请选择">
          <el-option :value="0" label="未支付" />
          <el-option :value="1" label="已支付" />
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="PageQueryOrder()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- Author表格 -->
    <el-table :data="orderList" element-loading-text="拼命加载中" border="border" fit="fit" highlight-current-row="highlight-current-row">
      <!-- 序号 -->
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          <!-- 自动生成博客的序号 -->
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="id" label="订单编号" align="center" />

      <el-table-column prop="albumInfo.title" label="专辑名称" align="center" />

      <el-table-column prop="memberId" label="用户id" align="center" />

      <el-table-column prop="memberName" label="用户名称" align="center" />

      <el-table-column prop="payStatus" label="支付状态" align="center" />
      
      <el-table-column prop="payTypeString" label="支付方式" align="center" />

      <el-table-column prop="gmtCreate" label="订单时间" align="center" />

    </el-table>

    <!-- 分页插件 -->
    <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center" layout="total, prev, pager, next, jumper" @current-change="PageQueryOrder" />
  </div>
</template>

<script>
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
      orderList:[]
    }
  },

  // 当页面加载时获取数据
  created() {
    this.PageQueryOrder();
  },

  // 调用api层获取数据库中的数据
  methods: {
    // 获取订单列表
    PageQueryOrder(page = 1) {
      this.page = page
      vedioOrderApi.listVedioOrder(this.page, this.limit, this.queryVedioOrder).then((Response) => {
        this.total = Response.data.total
        this.orderList = Response.data.record
        console.log('total:', this.total)
        console.log('orderList:', this.orderList)
      })
    },

    // 清空搜索条件
    resetData() {
      this.queryVedioOrder = {}
      this.PageQueryOrder()
    }
  }
}
</script>

<style></style>
