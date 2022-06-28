import request from '@/utils/request'

export default {

    // //////////////////////////////////////////////幻灯片管理 -start /////////////////////////////////////////////////////////
    // 获取TagList
    getMemberList(page, limit, queryMember) {
        return request({
            url: `/member/member/getMemberList/${page}/${limit}`,
            method: 'post',
            data: queryMember
        })
    }
}
