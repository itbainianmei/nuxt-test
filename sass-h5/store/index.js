
const cookieparse = process.server ? require('cookieparser') : undefined

export const state = () => {
    return {
        // 当前用户登录状态
        user:null
    }
}
export const mutations = {
    setUser (state, user) {
        state.user = user
    }
}
export const actions = {
    // nuxtServerInit 是一个特殊的action方法， 会在服务端渲染期间自动调用
    // 作用：初始化容器数据， 传递数据给客户端使用
    nuxtServerInit ({ commit },{ req }) {
        let user = null
        // 如果请求头中有 cookie
        if(req.headers.cookie){
            // 将请求头中的cookie 字符串解析为一个对象
            const parsed = cookieparse.parse(req.headers.cookie)
            try {
                user = JSON.parse(parsed.user)
            }catch(err){
                // no valid cookie found
            }
        }
        // 提交 mutation 修改 state 状态
        commit('setUser', user)
    }
}