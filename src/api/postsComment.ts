import request from "@/utils/request";
export const addCommentService = (data: any) => {
    return request({
        url: "/postsComments/add",
        method: "post",
        data: data,
    })
}
export const getCommentsService = (postId: any) => {
    return request({
        url: `/postsComments/post/${postId}`,
        method: "get",
    })
}

