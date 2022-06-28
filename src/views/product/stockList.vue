<template>
<div class="app-container">
    <h1>库存页面：{{total}}</h1>

    <!-- 新增标签 -->
    <el-row :gutter="20">
        <!-- 总分类列表 -->
        <el-col :span="17">
            <h1>商品列表</h1>
            <!-- 条件查询产品 -->
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="商品名称" width="200">
                    <el-input v-model="queryStock.productTitle" />
                </el-form-item>

                <el-button type="primary" icon="el-icon-search" @click="ListStock()">查询</el-button>
                <el-button type="default" @click="resetData">清空</el-button>
                <el-button type="primary" @click="flushStock">刷新库存</el-button>
            </el-form>
        </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加/修改库存">
        <el-form label-width="120px">
            <el-form-item label="可用库存数量">
                <el-input :disabled="true" v-model="stockInfo.productTitle" :min="1" style="width: 240px" />
            </el-form-item>

            <el-form-item label="可用库存数量">
                <el-input-number v-model="stockInfo.stock" :min="0" style="width: 240px" />
            </el-form-item>

            <el-form-item label="锁定库存数量">
                <el-input-number v-model="stockInfo.lockStock" :min="0" style="width: 240px" />
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="UpdateData">确 定</el-button>
        </div>
    </el-dialog>

    <el-table :data="stockList" element-loading-text="拼命加载中" border fit highlight-current-row>
        <el-table-column label="序号" width="70" align="center">
            <template slot-scope="scope">
                <!-- 自动生成博客的序号 -->
                {{ scope.$index + 1 }}
            </template>
        </el-table-column>

        <el-table-column prop="productTitle" label="产品名称" align="center" />

        <el-table-column prop="stock" label="可用库存" align="center" />

        <el-table-column prop="lockStock" label="锁定库存" align="center" />

        <el-table-column prop="stockTotal" label="总库存" align="center" />

        <el-table-column prop="gmtCreate" label="添加时间" align="center" />

        <el-table-column prop="gmtModified" label="修改时间" align="center" />

        <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
                <!-- <router-link :to="'/edu/teacher/edit/' + scope.row.id"> -->
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="editStock(scope.row.id)">修改库存</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页插件 -->
    <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center" layout="total, prev, pager, next, jumper" @current-change="ListStock" />

</div>
</template>

<script>
import stockAPi from '@/api/stock'
export default {
    inject: ['reload'], // 引入方法
    data() {
        return {
            saveVideoBtnDisabled: false,
            dialogVideoFormVisible: false,
            page: 0,
            limit: 10,
            total: 0,
            queryStock: {
                productTitle: ""
            },
            stockList: [],
            productlist: [],
            stockInfo: {
                id: '',
            }

        }
    },

    // 当页面加载时获取数据
    created() {
        this.init()
    },

    methods: {
        // 刷新库存
        flushStock() {
            stockAPi.flushStock().then(Response => {
                this.init()
                this.$router.push({
                    path: '/product/stockList/'
                })
                this.reload()
            })
        },

        // 清空查询数据
        resetData() {
            this.queryStock.productTitle = ''
            this.ListStock()
        },

        // 初始化方法
        init() {
            if (this.$route.params && this.$route.params.id) {
                const id = this.$route.params.id;
                this.getStockByProductId(id);
            } else {
                this.ListStock();
            }

        },

        getStockByProductId(id) {
            stockAPi.getStockByProductId(id).then(Response => {
                this.stockList = Response.data.stocks
                this.total = 1;
            })
        },

        editStock(id) {
            this.dialogVideoFormVisible = true;
            this.getStockById(id);

        },

        getStockById(id) {
            stockAPi.getStockById(id).then(Response => {
                this.stockInfo = Response.data.stock
            })
        },

        updateStock(id) {
            stockAPi.updateStock(this.stockInfo).then(Response => {
                this.dialogVideoFormVisible = false;
                this.ListStock();
            })

        },

        UpdateData() {
            this.updateStock();
            this.reload();
        },

        cancel() {
            this.dialogVideoFormVisible = false;
            this.ListStock();
        },

        //列出所有的Stock
        ListStock(page = 1) {
            this.page = page
            console.log(this.page, this.limit, this.queryStock)
            stockAPi.queryPageStock(this.page, this.limit, this.queryStock).then(Response => {
                this.stockList = Response.data.result.stockList
                this.total = Response.data.result.total
                console.log("stockList:", this.stockList)
            })
        }

    }

}
</script>

<style></style>
