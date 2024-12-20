import request from "@/utils/request.ts";

export const papersListService = () => {
    return request({
        url: "/papers/list",
        method: "get",
    })
}

export const getQuestionsList = (pid: number) => {
    return request({
        url: `/questions/${pid}`,
        method: "get",
    })
}
export const getPaperRuslt = (id: number) => {
    return request({
        url: `/papers/getEvaluation/${id}`,
        method: "get",
    })
}

export const submitPaper = (submitData: any) => {
    return request({
        url: "/papers/submitAnswer",
        method: "post",
        data: submitData
    })
}

export const userPapersService = () => {
    return request({
        url: "/papers/getPapers",
        method: "get",
    })
}

