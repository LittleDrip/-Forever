import request from "@/utils/requestImage.ts";

export const uploadImg = (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return request.post('/predict', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}