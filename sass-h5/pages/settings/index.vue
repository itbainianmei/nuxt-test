<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  v-model="currentUsr.image "
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  v-model="currentUsr.username"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  v-model="currentUsr.bio"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  v-model="currentUsr.email"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  v-model="currentUsr.password"
                  placeholder="Password"
                />
              </fieldset>
              
              <button class="btn btn-lg btn-primary pull-xs-right" @click="onSubmit">
                Update Settings
              </button>
            </fieldset>
          </form>
          <button class="btn btn-lg btn-danger pull-xs-left" @click="loginOut">
                login out
              </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined ;

import { updateUser } from '@/api/user'
import { mapState , mapMutations } from 'vuex'
export default {
    middleware:['auth'],
    name:'SettingIndex',
    computed:{
      ...mapState(['user'])
    },
    data(){
      return {
        currentUsr:{
          email:'',
          image:'',
          username:'',
          bio:'',
          password:''
        }
      }
    },
    mounted(){
      Object.assign(this.currentUsr, this.user)
    },
    methods:{
      ...mapMutations(['setUser']),
      loginOut(){//退出登录
        this.currentUsr = null
        this.$store.commit('setUser',this.currentUsr)
        Cookie.set('user',this.currentUsr)
        this.$router.push('/')
      },
      async onSubmit(){ //跟新用户信息
        try{
          await updateUser(this.currentUsr)
          this.setUser(this.currentUsr)
          this.$router.push({
            name:'profile',
            params:{
              username:`${user.username}`
            }
          })
        }catch(e){
          console.log('update--',e)
        }
      }
    }
};
</script>

<style>
</style>