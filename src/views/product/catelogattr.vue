<template>
<div class="app-container">
    <el-row :gutter="20">
        <!-- 总分类列表 -->
        <el-col :span="5">
            <h1>分类列表</h1>
            <catelogtree @tree-node-click="nodeclick"></catelogtree>
        </el-col>

        <el-col :span="6">
            <h1>属性分组列表</h1>
            <el-row>
                <el-button type="primary" @click="dialogVideoFormVisible = true" v-if="sortId">{{sortTitle}}：添加属性分组</el-button>
            </el-row>
            <el-dialog :visible.sync="dialogVideoFormVisible" title="添加/修改AttrGroup">
                <el-form :model="attrGroupInfo" label-width="120px">
                    <el-form-item label="标题">
                        <el-input v-model="attrGroupInfo.title" style="width: 240px" />
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">

                    <el-button @click="cancelAddAttrGroup">取 消</el-button>
                    <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="SaveOrupdateAttrGroup">确 定</el-button>
                </div>
            </el-dialog>

            <el-tree :data="attrGroupList" node-key="id" default-expand-all highlight-current :expand-on-click-node="false" :props="defaultProps" @node-click="handleAttrGroupClick">
                <span class="cus-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span>
                        <el-button type="text" size="mini" @click="modifiedArrGroup(node, data)">
                            修改
                        </el-button>
                        <el-button type="text" size="mini" @click="removeArrGroup(node, data)" v-if="data.attrNum===0">
                            删除
                        </el-button>
                    </span>
                </span>
            </el-tree>
        </el-col>

        <el-col :span="12">
            <h1>属性列表</h1>
            <el-row>
                <el-button type="primary" @click="dialogVideoVisible = true" v-if="sortId && attrInfo.attrGroupId">
                    {{sortTitle}}->{{groupTitle}}->添加属性</el-button>
            </el-row>
            <el-dialog :visible.sync="dialogVideoVisible" title="添加/修改Attr">
                <el-form :model="attrGroupInfo" label-width="120px">
                    <el-form-item label="标题">
                        <el-input v-model="attrInfo.title" style="width: 240px" />
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancelAddAttr">取 消</el-button>
                    <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="SaveOrupdateAttr">确 定</el-button>
                </div>
            </el-dialog>

            <el-table :data="attrList" element-loading-text="拼命加载中" border fit highlight-current-row v-if="sortId && attrInfo.attrGroupId">
                <el-table-column label="序号" width="70" align="center">
                    <template slot-scope="scope">
                        <!-- 自动生成博客的序号 -->
                        {{ scope.$index + 1 }}
                    </template>
                </el-table-column>

                <el-table-column prop="title" label="分类名称" align="center" />

                <el-table-column prop="attrUseNum" label="使用数量" align="center" />

                <el-table-column prop="gmtCreate" label="添加时间" align="center" />

                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <!-- <router-link :to="'/edu/teacher/edit/' + scope.row.id"> -->
                        <el-button type="primary" size="mini" icon="el-icon-edit" @click="editAttr(scope.row.id)">修改</el-button>
                        <!-- </router-link> -->
                        <el-button v-if="scope.row.attrUseNum===0" type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </el-col>
    </el-row>
</div>
</template>

<script>
import productAPi from "@/api/product"
import catelogtree from '@/components/catelogtree.vue'
export default {
    inject: ['reload'], // 引入方法
    components: {
        catelogtree
    },
    data() {
        return {
            groupTitle: '',
            saveVideoBtnDisabled: false, // 课时按钮是否禁用
            dialogVideoFormVisible: false, // 是否显示课时表单
            dialogVideoVisible: false,
            dialogVisible: false,
            attrGroupInfo: {
                id: '',

            },
            attrGroupList: [],
            attrList: [],
            defaultProps: {
                children: 'children',
                label: 'title'
            },
            sortId: "",
            sortTitle: '',
            attrInfo: {
                attrGroupId: ''
            },
        }
    },
    created() {},
    methods: {

        cancelAddAttrGroup() {
            this.dialogVideoFormVisible = false
            this.attrGroupInfo.title = ''
        },
        cancelAddAttr() {
            this.dialogVideoVisible = false
            this.attrInfo.title = ''
        },

        //根据id得到Attr
        getAttrById(id) {
            productAPi.getAttrById(id).then(Response => {
                this.attrInfo = Response.data.attr
            })
        },

        //打开修改Attr的窗口
        editAttr(id) {
            this.attrInfo.id = id
            this.dialogVideoVisible = true;
            this.getAttrById(this.attrInfo.id);
        },

        //修改已有的Attr
        updateAttr() {
            productAPi.updateAttr(this.attrInfo).then(Response => {
                this.dialogVideoVisible = false
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                })
                this.attrInfo.id = ''
                this.attrInfo.title = ''
                this.afterEditAttrInfo();
            })
        },

        //添加或保存attr按钮
        SaveOrupdateAttr() {
            if (this.attrInfo.id) {
                this.updateAttr();
                this.afterEditAttrInfo();
            } else {
                this.addNewAttr();
                this.afterEditAttrInfo();
            }
        },

        //添加新的attr
        addNewAttr() {
            productAPi.addNewAttr(this.attrInfo).then(Response => {
                this.dialogVideoVisible = false
                this.$message({
                    type: 'success',
                    message: '保存成功!'
                })
                this.attrInfo.title = ''
                this.afterEditAttrInfo()
                this.afterEditAttrGroup()
            })
        },

        removeDataById(id) {
            // console.log(this.sortId,id);
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    return productAPi.deleteAttrById(id)
                })
                .then(() => {
                    this.afterEditAttrInfo()
                    this.afterEditAttrGroup()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
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

        afterEditAttrInfo() {
            productAPi.getAttrByGroupId(this.attrInfo.attrGroupId).then(Response => {
                this.attrList = Response.data.attrList;
            })
        },

        //修改属性分类
        modifiedArrGroup(node) {
            this.dialogVideoFormVisible = true;
            this.attrGroupInfo.id = node.data.id;
            this.getAttrGroup();
            console.log(node.data.id);
        },

        updateAttrGroup() {
            console.log(this.attrGroupInfo)
            productAPi.updateNewAttrGroup(this.attrGroupInfo).then(Response => {
                this.dialogVideoFormVisible = false;
                this.afterEditAttrGroup()
            })
        },
        //添加新的分类
        SaveOrupdateAttrGroup() {
            if (this.attrGroupInfo.id) {
                this.updateAttrGroup()
                this.afterEditAttrGroup()
            } else {
                this.addNewAttrGroup()
                this.afterEditAttrGroup()
            }
        },
        //添加属性分类
        addNewAttrGroup() {
            this.attrGroupInfo.oneSortId = this.sortId;
            productAPi.addNewAttrGroup(this.attrGroupInfo).then(Response => {
                this.dialogVideoFormVisible = false;
                this.afterEditAttrGroup()
            })
        },

        afterEditAttrGroup() {
            productAPi.GetAttrGroupById(this.sortId).then(Response => {
                this.attrGroupList = Response.data.attrGopurList;
                console.log(this.attrGroupList);
                this.attrGroupInfo.title = ''
            })
        },

        //得到属性列表
        handleAttrGroupClick(node, data) {
            this.attrInfo.attrGroupId = node.id;
            this.groupTitle = node.title
            console.log(this.attrInfo.attrGroupId);
            productAPi.getAttrByGroupId(node.id).then(Response => {
                this.attrList = Response.data.attrList;
            })
        },

        //获得当前树节点的属性分组
        nodeclick(node, data, component) {
            console.log(data);
            this.sortId = data.key;
            this.sortTitle = node.title
            this.attrInfo.attrGroupId = ''

            productAPi.GetAttrGroupById(data.key).then(Response => {
                this.attrGroupList = Response.data.attrGopurList;
                console.log(this.attrGroupList);
            })
        },
        //删除属性分组
        removeArrGroup(node, data) {
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    console.log(data.id)
                    return productAPi.deleteAttrGroup(data.id)
                })
                .then(() => {
                    this.afterEditAttrGroup()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
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
        getAttrGroup() {
            productAPi.getAttrGroupInfo(this.attrGroupInfo.id).then(Response => {
                this.attrGroupInfo = Response.data.attrGroupInfo
            })
        }

    }
}
</script>

<style>
.el-row {
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}

.cus-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
</style>
