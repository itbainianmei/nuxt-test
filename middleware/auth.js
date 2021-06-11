// 验证是否登录的中间件

export default function ({ store, redirect }){
    // 如果 user 没有登录，跳登录页
    if (!store.state.user) {
        return redirect('/login')
    }
}