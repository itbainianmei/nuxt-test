<template>
  <div>
      <form class="card comment-form">
            <div class="card-block">
              <textarea
                class="form-control"
                v-model="comment"
                placeholder="Write a comment..."
                rows="3"
              ></textarea>
            </div>
            <div class="card-footer">
              <img
                :src="article.author.image"
                class="comment-author-img"
              />
              <button class="btn btn-sm btn-primary" @click="addCom">22Post Comment</button>
            </div>
          </form>
          <div class="card"
            v-for="com in comments"
            :key="com.id"
          >
            <div class="card-block">
              <p class="card-text">
                {{com.body}}
              </p>
            </div>
            <div class="card-footer">
              <nuxt-link
                class="comment-author"
                :to="{
                    name:'profile',
                    params:{
                        username:com.author.username
                    }
                }"
              >
                <img class="comment-author-img" :src="com.author.image" alt="">
              </nuxt-link>
              &nbsp; 
              <nuxt-link
                class="comment-author"
                :to="{
                    name:'profile',
                    params:{
                        username:com.author.username
                    }
                }"
              >
                {{com.author.username}}
              </nuxt-link>
              <span class="date-posted">{{com.createdAt | date('MMM DD,YYYY') }}</span>
            </div>
          </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getComments, addComments } from '../../../api/article'
export default {
    name:'ArticleComments',
    props:{
        article:{
            type:Object,
            required:true
        }
    },
    data() {
        return {
            comment:'',//新评论
            comments:[] //文章列表
        }
    },
    head() {
      return {
        title: `${this.article.title} -realworld`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `${this.article.description}`
          }
        ]
      }
    },
    computed:{
      ...mapState(['user'])
      
    },
    methods:{
      async get_comments(){//获取评论
        const { data } = await getComments(this.article.slug)
        this.comments = data.comments
      },
      async addCom(){//添加评论
        try {
          const { data } =   await addComments({
            slug:this.article.slug,
            comment:this.comment
          })
          console.log(data,'add')
          debugger
        } catch (e) {
          console.dir(e,'添加评论')
        }
      }
    },
    async mounted (){
        this.get_comments()
    }
}
</script>

<style>

</style>