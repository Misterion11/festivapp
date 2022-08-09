<template>
  <div>
    <header-component />
    <connexion-component />
  </div>
</template>

<script>
import HeaderComponent from '~/components/HeaderComponent.vue'
export default {
  name: 'LoginPage',
  components: { HeaderComponent },
  data () {
    return {
      entete: 'Connectez-vous',
      button: 'Se connecter'
    }
  }
}
</script>

<style>

</style>
