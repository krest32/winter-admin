<template>
  <div class="app-container">
    <h1>分类列表</h1>
    <!-- 新增标签 -->
    <el-button
      type="primary"
      @click="
        dialogVideoFormVisible = true;
        catelogInfoID = catelogInfo.id;
      ">添加标签</el-button>

    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加/修改分类">
      <el-form label-width="120px">
        <el-form-item label="分类名称">
          <el-input v-model="catelogInfo.title" style="width: 300px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 标签列表 -->
    <el-table :data="catelogList" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          <!-- 自动生成博客的序号 -->
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="分类名称" align="center" />

      <el-table-column prop="albumNum" label="专辑数量" align="center" />

      <el-table-column prop="vedioNum" label="视频数量" align="center" />

      <el-table-column prop="gmtCreate" label="添加时间" align="center" />

      <el-table-column prop="gmtModified" label="修改时间" align="center" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <!-- <router-link :to="'/edu/teacher/edit/' + scope.row.id"> -->
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="getCatelogById(scope.row.id)">修改</el-button>
          <!-- </router-link> -->
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import vedioApi from '@/api/vedio'
export default {
  inject: ['reload'], // 引入方法
  data() {
    return {
      saveVideoBtnDisabled: false, // 按钮是否禁用
      dialogVideoFormVisible: false, // 是否显示表单
      catelogList: [],
      catelogInfo: {}
    }
  },

  // 当页面加载时获取数据
  created() {
    this.listCateLog()
  },

  // 调用api层获取数据库中的数据
  methods: {

    // 根据id删除catelog
    removeDataById(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          vedioApi.deleteCatelog(id).then(Response => {
            this.listCateLog()
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
    getCatelogById(id) {
      vedioApi.getCatelogById(id).then(Response => {
        this.catelogInfo = Response.data.catelog
        this.dialogVideoFormVisible = true
        console.log('cateLogInfo:', this.catelogInfo)
      })
    },

    // 列出所有的catelog
    listCateLog() {
      vedioApi.listCateLog().then(Response => {
        this.catelogList = Response.data.list
        console.log('catelogList:', this.catelogList)
      })
    },

    // 更新catelog信息
    updateCatelog() {
      vedioApi.updateCatelog(this.catelogInfo).then(Response => {
        this.$message({
          type: 'success',
          message: '更新成功!'
        })
      })
    },
    // 添加新的catelog
    addCateLog() {
      vedioApi.addCateLog(this.catelogInfo).then(Response => {
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
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
      if (!this.catelogInfo.id) {
        this.addCateLog()
        this.helpSave()
      } else {
        this.updateCatelog()
        this.helpSave()
      }
    },
    // 取消保存
    cancel() {
      this.dialogVideoFormVisible = false
      this.reload()
    }

  }
}
</script>

<style></style>
