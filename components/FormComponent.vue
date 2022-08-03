<template>
  <form id="signup-form">
    <div class="flex flex-col items-center mt-8">
      <div class="border flex flex-col items-center w-2/5 space-y-4 pb-4">
        <h2>{{ entete }} </h2>
        <input class="w-3/5" type="text" placeholder="Votre e-mail">
        <input class="w-3/5" type="text" placeholder="Votre mdp">
        <button class="border border-gray-400 w-1/3 rounded-full bg-blue-600 text-white hover:bg-blue-800 my-4">
          {{ buttonText }}
        </button>
        <div v-if="connectPart">
          <p class="pb-4">
            ---------------------- OU ----------------------
          </p>
          <p>
            Vous n’avez pas de compte ? <span class="text-blue-600 cursor-pointer" @click="change">Inscrivez-vous</span>
          </p>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'FormComponent',
  data () {
    return {
      entete: 'Connectez-vous',
      buttonText: 'Se connecter',
      connectPart: true
    }
  },
  methods: {
    change () {
      this.entete = 'Inscrivez-vous'
      this.buttonText = 'S\'inscrire'
      this.connectPart = false
    }
  }
}
</script>

<style>

</style>
