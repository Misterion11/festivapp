<template>
  <div>
    <modal-component
      v-show="show"
      :show.sync="show"
      :user-modal="userModal"
    />
    <HeaderComponent :show.sync="show" />
    <template v-if="!loadingPosts">
      <div
        v-for="post in posts"
        :key="post.id"
        class="bg-gray-100 flex justify-center w-full"
      >
        <ComponentPost
          :user="post.user"
          :nb-likes="post.nbLikes"
          :user-com="post.userCom"
          :commentaires="post.commentaires"
          :description="post.description"
          :location="post.location"
          :festival="post.festival"
          :date="post.date"
          :url="post.url"
        />
      </div>
    </template>
    <template v-else>
      <fake-component />
      <fake-component />
      <fake-component />
      <fake-component />
      <fake-component />
    </template>
  </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'
export default {
  name: 'HomePage',
  components: {
    HeaderComponent
  },
  data () {
    return {
      userModal: 'Misterion',
      show: false,
      loadingPosts: true,
      posts: []
    }
  },
  created () {
    this.getPosts()
  },
  methods: {
    getPosts () {
      setTimeout(() => {
        /* API: 'http://localhost:5000/posts'
           API: 'https://festivapp-back.herokuapp.com/posts' */
        this.$axios.get('https://festivapp-back.herokuapp.com/posts').then((response) => {
          this.posts = response.data
          this.loadingPosts = false
        }).catch(() => {
          alert('Petit problème de back-end, nous revenons vite')
        })
        this.loadingPosts = false
      }, 3000)
    }
  }
}

</script>
