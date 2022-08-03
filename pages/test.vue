<template>
  <div>
    <input v-model="rep.email" type="text" placeholder="email">
    <input v-model="rep.password" type="text" placeholder="password">
    {{ rep.test }}
    <button @click="login">
      vdcd
    </button>
  </div>
</template>

<script>

export default {
  name: 'BiteTE',
  data () {
    return {
      rep: {
        email: '',
        password: '',
        test: ''
      }
    }
  },
  computed: {
  },
  methods: {
    async login () {
      try {
        await this.$store.dispatch('login', {
          email: this.rep.email,
          password: this.rep.password
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>
