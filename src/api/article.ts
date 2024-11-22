import request from "@/utils/request.ts";

export const articleListService = () => {
    return request({
        url: "/article/list",
        method: "get",
    })
}
export const getArticleById = (id: number) =>
    request({
        url: `/article/getArticle`,
        method: "get",
        params: { id },
    });
