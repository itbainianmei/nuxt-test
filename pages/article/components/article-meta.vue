<template>
  <div class="article-meta">
    <nuxt-link :to="{
        name:'profile',
        params:{
            username: article.author.username
        }
    }">
        <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
    <nuxt-link class="author" :to="{
        name:'profile',
        params:{
            username:article.author.username
        }
    }">
        {{article.author.username}}
    </nuxt-link>
    <span class="date">{{article.updatedAt | date('MMM DD, YYYY')}}</span>
    </div>
    <button 
        class="btn btn-sm btn-outline-secondary"
        :class="{
            active: article.author.following
        }"
        @click="article.author.following = !article.author.following"
    >
    <i class="ion-plus-round"></i> &nbsp; {{article.author.following ? 'follow '+article.author.username :'unfollow '+article.author.username}}
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary"
        :class="{
            active:article.favorited
        }"
        @click="article.favorited = !article.favorited"
    >
    <i class="ion-heart"></i> &nbsp; {{article.favorited ? 'unfavorited post':'favorite post'}}
    <span class="counter">{{article.favorited ? 2:article.favoritesCount}}</span>
    </button>
</div>
</template>

<script>
export default {
    name:'articleMeta',
    props:{
        article:{
            type:Object,
            required:true
        }
    }
}
</script>

<style>

</style>