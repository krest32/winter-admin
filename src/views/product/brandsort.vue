<template>
<div class="app-container">
    <el-row :gutter="20">
        <!-- 总分类列表 -->
        <el-col :span="6">
            <h1>分类列表</h1>
            <catelogtree @tree-node-click="nodeclick"></catelogtree>
        </el-col>

        <el-col :span="18">
            <h2>品牌列表</h2>
            <el-button v-if="SaveBrandSortvo.sortId" type="text" @click="dialogturue">添加属性</el-button>
            <el-dialog :visible.sync="dialogVideoVisible" title="添加品牌关联">
                <el-form label-width="120px">
                    <el-form-item label="品牌介绍">
                        <el-input :placeholder="title" :disabled="true" style="width:300Px">
                        </el-input>
                    </el-form-item>
                </el-form>
                <el-checkbox-group v-model="checkedList" @change="handlecheckedBrands">
                    <el-checkbox v-for="checkbrand in CheckbrandList" :label="checkbrand.id" :key="checkbrand.id">{{checkbrand.title}}</el-checkbox>
                </el-checkbox-group>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogVideoForVisible=false">取 消</el-button>
                    <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="SaveRelation">确 定</el-button>
                </div>
            </el-dialog>

            <el-table :data="brandList" element-loading-text="拼命加载中" border fit highlight-current-row>
                <el-table-column label="序号" width="70" align="center">
                    <template slot-scope="scope">
                        <!-- 自动生成博客的序号 -->
                        {{ scope.$index + 1 }}
                    </template>
                </el-table-column>

                <el-table-column prop="title" label="品牌名称" align="center" />

                <el-table-column prop="intro" label="品牌介绍" align="center" />

                <el-table-column prop="brandImage" label="品牌图片" align="center" width="150">
                    <template slot-scope="scope">
                        <el-image :src=" scope.row.brandImage" fit="contain" style="width: 80px; height: 60px" />
                    </template>
                </el-table-column>

                <el-table-column prop="gmtCreate" label="添加时间" align="center" />

                <el-table-column prop="gmtModified" label="修改时间" align="center" />

                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <!-- <router-link :to="'/edu/teacher/edit/' + scope.row.id"> -->
                        <el-button type="danger" size="mini" icon="el-icon-edit" @click="removeRelation(scope.row.id)">删除关联</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </el-col>
    </el-row>
</div>
</template>

<script>
import productAPi from "@/api/product";
import catelogtree from '@/components/catelogtree.vue'
export default {
    inject: ['reload'], // 引入方法
    components: {
        catelogtree
    },
    data() {
        return {
            saveVideoBtnDisabled: false, // 课时按钮是否禁用
            dialogVideoFormVisible: false, // 是否显示课时表单
            dialogVideoVisible: false,
            dialogVisible: false,
            CheckbrandList: [],
            checkbrand: {},
            checkedList: [],
            brandList: [],
            brandInfo: {},
            title:'',
            SaveBrandSortvo:{
                sortId:"",
                brandIdList:[],
            }
        }
    },

    // 当页面加载时获取数据
    created() {
        this.ListAllBrand()

    },

    methods: {
        dialogturue() {
            this.dialogVideoVisible = true;
            this.ListAllBrand();
        },

        //保存SaveRelation按钮
        SaveRelation() {
            productAPi.addNewRelation(this.SaveBrandSortvo).then(Response=>{
                this.dialogVideoVisible = false;
                this.afterAddRelation()
            })


        },
        //得到品牌列表
        ListAllBrand() {
            productAPi.ListAllBrand().then(Response => {
                    this.CheckbrandList = Response.data.list
                    console.log(this.CheckbrandList)
                })
        },

        // 处理被选中的Brand
        handlecheckedBrands(value) {
            console.log(this.checkedList);
            this.SaveBrandSortvo.brandIdList=this.checkedList;
        },


        //取消品牌关联
        removeRelation(id) {
            // console.log(this.sortId,id);
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    return productAPi.cancelRelation(this.SaveBrandSortvo.sortId, id)
                })
                .then(() => {
                    this.afterAddRelation()
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

        //获得当前树节点的品牌分组
        nodeclick(node, data, component) {
            console.log(data.label);
            this.checkedList = [];
            console.log("checkedList",this.checkedList)
            this.SaveBrandSortvo.sortId = data.key;
            this.title = data.label;
            productAPi.getBrandBySortId(this.SaveBrandSortvo.sortId).then(Response => {
                    this.brandList = Response.data.brandSortVo.brandList;
                    this.checkedList = Response.data.brandSortVo.brandIdList
                    console.log("brandList",this.brandList)
                })
        },

        afterAddRelation(){
            productAPi.getBrandBySortId(this.SaveBrandSortvo.sortId).then(Response => {
                    this.brandList = Response.data.brandSortVo.brandList;
                    console.log("brandList",this.brandList)
                })
        }

    }

}
</script>

<style>

</style>
