<template>
  <div>
    <div class="flex flex-col items-center mt-8 mb-8">
      <div class="border flex flex-col items-center sm:w-2/5 w-4/5 space-y-4 pb-4 pt-2">
        <h2>Connectez-vous </h2>
        <input v-model="user.email" class="sm:w-3/5" type="email" placeholder="Votre e-mail">
        <input v-model="user.password" class="sm:w-3/5" type="password" placeholder="Votre mdp">
        <button class="border border-gray-400 sm:w-1/3 w-32 rounded-full bg-purple-600 text-white hover:bg-purple-800 my-4" :disabled="!user.email || !user.password" @click="connect">
          Se connecter
        </button>
      </div>
      <div class="flex flex-col items-center">
        <p class="pb-4">
          -------------------------- OU --------------------------
        </p>
        <p>
          Vous n’avez pas de compte ?
          <nuxt-link to="/Register" class="text-purple-600 cursor-pointer">
            Inscrivez-vous
          </nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConnexionComponent',
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      response: {
        email: '',
        url: '',
        displayName: ''
      }
    }
  },
  methods: {
    addOne () {
      this.$store.commit('store/increment')
    },
    connect () {
      const user = {
        email: this.user.email,
        password: this.user.password
      }
      // http://localhost:8000/login
      // https://festivapp-log.herokuapp.com/login
      this.$axios.post('https://festivapp-log.herokuapp.com/login', user).then((response) => {
        this.response.email = response.data.email
        this.response.url = response.data.photoURL
        this.response.displayName = response.data.displayName
        this.$store.commit('store/updateState', this.response)
        this.$router.push('/')
      }).catch(() => {
        alert('Utilisateur introuvable')
      })
    }
  }
}
</script>

<style>

</style>
