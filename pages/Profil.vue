<template>
  <div>
    <header-component />
    <client-only>
      <div class="flex justify-center my-4">
        <image-uploader
          :debug="1"
          output-format="file"
          :max-height="300"
          :auto-rotate="true"
          @input="setImage"
        />
      </div>
    </client-only>
    <input v-model="user.email" class="w-3/5" type="email" placeholder="Votre e-mail">
    <input v-model="user.displayName" class="w-3/5" placeholder="Votre nom d'utilisateur" type="text">
    <input v-model="user.password" class="w-3/5" type="password" placeholder="Votre mdp">
    <button @click="updateName">
      Changez votre nom
    </button>
    <button @click="updateUrl">
      Changez votre photo de profil
    </button>
    <button @click="updatePassword">
      Changez votre mot de passe
    </button>
    <p class="text-center cursor-pointer text-xs sm:text-base pr-4" @click="logOut">
      Se déconnecter
    </p>
    {{ $store.state.store.user.displayName }}
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
      this.$axios.post('http://localhost:5000/updateName', user).then(() => {
        this.logOut()
      }).catch(() => {
        alert('Petit problème de back-end, nous revenons vite')
      })
    },
    updateUrl () {
      const formData = new FormData()
      formData.append('email', this.$store.state.store.user.email)
      formData.append('photoURL', this.user.url, this.user.id + '.png')
      this.$axios.post('http://localhost:5000/updateImage', formData).then(() => {
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
      this.$axios.post('http://localhost:5000/updatePass', user).then(() => {
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
