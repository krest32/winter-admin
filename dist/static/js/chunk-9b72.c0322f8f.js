(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-9b72"],{"1oSN":function(e,t,o){},mrsi:function(e,t,o){"use strict";o.r(t);var l=o("s6q/"),a={inject:["reload"],data:function(){return{catelogList:[],page:0,limit:10,total:0,vedioList:[],queryVedioVo:{albumId:"",catelogId:""},albumList:[]}},created:function(){this.listCateLog(),this.querySearchVedio()},methods:{catelogChanged:function(e){for(var t=0;t<this.catelogList.length;t++)this.catelogList[t].id===e&&(this.albumList=this.catelogList[t].albumList,this.queryVedioVo.albumId="")},resetData:function(){this.queryVedioVo={},this.querySearchVedio()},querySearchVedio:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.page=t,l.a.querySearchVedio(this.page,this.limit,this.queryVedioVo).then(function(t){e.total=t.data.total,e.vedioList=t.data.vedioList,console.log("total：",e.total),console.log("vedioList:",e.vedioList)})},removeDataById:function(e){var t=this;this.$confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){l.a.deleteVedio(e).then(function(e){t.querySearchVedio(),t.$message({type:"success",message:"删除成功!"})})}).catch(function(e){"cancel"===e&&t.$message({type:"info",message:"已取消删除"})})},editVedioById:function(e){this.$router.push({path:"/vedio/vedio_update/"+e})},listCateLog:function(){var e=this;l.a.listCateLog().then(function(t){e.catelogList=t.data.list,console.log("catelogList:",e.catelogList)})}}},i=(o("zhQN"),o("KHd+")),n=Object(i.a)(a,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"app-container"},[o("h1",[e._v("视频列表")]),e._v(" "),o("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[o("el-form-item",{attrs:{label:"名称"}},[o("el-input",{model:{value:e.queryVedioVo.title,callback:function(t){e.$set(e.queryVedioVo,"title",t)},expression:"queryVedioVo.title"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"分类"}},[o("el-select",{staticStyle:{width:"240px"},attrs:{placeholder:"分类选择"},on:{change:e.catelogChanged},model:{value:e.queryVedioVo.catelogId,callback:function(t){e.$set(e.queryVedioVo,"catelogId",t)},expression:"queryVedioVo.catelogId"}},e._l(e.catelogList,function(e){return o("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})})),e._v(" "),o("el-select",{staticStyle:{width:"240px"},attrs:{placeholder:"专辑选择"},model:{value:e.queryVedioVo.albumId,callback:function(t){e.$set(e.queryVedioVo,"albumId",t)},expression:"queryVedioVo.albumId"}},e._l(e.albumList,function(e){return o("el-option",{key:e.title,attrs:{label:e.title,value:e.id}})}))],1),e._v(" "),o("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){e.querySearchVedio()}}},[e._v("查询")]),e._v(" "),o("el-button",{attrs:{type:"default"},on:{click:function(t){e.resetData()}}},[e._v("清空")])],1),e._v(" "),o("el-table",{attrs:{data:e.vedioList,"element-loading-text":"拼命加载中",border:"",fit:"","highlight-current-row":""}},[o("el-table-column",{attrs:{label:"序号",width:"70",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.$index+1)+"\n      ")]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"title",label:"分类名称",align:"center"}}),e._v(" "),o("el-table-column",{attrs:{prop:"albumTitle",label:"专辑名称",align:"center"}}),e._v(" "),o("el-table-column",{attrs:{prop:"catelogTitle",label:"视频分类",align:"center"}}),e._v(" "),o("el-table-column",{attrs:{prop:"vedioSize",label:"大小",align:"center"}}),e._v(" "),o("el-table-column",{attrs:{prop:"price",label:"价格",align:"center"}}),e._v(" "),o("el-table-column",{attrs:{prop:"pictureAddress",label:"封面",align:"center"},scopedSlots:e._u([{key:"default",fn:function(e){return[o("el-image",{attrs:{src:e.row.pictureAddress,fit:"contain"}})]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"clickCount",label:"点击数",align:"center"}}),e._v(" "),o("el-table-column",{attrs:{prop:"collectCount",label:"收藏数",align:"center"}}),e._v(" "),o("el-table-column",{attrs:{prop:"puyCount",label:"购买数",align:"center"}}),e._v(" "),o("el-table-column",{attrs:{prop:"gmtCreate",label:"添加时间",align:"center"}}),e._v(" "),o("el-table-column",{attrs:{prop:"gmtModified",label:"修改时间",align:"center"}}),e._v(" "),o("el-table-column",{attrs:{label:"操作",width:"200",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-edit"},on:{click:function(o){e.editVedioById(t.row.id)}}},[e._v("修改")]),e._v(" "),o("el-button",{attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:function(o){e.removeDataById(t.row.id)}}},[e._v("删除")])]}}])})],1),e._v(" "),o("el-pagination",{staticStyle:{padding:"30px 0","text-align":"center"},attrs:{"current-page":e.page,"page-size":e.limit,total:e.total,layout:"total, prev, pager, next, jumper"},on:{"current-change":e.querySearchVedio}})],1)},[],!1,null,null,null);n.options.__file="vedioList.vue";t.default=n.exports},"s6q/":function(e,t,o){"use strict";var l=o("t3Un");t.a={listCateLog:function(){return Object(l.a)({url:"/vedio/catelog/listCateLog",method:"get"})},addCateLog:function(e){return Object(l.a)({url:"/vedio/catelog/addCateLog",method:"post",data:e})},getCatelogById:function(e){return Object(l.a)({url:"/vedio/catelog/getCatelogById/"+e,method:"get"})},updateCatelog:function(e){return Object(l.a)({url:"/vedio/catelog/updateCatelog",method:"post",data:e})},deleteCatelog:function(e){return Object(l.a)({url:"/vedio/catelog/deleteCatelog/"+e,method:"delete"})},addAlbum:function(e){return Object(l.a)({url:"/vedio/album/addAlbum",method:"post",data:e})},pageQueryAlbum:function(e,t,o){return Object(l.a)({url:"/vedio/album/pageQueryAlbum/"+e+"/"+t,method:"post",data:o})},listAlbum:function(){return Object(l.a)({url:"/vedio/album/listAlbum",method:"get"})},deleteAlbum:function(e){return Object(l.a)({url:"/vedio/album/deleteAlbum/"+e,method:"delete"})},getAlbumById:function(e){return Object(l.a)({url:"/vedio/album/getAlbumById/"+e,method:"get"})},updateAlbumById:function(e){return Object(l.a)({url:"/vedio/album/updateAlbumById",method:"post",data:e})},querySearchVedio:function(e,t,o){return Object(l.a)({url:"/vedio/vedio/querySearchVedio/"+e+"/"+t,method:"post",data:o})},addVedio:function(e){return Object(l.a)({url:"/vedio/vedio/addVedio",method:"post",data:e})},removeVedioSourceId:function(e){return Object(l.a)({url:"/others/Aliyun/removeVedioById/"+e,method:"delete"})},getVedio:function(e){return Object(l.a)({url:"/vedio/vedio/getVedio/"+e,method:"get"})},updateVedio:function(e){return Object(l.a)({url:"/vedio/vedio/updateVedio",method:"post",data:e})},deleteVedio:function(e){return Object(l.a)({url:"/vedio/vedio/deleteVedio/"+e,method:"delete"})}}},zhQN:function(e,t,o){"use strict";var l=o("1oSN");o.n(l).a}}]);