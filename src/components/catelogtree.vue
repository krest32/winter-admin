<template>
<el-tree :data="catelogList" :props="defaultProps" highlight-current @node-click="nodeclick" node-key="id" default-expand-all ></el-tree>
</template>

<script>
import productApi from "@/api/product";
export default {

    data() {
        return {
            catelogList: [],
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
        this.GetALlCateLog();
    },
    methods: {
        nodeclick(data,node,component){
            //向父组件发送事件
            this.$emit("tree-node-click",data,node,component)
        },

        //获取所有的catelog列表
        GetALlCateLog() {
            productApi.GetAllCateLog()
                .then(Response => {
                    this.catelogList = Response.data.catelogList
                    // console.log(this.catelogList)
                })
        },

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
