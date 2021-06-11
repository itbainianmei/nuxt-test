// 验证没有登录的中间件

export default function ({ store, redirect}){
    // 如果user登录了，则不能再跳登录页，而是跳到首页
    if (store.state.user) {
        return redirect('/')
    }
}