import axios from 'axios'

export const request = axios.create({
    baseURL:'https://conduit.productionready.io/'
})


// 通过插件机制获取到上下文对象，包括query,params,req,res,app,store
export default ({store}) => {
    // 请求拦截器
    // 每个请求都要经过请求拦截器
    // 我们需要再拦截器中做一些公共的业务处理，例如统一设置 token
    request.interceptors.request.use(function (config){
        const { user } = store.state
        if (user && user.token) {
            config.headers.Authorization  = `Token ${user.token}`
        }
        return config
    },function (err){
        return Promise.reject(err)
    })
}