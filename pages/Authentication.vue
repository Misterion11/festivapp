<template>
  <div>
    <HeaderComponent />
    <form-component :entete="connectez" :connect-part="true" :button-text="button" />
  </div>
</template>

<script>
import FormComponent from '~/components/FormComponent.vue'
export default {
  name: 'AuthenticationPage',
  components: { FormComponent },
  data () {
    return {
      connectez: 'Connectez-vous',
      button: 'Se connecter'
    }
  }
}
</script>

<style>

</style>
