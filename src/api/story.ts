import request from "@/utils/request.ts";

export const storyListService = () => {
    return request({
        url: "/story/list",
        method: "get",
    })
}
export const getStoryDetail = (id: number) => {
    return request({
        url: `/story/detail/${id}`,
        method: "get",
    })
}