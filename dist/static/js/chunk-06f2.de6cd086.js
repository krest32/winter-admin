(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-06f2"],{"4lDD":function(e,t,l){"use strict";l.r(t);var a=l("s6q/"),o={inject:["reload"],data:function(){return{saveBtnDisabled:!1,BASE_API:"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin",saveVideoBtnDisabled:!1,dialogVideoFormVisible:!1,queryAlbumVo:{},page:0,limit:10,total:0,albumList:[],albumInfo:{pictureAddress:"../static/cover.jpg"},catelogList:[]}},created:function(){this.listCateLog(),this.pageQueryAlbum()},methods:{pageQueryAlbum:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.page=t,a.a.pageQueryAlbum(this.page,this.limit,this.queryAlbumVo).then(function(t){e.total=t.data.total,e.albumList=t.data.albumList,console.log("total:",e.total),console.log("albumlist:",e.albumList)})},addAlbum:function(){var e=this;a.a.addAlbum(this.albumInfo).then(function(t){e.$message({type:"success",message:"添加成功!"})})},listCateLog:function(){var e=this;a.a.listCateLog().then(function(t){e.catelogList=t.data.list,console.log("catelogList:",e.catelogList)})},helpSave:function(){this.dialogVideoFormVisible=!1,this.reload(),this.listCateLog(),this.saveVideoBtnDisabled=!1},saveOrUpdate:function(){this.albumInfo.id?(this.updateAlbum(),this.helpSave()):(this.addAlbum(),this.helpSave())},cancel:function(){this.dialogVideoFormVisible=!1,this.reload()},handleAvatarSuccess:function(e,t){console.log(e),console.log(URL.createObjectURL(t.raw)),this.albumInfo.pictureAddress=e.data.url,this.albumInfo.pictureName=e.data.filename},beforeAvatarUpload:function(e){var t="image/jpeg"===e.type,l=e.size/1024/1024<2;return t||this.$message.error("上传头像图片只能是 JPG 格式!"),l||this.$message.error("上传头像图片大小不能超过 2MB!"),t&&l},resetData:function(){this.queryAlbumVo={},this.pageQueryAlbum()},removeDataById:function(e){var t=this;this.$confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.a.deleteAlbum(e).then(function(e){t.pageQueryAlbum(),t.$message({type:"success",message:"删除成功!"})})}).catch(function(e){"cancel"===e&&t.$message({type:"info",message:"已取消删除"})})},getAlbumById:function(e){var t=this;a.a.getAlbumById(e).then(function(e){t.albumInfo=e.data.album,t.dialogVideoFormVisible=!0,console.log("albumInfo:",t.albumInfo)})},updateAlbum:function(){var e=this;a.a.updateAlbumById(this.albumInfo).then(function(t){e.$message({type:"success",message:"更新成功!"})})}}},i=(l("qygE"),l("KHd+")),n=Object(i.a)(o,function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"app-container"},[l("h1",[e._v("专辑列表")]),e._v(" "),l("el-dialog",{attrs:{visible:e.dialogVideoFormVisible,title:"添加/修改专辑"},on:{"update:visible":function(t){e.dialogVideoFormVisible=t}}},[l("el-form",{attrs:{"label-width":"120px"}},[l("el-form-item",{attrs:{label:"分类名称"}},[l("el-input",{staticStyle:{width:"300px"},model:{value:e.albumInfo.title,callback:function(t){e.$set(e.albumInfo,"title",t)},expression:"albumInfo.title"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"分类选择"}},[l("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择"},model:{value:e.albumInfo.catelogId,callback:function(t){e.$set(e.albumInfo,"catelogId",t)},expression:"albumInfo.catelogId"}},e._l(e.catelogList,function(e){return l("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})}))],1),e._v(" "),l("el-form-item",{attrs:{label:"专辑简介"}},[l("el-input",{staticStyle:{width:"500px"},attrs:{rows:5,type:"textarea",maxlength:"200","show-word-limit":""},model:{value:e.albumInfo.intro,callback:function(t){e.$set(e.albumInfo,"intro",t)},expression:"albumInfo.intro"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"封面上传"}},[l("el-upload",{staticClass:"avatar-uploader",attrs:{"show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload,action:e.BASE_API+"/others/Aliyun/oss"}},[l("img",{staticStyle:{width:"500px"},attrs:{src:e.albumInfo.pictureAddress}})])],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:e.cancel}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{disabled:e.saveVideoBtnDisabled,type:"primary"},on:{click:e.saveOrUpdate}},[e._v("确 定")])],1)],1),e._v(" "),l("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[l("el-form-item",{attrs:{label:"专辑名称"}},[l("el-input",{model:{value:e.queryAlbumVo.title,callback:function(t){e.$set(e.queryAlbumVo,"title",t)},expression:"queryAlbumVo.title"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"分类选择"}},[l("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择"},model:{value:e.queryAlbumVo.catelogId,callback:function(t){e.$set(e.queryAlbumVo,"catelogId",t)},expression:"queryAlbumVo.catelogId"}},e._l(e.catelogList,function(e){return l("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})}))],1),e._v(" "),l("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){e.pageQueryAlbum()}}},[e._v("查询")]),e._v(" "),l("el-button",{attrs:{type:"default"},on:{click:function(t){e.resetData()}}},[e._v("清空")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVideoFormVisible=!0,e.albumInfoID=e.albumInfo.id}}},[e._v("添加专辑")])],1),e._v(" "),l("el-table",{attrs:{data:e.albumList,"element-loading-text":"拼命加载中",border:"",fit:"","highlight-current-row":""}},[l("el-table-column",{attrs:{label:"序号",width:"70",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.$index+1)+"\n      ")]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"title",label:"专辑名称",align:"center"}}),e._v(" "),l("el-table-column",{attrs:{prop:"intro",label:"简介",align:"center"}}),e._v(" "),l("el-table-column",{attrs:{prop:"catelogTitle",label:"分类名称",align:"center"}}),e._v(" "),l("el-table-column",{attrs:{prop:"pictureAddress",label:"头像",align:"center"},scopedSlots:e._u([{key:"default",fn:function(e){return[l("el-image",{attrs:{src:e.row.pictureAddress,fit:"contain"}})]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"vedioNum",label:"视频数量",align:"center"}}),e._v(" "),l("el-table-column",{attrs:{prop:"clickCount",label:"点击数",align:"center"}}),e._v(" "),l("el-table-column",{attrs:{prop:"collectCount",label:"收藏数",align:"center"}}),e._v(" "),l("el-table-column",{attrs:{prop:"puyCount",label:"购买数",align:"center"}}),e._v(" "),l("el-table-column",{attrs:{prop:"playCount",label:"播放数",align:"center"}}),e._v(" "),l("el-table-column",{attrs:{prop:"gmtCreate",label:"添加时间",align:"center"}}),e._v(" "),l("el-table-column",{attrs:{prop:"gmtModified",label:"修改时间",align:"center"}}),e._v(" "),l("el-table-column",{attrs:{label:"操作",width:"200",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-edit"},on:{click:function(l){e.getAlbumById(t.row.id)}}},[e._v("修改")]),e._v(" "),l("el-button",{attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:function(l){e.removeDataById(t.row.id)}}},[e._v("删除")])]}}])})],1),e._v(" "),l("el-pagination",{staticStyle:{padding:"30px 0","text-align":"center"},attrs:{"current-page":e.page,"page-size":e.limit,total:e.total,layout:"total, prev, pager, next, jumper"},on:{"current-change":e.pageQueryAlbum}})],1)},[],!1,null,null,null);n.options.__file="albumList.vue";t.default=n.exports},WKUi:function(e,t,l){},qygE:function(e,t,l){"use strict";var a=l("WKUi");l.n(a).a},"s6q/":function(e,t,l){"use strict";var a=l("t3Un");t.a={listCateLog:function(){return Object(a.a)({url:"/vedio/catelog/listCateLog",method:"get"})},addCateLog:function(e){return Object(a.a)({url:"/vedio/catelog/addCateLog",method:"post",data:e})},getCatelogById:function(e){return Object(a.a)({url:"/vedio/catelog/getCatelogById/"+e,method:"get"})},updateCatelog:function(e){return Object(a.a)({url:"/vedio/catelog/updateCatelog",method:"post",data:e})},deleteCatelog:function(e){return Object(a.a)({url:"/vedio/catelog/deleteCatelog/"+e,method:"delete"})},addAlbum:function(e){return Object(a.a)({url:"/vedio/album/addAlbum",method:"post",data:e})},pageQueryAlbum:function(e,t,l){return Object(a.a)({url:"/vedio/album/pageQueryAlbum/"+e+"/"+t,method:"post",data:l})},listAlbum:function(){return Object(a.a)({url:"/vedio/album/listAlbum",method:"get"})},deleteAlbum:function(e){return Object(a.a)({url:"/vedio/album/deleteAlbum/"+e,method:"delete"})},getAlbumById:function(e){return Object(a.a)({url:"/vedio/album/getAlbumById/"+e,method:"get"})},updateAlbumById:function(e){return Object(a.a)({url:"/vedio/album/updateAlbumById",method:"post",data:e})},querySearchVedio:function(e,t,l){return Object(a.a)({url:"/vedio/vedio/querySearchVedio/"+e+"/"+t,method:"post",data:l})},addVedio:function(e){return Object(a.a)({url:"/vedio/vedio/addVedio",method:"post",data:e})},removeVedioSourceId:function(e){return Object(a.a)({url:"/others/Aliyun/removeVedioById/"+e,method:"delete"})},getVedio:function(e){return Object(a.a)({url:"/vedio/vedio/getVedio/"+e,method:"get"})},updateVedio:function(e){return Object(a.a)({url:"/vedio/vedio/updateVedio",method:"post",data:e})},deleteVedio:function(e){return Object(a.a)({url:"/vedio/vedio/deleteVedio/"+e,method:"delete"})}}}}]);