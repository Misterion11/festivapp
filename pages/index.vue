<template>
  <div class="bg-gray-100 h-screen">
    <modal-component
      v-show="show"
      :show.sync="show"
      :user-modal="userModal"
    />
    <HeaderComponent :show.sync="show" :sort.sync="sort" :display.sync="display" />
    <Transition>
      <div v-show="sort" class="md:flex md:justify-end md:pr-8">
        <div class="flex flex-col items-center rounded-xl bg-gray-200 md:pr-6 md:pt-6">
          <p class="pb-2">
            Nom du festival :
          </p>
          <div class="flex items-center">
            <back-icon class="cursor-pointer" @click.native="close" />
            <input id="" v-model="festival" class="h-8" type="text" name="">
          </div>
          <div>
            <button class="border border-gray-400 w-32 rounded-full bg-purple-600 text-white hover:bg-purple-800 my-4 md:ml-6" @click="reset">
              Reset
            </button>
            <button class="border border-gray-400 w-32 rounded-full bg-purple-600 text-white hover:bg-purple-800 my-4 md:ml-6" @click="getPosts">
              Trier
            </button>
          </div>
        </div>
      </div>
    </Transition>
    <template v-if="!loadingPosts">
      <div
        v-for="post in posts"
        :key="post.id"
        class="flex justify-center w-full bg-gray-100"
      >
        <ComponentPost
          :id="post.id"
          :liked="post.liked"
          :user="post.user"
          :nb-likes="post.nbLikes"
          :user-com="post.userCom"
          :commentaires="post.commentaires"
          :description="post.description"
          :location="post.location"
          :festival="post.festival"
          :date="post.date"
          :url="post.url"
          :url-user="post.urlUser"
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
      sort: false,
      loadingPosts: true,
      posts: [],
      festival: '',
      display: false
    }
  },
  created () {
    this.getPosts()
  },
  methods: {
    getPosts () {
      this.$store.commit('store/updateTri', this.festival)
      if (this.$store.state.store.tri) {
        this.$axios.get('http://localhost:5000/postsFestival', { params: { festival: this.festival } }).then((response) => {
          this.posts = response.data
          this.loadingPosts = false
          this.close()
        }).catch(() => {
          alert('Petit problème de back-end, nous revenons vite')
        })
      } else {
        this.$axios.get('http://localhost:5000/posts').then((response) => {
          this.posts = response.data
          this.loadingPosts = false
        }).catch(() => {
          alert('Petit problème de back-end, nous revenons vite')
        })
      }
      this.loadingPosts = false
    },
    close () {
      this.sort = false
    },
    reset () {
      this.festival = ''
      this.getPosts()
      this.sort = false
    }
  }
}

</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
