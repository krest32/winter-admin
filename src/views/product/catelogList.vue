<template>
<div class="app-container">

    <div class="custom-tree-container">

        <el-button type="primary" @click="dialogVideoFormVisible = true">添加新的三级分类</el-button>

        <el-dialog :visible.sync="dialogVideoFormVisible" title="添加/修改作者">
            <el-form :model="cateLogInfo" label-width="120px">
                <el-form-item label="标题">
                    <el-input v-model="cateLogInfo.title" style="width: 240px" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVideoFormVisible=false">取 消</el-button>
                <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="submitRegister">确 定</el-button>
            </div>
        </el-dialog>

        <el-tree :data="catelogList" :props="defaultProps" @node-click="handleNodeClick" node-key="id" default-expand-all :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node }">
                <span>{{ node.label }}</span>
                <span>
                    <el-dialog title="添加分类" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                        <el-form :model="cateLogInfo">
                            <el-form-item label="添加分类名称">
                                <el-input v-model="cateLogInfo.title" style="width:280px"></el-input>
                            </el-form-item>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="SaveNewCateLog">确 定</el-button>
                        </span>
                    </el-dialog>

                    <el-button v-if="node.childNodes.length==0 & node.data.productNum==0" type="danger" size="mini" @click="remove(node)">
                        删除
                    </el-button>
                    <el-button type="text" size="mini" @click="modified(node)">
                        修改
                    </el-button>
                    <el-button v-if="node.level<=2 " type="text" size="mini" @click="append(node)">
                        添加
                    </el-button>
                </span>

            </span>
        </el-tree>
    </div>

</div>
</template>

<script>
import productApi from "@/api/product";
export default {
    inject: ['reload'],
    data() {
        return {
            saveVideoBtnDisabled: false, // 课时按钮是否禁用
            dialogVideoFormVisible: false, // 是否显示课时表单
            dialogVisible: false,
            catelogList: [],
            cateLogInfo: {},
            node: {
                id: '',
                title: '',
                parentId: '',
            },
            defaultProps: {
                children: 'childrenCatelogs',
                label: 'title'
            }
        };
    },

    created() {
        this.GetAllCateLog();
    },
    methods: {
        // 提交添加新的catelog
        submitRegister() {
            this.saveVideoBtnDisabled = true
            productApi.AddNewMainCateLog(this.cateLogInfo)
                .then(Response => {
                    this.dialogVideoFormVisible = false;
                    this.GetAllCateLog();
                    this.reload();
                })
        },

        // 修改属性值
        modified(node) {
            this.cateLogInfo.id = node.data.id
            this.dialogVisible = true;
            productApi.GetCateLogByID(this.cateLogInfo.id).then(Response=>{
                this.cateLogInfo=Response.data.catelog
            })

        },

        //更新方法
        UpdateNewCateLog() {
            productApi.UpdateNewCateLog(this.cateLogInfo).then(Response => {
                    this.dialogVisible = false;
                })
        },

        //添加方法
        append(node) {
            this.cateLogInfo.parentId = node.data.id;
            this.dialogVisible = true;
            // this.cateLogInfo.parentId =this. node.data.id;
            this.GetAllCateLog();
        },

        //保存或更新分类
        SaveNewCateLog() {
            if (this.cateLogInfo.id != null) {
                this.UpdateNewCateLog();
                this.GetAllCateLog();
                this.reload();
                this.cateLogInfo = "";
            } else {
                this.SaveCateLog();
                this.cateLogInfo = "";
                 this.GetAllCateLog();
                this.reload()

            }
        },

        // //添加新的分类
        SaveCateLog() {
            console.log(this.cateLogInfo)
            if (this.cateLogInfo.id != null) {}
            productApi.AddNewCateLog(this.cateLogInfo)
                .then(Response => {
                    this.dialogVisible = false;
                })
        },

        //删除方法
        remove(node, data) {
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    return productApi.deleteCateLog(node.data.id)
                })
                .then(() => {
                    this.GetAllCateLog()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                })
        },
        //获取所有的catelog列表
        GetAllCateLog() {
            productApi.GetAllCateLog().then(Response => {
                    this.catelogList = Response.data.catelogList
                    console.log(this.catelogList)
                    this.title = "";

                })
        },

        handleNodeClick(node) {
            // console.log(node);

        },

        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        }
    },

};
</script>

<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 800px;
}
</style>
