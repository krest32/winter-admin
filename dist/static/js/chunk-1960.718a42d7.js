(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-1960"],{"N/rm":function(t,e,o){"use strict";var a=o("T2A3");o.n(a).a},T2A3:function(t,e,o){},mqCj:function(t,e,o){"use strict";o.r(e);var a=o("xMja"),r={inject:["reload"],data:function(){return{saveVideoBtnDisabled:!1,dialogVideoFormVisible:!1,dialogVisible:!1,catelogList:[],cateLogInfo:{},node:{id:"",title:"",parentId:""},defaultProps:{children:"childrenCatelogs",label:"title"}}},created:function(){this.GetAllCateLog()},methods:{submitRegister:function(){var t=this;this.saveVideoBtnDisabled=!0,a.a.AddNewMainCateLog(this.cateLogInfo).then(function(e){t.dialogVideoFormVisible=!1,t.GetAllCateLog(),t.reload()})},modified:function(t){var e=this;this.cateLogInfo.id=t.data.id,this.dialogVisible=!0,a.a.GetCateLogByID(this.cateLogInfo.id).then(function(t){e.cateLogInfo=t.data.catelog})},UpdateNewCateLog:function(){var t=this;a.a.UpdateNewCateLog(this.cateLogInfo).then(function(e){t.dialogVisible=!1})},append:function(t){this.cateLogInfo.parentId=t.data.id,this.dialogVisible=!0,this.GetAllCateLog()},SaveNewCateLog:function(){null!=this.cateLogInfo.id?(this.UpdateNewCateLog(),this.GetAllCateLog(),this.reload(),this.cateLogInfo=""):(this.SaveCateLog(),this.cateLogInfo="",this.GetAllCateLog(),this.reload())},SaveCateLog:function(){var t=this;console.log(this.cateLogInfo),this.cateLogInfo.id,a.a.AddNewCateLog(this.cateLogInfo).then(function(e){t.dialogVisible=!1})},remove:function(t,e){var o=this;this.$confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){return a.a.deleteCateLog(t.data.id)}).then(function(){o.GetAllCateLog(),o.$message({type:"success",message:"删除成功!"})})},GetAllCateLog:function(){var t=this;a.a.GetAllCateLog().then(function(e){t.catelogList=e.data.catelogList,console.log(t.catelogList),t.title=""})},handleNodeClick:function(t){},handleClose:function(t){this.$confirm("确认关闭？").then(function(e){t()}).catch(function(t){})}}},n=(o("N/rm"),o("KHd+")),d=Object(n.a)(r,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"app-container"},[o("div",{staticClass:"custom-tree-container"},[o("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogVideoFormVisible=!0}}},[t._v("添加新的三级分类")]),t._v(" "),o("el-dialog",{attrs:{visible:t.dialogVideoFormVisible,title:"添加/修改作者"},on:{"update:visible":function(e){t.dialogVideoFormVisible=e}}},[o("el-form",{attrs:{model:t.cateLogInfo,"label-width":"120px"}},[o("el-form-item",{attrs:{label:"标题"}},[o("el-input",{staticStyle:{width:"240px"},model:{value:t.cateLogInfo.title,callback:function(e){t.$set(t.cateLogInfo,"title",e)},expression:"cateLogInfo.title"}})],1)],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.dialogVideoFormVisible=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{disabled:t.saveVideoBtnDisabled,type:"primary"},on:{click:t.submitRegister}},[t._v("确 定")])],1)],1),t._v(" "),o("el-tree",{attrs:{data:t.catelogList,props:t.defaultProps,"node-key":"id","default-expand-all":"","expand-on-click-node":!1},on:{"node-click":t.handleNodeClick},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.node;return o("span",{staticClass:"custom-tree-node"},[o("span",[t._v(t._s(a.label))]),t._v(" "),o("span",[o("el-dialog",{attrs:{title:"添加分类",visible:t.dialogVisible,width:"30%","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisible=e}}},[o("el-form",{attrs:{model:t.cateLogInfo}},[o("el-form-item",{attrs:{label:"添加分类名称"}},[o("el-input",{staticStyle:{width:"280px"},model:{value:t.cateLogInfo.title,callback:function(e){t.$set(t.cateLogInfo,"title",e)},expression:"cateLogInfo.title"}})],1)],1),t._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.SaveNewCateLog}},[t._v("确 定")])],1)],1),t._v(" "),0==a.childNodes.length&0==a.data.productNum?o("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(e){t.remove(a)}}},[t._v("\r\n                        删除\r\n                    ")]):t._e(),t._v(" "),o("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(e){t.modified(a)}}},[t._v("\r\n                        修改\r\n                    ")]),t._v(" "),a.level<=2?o("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(e){t.append(a)}}},[t._v("\r\n                        添加\r\n                    ")]):t._e()],1)])}}])})],1)])},[],!1,null,null,null);d.options.__file="catelogList.vue";e.default=d.exports},xMja:function(t,e,o){"use strict";var a=o("t3Un");e.a={GetAllCateLog:function(){return Object(a.a)({url:"/product/catelog/GetALlCateLog",method:"get"})},deleteCateLog:function(t){return Object(a.a)({url:"/product/catelog/deleteCateLog/"+t,method:"delete"})},AddNewCateLog:function(t){return Object(a.a)({url:"/product/catelog/AddNewCateLog",method:"post",data:t})},UpdateNewCateLog:function(t){return Object(a.a)({url:"/product/catelog/UpdateNewCateLog",method:"post",data:t})},GetCateLogByID:function(t){return Object(a.a)({url:"/product/catelog/GetCateLogByID/"+t,method:"get"})},AddNewMainCateLog:function(t){return Object(a.a)({url:"/product/catelog/AddNewMainCateLog",method:"post",data:t})},ListAllBrand:function(){return Object(a.a)({url:"/product/brand/ListAllBrand",method:"get"})},DeleteBrandById:function(t){return Object(a.a)({url:"/product/brand/DeleteBrandById/"+t,method:"delete"})},AddNewBrand:function(t){return Object(a.a)({url:"/product/brand/AddNewBrand",method:"post",data:t})},GetBrandById:function(t){return Object(a.a)({url:"/product/brand/getBrandById/"+t,method:"get"})},updateBrand:function(t){return Object(a.a)({url:"/product/brand/updateBrand",method:"post",data:t})},pageQueryBrand:function(t,e,o){return Object(a.a)({url:"/product/brand/pageQueryBrand/"+t+"/"+e,method:"post",data:o})},getBrandBySortId:function(t){return Object(a.a)({url:"/product/brand-sort/getBrandBySortId/"+t,method:"get"})},addNewRelation:function(t){return Object(a.a)({url:"/product/brand-sort/addNewRelation",method:"post",data:t})},cancelRelation:function(t,e){return Object(a.a)({url:"/product/brand-sort/cancelRelation/"+t+"/"+e,method:"get"})},GetAttrGroupById:function(t){return Object(a.a)({url:"/product/catelog-attrgroup/GetAttrGroupById/"+t,method:"get"})},addNewAttrGroup:function(t){return Object(a.a)({url:"/product/catelog-attrgroup/addNewAttrGroup",method:"post",data:t})},deleteAttrGroup:function(t){return Object(a.a)({url:"/product/catelog-attrgroup/deleteAttrGroup/"+t,method:"delete"})},getAttrGroupInfo:function(t){return Object(a.a)({url:"/product/catelog-attrgroup/getAttrGroupInfo/"+t,method:"get"})},updateNewAttrGroup:function(t){return Object(a.a)({url:"/product/catelog-attrgroup/updateNewAttrGroup",method:"post",data:t})},getAttrByGroupId:function(t){return Object(a.a)({url:"/product/catelog-attr/getAttrByGroupId/"+t,method:"get"})},addNewAttr:function(t){return Object(a.a)({url:"/product/catelog-attr/addNewAttr",method:"post",data:t})},deleteAttrById:function(t){return Object(a.a)({url:"/product/catelog-attr/deleteAttrById/"+t,method:"delete"})},getAttrById:function(t){return Object(a.a)({url:"/product/catelog-attr/getAttrById/"+t,method:"get"})},updateAttr:function(t){return Object(a.a)({url:"/product/catelog-attr/updateAttr",method:"post",data:t})},ListAllProduct:function(t,e,o){return Object(a.a)({url:"/product/product/pageQueryAllProduct/"+t+"/"+e,method:"post",data:o})},addNewProduct:function(t){return Object(a.a)({url:"/product/product/addNewProduct",method:"post",data:t})},getProductById:function(t){return Object(a.a)({url:"/product/product/getProductById/"+t,method:"get"})},updateProduct:function(t){return Object(a.a)({url:"/product/product/updateProduct",method:"post",data:t})},deleteProductById:function(t){return Object(a.a)({url:"/product/product/deleteProductById/"+t,method:"delete"})},addAttrForProduct:function(t){return Object(a.a)({url:"/product/attr/addAttrForProduct",method:"post",data:t})},deleteProductAttr:function(t){return Object(a.a)({url:"/product/attr/deleteProductAttr/"+t,method:"delete"})},changeProductStatus:function(t){return Object(a.a)({url:"/product/product/changeProductStatus/"+t,method:"get"})},GetEsProductInfo:function(t){return Object(a.a)({url:"/product/product/GetEsProductInfo/"+t,method:"get"})},saveProductToEs:function(t){return Object(a.a)({url:"/others/es/saveEsProduct",method:"post",data:t})},deleteEsProduct:function(t){return Object(a.a)({url:"/others/es/deleteEsProduct/"+t,method:"delete"})}}}}]);