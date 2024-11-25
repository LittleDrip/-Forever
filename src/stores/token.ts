
const authItemName = 'access_token'
export function storeAccessToken(token, remember, expire) {
    const authObj = { token: token, expire: expire }
    const str = JSON.stringify(authObj)
    if (remember) {
        localStorage.setItem(authItemName, str);
    } else {
        sessionStorage.setItem(authItemName, str);
    }
}

export function accessHeader() {
    return { 'Authorization': `Bearer ${getAccessToken()}` }
}

export function getAccessToken() {
    const str = localStorage.getItem(authItemName) || sessionStorage.getItem(authItemName)
    if (!str) {
        return null;
    }
    const authObj = JSON.parse(str);
    if (authObj.expire <= new Date()) {
        deleteAccessToken()
        ElMessage.warning('登录状态已过期，请重新登录')
        return null;
    }
    return authObj.token
}

export function deleteAccessToken() {
    localStorage.removeItem(authItemName)
    sessionStorage.removeItem(authItemName)
}

export function unauthorized() {
    return !getAccessToken()
}