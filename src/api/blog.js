import request from '@/utils/request'

export default {

// //////////////////////////////////////////////标签管理 -start /////////////////////////////////////////////////////////
  // 获取TagList
  TagList() {
    return request({
      url: `/blog/tag/listAllTag`,
      method: 'get'
    })
  },

  // 新增Tag
  addTag(tagInfo) {
    return request({
      url: `/blog/tag/addTag`,
      method: 'post',
      data: tagInfo
    })
  },

  // 根据Id得到Tag
  getTagByID(id) {
    return request({
      url: `/blog/tag/getTagByID/${id}`,
      method: 'get'
    })
  },

  // 更新tag信息
  updateTag(tagInfo) {
    return request({
      url: `/blog/tag/updateTag`,
      method: 'post',
      data: tagInfo
    })
  },

  // 根据Id删除Tag
  deleteTag(id) {
    return request({
      url: `/blog/tag/deleteTag/${id}`,
      method: 'delete'
    })
  },

  // //////////////////////////////////////////////标签管理 -end //////////////////////////////////////////////////////////
  // //////////////////////////////////////////////分类管理 -start//////////////////////////////////////////////////////////

  addSort(sortInfo) {
    return request({
      url: `/blog/sort/addSort`,
      method: 'post',
      data: sortInfo
    })
  },

  // 获取分类列表
  PageQuerySort(page, limit, querySortVo) {
    return request({
      url: `/blog/sort/PageQuerySort/${page}/${limit}`,
      method: 'post',
      data: querySortVo
    })
  },

  // 根据Id获许Sort信息
  getSortById(id) {
    return request({
      url: `/blog/sort/getSortById/${id}`,
      method: 'get'
    })
  },

  // 更新分类信息
  updateSort(sortInfo) {
    return request({
      url: `/blog/sort/updateSort`,
      method: 'post',
      data: sortInfo
    })
  },

  // 删除分类信息
  deleteSort(id) {
    return request({
      url: `/blog/sort/deleteSort/${id}`,
      method: 'delete'
    })
  },

  // 获取sort下拉列表
  listAllSort() {
    return request({
      url: `/blog/sort/listAllSort`,
      method: 'get'
    })
  },

  // //////////////////////////////////////////////分类管理-end//////////////////////////////////////////////////////////
  // //////////////////////////////////////////////作者管理-start////////////////////////////////////////////////////////
  // 作者列表
  PageQueryAuthor(page, limit, queryAuthorVo) {
    return request({
      url: `/blog/author/PageQueryAuthor/${page}/${limit}`,
      method: 'post',
      data: queryAuthorVo
    })
  },

  // 新增作者信息
  addAuthor(authorInfo) {
    return request({
      url: `/blog/author/addAuthor`,
      method: 'post',
      data: authorInfo
    })
  },

  // 根据Id得到Author信息
  getAuthorById(id) {
    return request({
      url: `/blog/author/getAuthorById/${id}`,
      method: 'get'
    })
  },

  // 更新author信息
  updateAuthor(authorInfo) {
    return request({
      url: `/blog/author/updateAuthor`,
      method: 'post',
      data: authorInfo
    })
  },

  // 根据id删除Author
  deleteAuthor(id) {
    return request({
      url: `/blog/author/deleteAuthor/${id}`,
      method: 'delete'
    })
  },

  // 获取Author下拉列表
  listAllAuthor() {
    return request({
      url: `/blog/author/listAllAuthor`,
      method: 'get'
    })
  },

  // //////////////////////////////////////////////作者管理 -end//////////////////////////////////////////////////////////
  // //////////////////////////////////////////////博客管理 -start//////////////////////////////////////////////////////////
  // 作者列表
  PageQueryBlog(page, limit, queryBlogVo) {
    return request({
      url: `/blog/blog/PageQueryBlog/${page}/${limit}`,
      method: 'post',
      data: queryBlogVo
    })
  },

  // 添加Blog
  addBlog(blogInfo) {
    return request({
      url: `/blog/blog/addBlog`,
      method: 'post',
      data: blogInfo
    })
  },

  // 改变blog发表状态
  changeStatus(id) {
    return request({
      url: `/blog/blog/changeStatus/${id}`,
      method: 'get'
    })
  },

  // 删除blog
  deleteBlog(id) {
    return request({
      url: `/blog/blog/deleteBlog/${id}`,
      method: 'delete'
    })
  },

  // 根据Id得到Blog信息
  getBlogById(id) {
    return request({
      url: `/blog/blog/getBlogById/${id}`,
      method: 'get'
    })
  },

  // 更新blog信息
  updateBlog(blogInfo) {
    return request({
      url: `/blog/blog/updateBlog`,
      method: 'post',
      data: blogInfo
    })
  }

// //////////////////////////////////////////////博客管理 -end//////////////////////////////////////////////////////////
}
