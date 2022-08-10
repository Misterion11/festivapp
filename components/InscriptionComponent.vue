<template>
  <div class="flex flex-col items-center mt-8 mb-8">
    <div class="border flex flex-col items-center sm:w-2/5 w-11/12 space-y-4 pb-4">
      <h2>Inscrivez-vous </h2>
      <input v-model="user.email" class="sm:w-3/5 w-11/12" type="email" placeholder="Votre e-mail">
      <input v-model="user.displayName" class="sm:w-3/5 w-11/12" placeholder="Votre nom d'utilisateur" type="text">
      <input v-model="user.password" class="sm:w-3/5 w-11/12" type="password" placeholder="Votre mdp" minlength="6">
      <div class="sm:w-3/5 border-black border flex flex-col items-center w-11/12">
        <p>Votre photo de profil :</p>
        <client-only>
          <div class="m-4">
            <image-uploader
              :debug="1"
              output-format="file"
              :max-height="300"
              :auto-rotate="true"
              @input="setImage"
            />
          </div>
        </client-only>
      </div>

      <button class="border border-gray-400 w-1/3 rounded-full bg-blue-600 text-white hover:bg-blue-800 my-4" :disabled="!user.email || !user.displayName || !user.password || !user.url" @click="createUser">
        S'inscrire
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InscrptionComponent',
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
    setImage (file) {
      this.hasImage = true
      this.user.url = file
    },
    createUser () {
      const formData = new FormData()
      formData.append('email', this.user.email)
      formData.append('password', this.user.password)
      formData.append('displayName', this.user.displayName)
      formData.append('photoURL', this.user.url, this.user.id + '.png')
      console.log(formData)
      /* API: 'http://localhost:5000/signUp'
           API: 'https://festivapp-back.herokuapp.com/signUp' */
      this.$axios.post('https://festivapp-back.herokuapp.com/signUp', formData).then((response) => {
        alert('Compte crée avec succès')
        this.$router.push('/login')
      }).catch(() => {
        alert('Petit problème de back-end, nous revenons vite')
      })
    }
  }
}
</script>

<style>

</style>
