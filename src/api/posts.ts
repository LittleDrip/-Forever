import request from "@/utils/request";


export const addPostsService = (data: any) => {
    return request({
        url: "/posts/add",
        method: "post",
        data: data,
    })
}

export const getPostsService = () => {
    return request({
        url: "/posts/getList",
        method: "get",
    })
}
