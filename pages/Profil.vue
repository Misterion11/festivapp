<template>
  <div>
    <header-component />
    <div class="space-y-8 border border-gray-400 sm:w-3/4 w-11/12 mx-auto pb-4 mt-8 mb-8">
      <p class="text-center text-2xl">
        Attention, un changement entraîne une déconnexion. Un seul changement à la fois possible.
      </p>
      <div class="flex flex-col items-center space-y-2">
        <client-only>
          <div class="flex justify-center">
            <image-uploader
              :debug="1"
              output-format="file"
              :max-height="300"
              :auto-rotate="true"
              @input="setImage"
            />
          </div>
        </client-only>
        <button class="border border-gray-400 w-64 rounded-full bg-blue-600 text-white hover:bg-blue-800 my-4" @click="updateUrl">
          Changez votre photo de profil
        </button>
      </div>
      <div class="flex flex-col items-center space-y-2">
        <input v-model="user.displayName" class="sm:w-2/5 w-4/5" placeholder="Nouveau nom d'utilisateur" type="text">
        <button class="border border-gray-400 w-64 rounded-full bg-blue-600 text-white hover:bg-blue-800 my-4" @click="updateName">
          Changez votre nom
        </button>
      </div>
      <div class="flex flex-col items-center space-y-2">
        <input v-model="user.password" class="sm:w-2/5 w-4/5" type="password" placeholder="Nouveau mot de passe">
        <button class="border border-gray-400 w-64 rounded-full bg-blue-600 text-white hover:bg-blue-800 my-4" @click="updatePassword">
          Changez votre mot de passe
        </button>
      </div>
      <div class="w-64 mx-auto">
        <button class="border border-gray-400 w-64 h-12 rounded-full bg-red-600 text-white hover:bg-red-800 my-4" @click="logOut">
          Se déconnecter
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from '~/components/HeaderComponent.vue'
export default {
  name: 'CoucouPo',
  components: { HeaderComponent },
  data () {
    return {
      user: {
        id: Math.ceil(Math.random() * 100000000),
        email: '',
        password: '',
        displayName: '',
        url: null
      }
    }
  },
  methods: {
    logOut () {
      this.$store.commit('store/refreshState')
      this.$router.push('/')
    },
    setImage (file) {
      this.hasImage = true
      this.user.url = file
    },
    updateName () {
      const user = {
        displayName: this.user.displayName,
        email: this.$store.state.store.user.email
      }
      console.log(user.displayName)
      this.$axios.post('https://festivapp-back.herokuapp.com/updateName', user).then(() => {
        this.logOut()
      }).catch(() => {
        alert('Petit problème de back-end, nous revenons vite')
      })
    },
    updateUrl () {
      const formData = new FormData()
      formData.append('email', this.$store.state.store.user.email)
      formData.append('photoURL', this.user.url, this.user.id + '.png')
      this.$axios.post('https://festivapp-back.herokuapp.com/updateImage', formData).then(() => {
        this.logOut()
      }).catch(() => {
        alert('Petit problème de back-end, nous revenons vite')
      })
    },
    updatePassword () {
      const user = {
        password: this.user.password,
        email: this.$store.state.store.user.email
      }
      console.log(user.password)
      this.$axios.post('https://festivapp-back.herokuapp.com/updatePass', user).then(() => {
        this.logOut()
      }).catch(() => {
        alert('Petit problème de back-end, nous revenons vite')
      })
    }
  }
}
</script>

<style>

</style>
