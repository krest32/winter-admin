(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-7967"],{anHw:function(e,t,o){"use strict";var a=o("k6NA");o.n(a).a},k6NA:function(e,t,o){},"n+ln":function(e,t,o){"use strict";o.r(t);var a=o("s6q/"),l={inject:["reload"],data:function(){return{saveVideoBtnDisabled:!1,dialogVideoFormVisible:!1,catelogList:[],catelogInfo:{}}},created:function(){this.listCateLog()},methods:{removeDataById:function(e){var t=this;this.$confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.a.deleteCatelog(e).then(function(e){t.listCateLog(),t.$message({type:"success",message:"删除成功!"})})}).catch(function(e){"cancel"===e&&t.$message({type:"info",message:"已取消删除"})})},getCatelogById:function(e){var t=this;a.a.getCatelogById(e).then(function(e){t.catelogInfo=e.data.catelog,t.dialogVideoFormVisible=!0,console.log("cateLogInfo:",t.catelogInfo)})},listCateLog:function(){var e=this;a.a.listCateLog().then(function(t){e.catelogList=t.data.list,console.log("catelogList:",e.catelogList)})},updateCatelog:function(){var e=this;a.a.updateCatelog(this.catelogInfo).then(function(t){e.$message({type:"success",message:"更新成功!"})})},addCateLog:function(){var e=this;a.a.addCateLog(this.catelogInfo).then(function(t){e.$message({type:"success",message:"添加成功!"})})},helpSave:function(){this.dialogVideoFormVisible=!1,this.reload(),this.listCateLog(),this.saveVideoBtnDisabled=!1},saveOrUpdate:function(){this.catelogInfo.id?(this.updateCatelog(),this.helpSave()):(this.addCateLog(),this.helpSave())},cancel:function(){this.dialogVideoFormVisible=!1,this.reload()}}},i=(o("anHw"),o("KHd+")),n=Object(i.a)(l,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"app-container"},[o("h1",[e._v("分类列表")]),e._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVideoFormVisible=!0,e.catelogInfoID=e.catelogInfo.id}}},[e._v("添加标签")]),e._v(" "),o("el-dialog",{attrs:{visible:e.dialogVideoFormVisible,title:"添加/修改分类"},on:{"update:visible":function(t){e.dialogVideoFormVisible=t}}},[o("el-form",{attrs:{"label-width":"120px"}},[o("el-form-item",{attrs:{label:"分类名称"}},[o("el-input",{staticStyle:{width:"300px"},model:{value:e.catelogInfo.title,callback:function(t){e.$set(e.catelogInfo,"title",t)},expression:"catelogInfo.title"}})],1)],1),e._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:e.cancel}},[e._v("取 消")]),e._v(" "),o("el-button",{attrs:{disabled:e.saveVideoBtnDisabled,type:"primary"},on:{click:e.saveOrUpdate}},[e._v("确 定")])],1)],1),e._v(" "),o("el-table",{attrs:{data:e.catelogList,"element-loading-text":"拼命加载中",border:"",fit:"","highlight-current-row":""}},[o("el-table-column",{attrs:{label:"序号",width:"70",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.$index+1)+"\n      ")]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"title",label:"分类名称",align:"center"}}),e._v(" "),o("el-table-column",{attrs:{prop:"albumNum",label:"专辑数量",align:"center"}}),e._v(" "),o("el-table-column",{attrs:{prop:"vedioNum",label:"视频数量",align:"center"}}),e._v(" "),o("el-table-column",{attrs:{prop:"gmtCreate",label:"添加时间",align:"center"}}),e._v(" "),o("el-table-column",{attrs:{prop:"gmtModified",label:"修改时间",align:"center"}}),e._v(" "),o("el-table-column",{attrs:{label:"操作",width:"200",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-edit"},on:{click:function(o){e.getCatelogById(t.row.id)}}},[e._v("修改")]),e._v(" "),o("el-button",{attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:function(o){e.removeDataById(t.row.id)}}},[e._v("删除")])]}}])})],1)],1)},[],!1,null,null,null);n.options.__file="catelogList.vue";t.default=n.exports},"s6q/":function(e,t,o){"use strict";var a=o("t3Un");t.a={listCateLog:function(){return Object(a.a)({url:"/vedio/catelog/listCateLog",method:"get"})},addCateLog:function(e){return Object(a.a)({url:"/vedio/catelog/addCateLog",method:"post",data:e})},getCatelogById:function(e){return Object(a.a)({url:"/vedio/catelog/getCatelogById/"+e,method:"get"})},updateCatelog:function(e){return Object(a.a)({url:"/vedio/catelog/updateCatelog",method:"post",data:e})},deleteCatelog:function(e){return Object(a.a)({url:"/vedio/catelog/deleteCatelog/"+e,method:"delete"})},addAlbum:function(e){return Object(a.a)({url:"/vedio/album/addAlbum",method:"post",data:e})},pageQueryAlbum:function(e,t,o){return Object(a.a)({url:"/vedio/album/pageQueryAlbum/"+e+"/"+t,method:"post",data:o})},listAlbum:function(){return Object(a.a)({url:"/vedio/album/listAlbum",method:"get"})},deleteAlbum:function(e){return Object(a.a)({url:"/vedio/album/deleteAlbum/"+e,method:"delete"})},getAlbumById:function(e){return Object(a.a)({url:"/vedio/album/getAlbumById/"+e,method:"get"})},updateAlbumById:function(e){return Object(a.a)({url:"/vedio/album/updateAlbumById",method:"post",data:e})},querySearchVedio:function(e,t,o){return Object(a.a)({url:"/vedio/vedio/querySearchVedio/"+e+"/"+t,method:"post",data:o})},addVedio:function(e){return Object(a.a)({url:"/vedio/vedio/addVedio",method:"post",data:e})},removeVedioSourceId:function(e){return Object(a.a)({url:"/others/Aliyun/removeVedioById/"+e,method:"delete"})},getVedio:function(e){return Object(a.a)({url:"/vedio/vedio/getVedio/"+e,method:"get"})},updateVedio:function(e){return Object(a.a)({url:"/vedio/vedio/updateVedio",method:"post",data:e})},deleteVedio:function(e){return Object(a.a)({url:"/vedio/vedio/deleteVedio/"+e,method:"delete"})}}}}]);