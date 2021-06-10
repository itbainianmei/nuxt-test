import { request } from '@/plugins/request.js'

// 用户登录
export const login = (data) => {
    return request({
        method:'POST',
        url:'/api/users/login',
        data
    })
}
// 用户注册
export const register = (data) => {
    return request({
        method:'POST',
        url:'/api/users',
        data
    })
}

//更新用户信息
export const updateUser = data => {
    return request({
        method:'PUT',
        url:'/api/user',
        data
    })
}

//获取用户画像
export const getProfile = (username) => {
    return request({
        method:'GET',
        url:`/api/profiles/${username}`
    })
}