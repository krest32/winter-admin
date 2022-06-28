<template>
  <div class="app-container">
    <h1>标签列表</h1>

    <!-- 新增标签 -->
    <el-button
      type="primary"
      @click="
        dialogVideoFormVisible = true;
        tagInfoID = tagInfo.id;
      ">添加标签</el-button>

    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加/修改标签">
      <el-form label-width="120px">
        <el-form-item label="标签">
          <el-input v-model="tagInfo.title" style="width: 240px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 标签列表 -->
    <el-table :data="tagList" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          <!-- 自动生成博客的序号 -->
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="标签名称" align="center" />

      <el-table-column prop="tagUseNum" label="被使用次数" align="center" />

      <el-table-column prop="gmtCreate" label="添加时间" align="center" />

      <el-table-column prop="gmtModified" label="修改时间" align="center" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <!-- <router-link :to="'/edu/teacher/edit/' + scope.row.id"> -->
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="getTagById(scope.row.id)">修改</el-button>
          <!-- </router-link> -->
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import blogApi from '@/api/blog'
export default {
  inject: ['reload'], // 引入方法
  data() {
    return {
      saveVideoBtnDisabled: false, // 按钮是否禁用
      dialogVideoFormVisible: false, // 是否显示表单
      tagList: [],
      tagInfo: {}
    }
  },

  // 当页面加载时获取数据
  created() {
    this.TagList()
  },

  // 调用api层获取数据库中的数据
  methods: {
    // 等到tagList
    TagList() {
      blogApi.TagList()
        .then(Response => {
          this.tagList = Response.data.tagList
          console.log('taglist:', this.tagList)
        })
    },

    // 根据Id得到标签信息
    getTagById(id) {
      blogApi.getTagByID(id).then(Response => {
        this.tagInfo = Response.data.tag
        this.dialogVideoFormVisible = true
        console.log('tagInfo:', this.tagInfo)
      })
    },

    // 更新标签信息
    updateTag() {
      blogApi.updateTag(this.tagInfo).then(Response => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      })
    },

    // 删除标签
    removeDataById(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          blogApi.deleteTag(id).then(Response => {
            this.TagList()
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

    // 新增标签
    addTag() {
      blogApi.addTag(this.tagInfo).then(Response => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
      })
    },

    // 保存Tag的操作
    helpSave() {
      this.dialogVideoFormVisible = false // 如果保存成功则关闭对话框
      this.reload()
      this.TagList() // 刷新列表
      this.saveVideoBtnDisabled = false
    },

    saveOrUpdate() {
      this.saveVideoBtnDisabled = true
      if (!this.tagInfo.id) {
        this.addTag()
        this.helpSave()
      } else {
        this.updateTag()
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
