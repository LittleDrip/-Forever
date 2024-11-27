import request from "@/utils/request.ts";

export const articleListService = () => {
    return request({
        url: "/article/list",
        method: "get",
    })
}
export const articleListByPageService = (page: any) => {
    return request({
        url: `/article/page`,
        method: "post",
        data: page,
    });
}
export const getAllPagesTotal = (page: any) => {
    return request({
        url: `/article/pageTotal`,
        method: "post",
        data: page,
    });
}

export const getArticleById = (id: number) => {
    return request({
        url: `/article/getArticle`,
        method: "get",
        params: { id },
    });
}



