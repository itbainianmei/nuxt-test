<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register"
              >Need an account?</nuxt-link>
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>
          <ul class="error-messages">
            <template v-for="(msg, val) in errors">
              <li v-for="(con, inx) in msg" :key="val+con">
                {{val}}{{con}}
              </li>

            </template>
          </ul>
          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                v-model="user.email"
                required
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                required
                v-model="user.password"
                minlength="6"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { login , register} from '@/api/user'

const Cookie = process.client ? require('js-cookie') : undefined ;


export default {
  middleware:'noauth',
  name: "LoginIndex",
  data() {
    return {
      user:{
        username: '',
        email:"ypzmail@163.com",
        password:"12345678"
      },
      errors:{}
    };
  },
  computed: {
    isLogin() {
      return this.$route.path === "/login";
    },
  },
  methods:{
    async onSubmit(){
      try {
        const res = this.isLogin 
        ? await login({user: this.user})
        : await register({user: this.user})
        // 保存用户登录状态
        this.$store.commit('setUser',res.data.user)

        Cookie.set('user',res.data.user)
        
        this.$router.push('/')
      } catch (err) { //请求失败
        this.errors = err.response.data.errors
      }
      
    }
  }
};
</script>

<style>
</style>