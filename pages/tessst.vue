<template>
  <div>
    <input v-model="user.email" type="text">
    <input v-model="user.password" type="text">
    <button @click="createUser">
      Oue
    </button>
    <button @click="connect">
      Oue
    </button>
  </div>
</template>

<script>
export default {
  name: 'TessTT',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    createUser () {
      const user = {
        email: this.user.email,
        password: this.user.password
      }
      console.log(user)
      setTimeout(() => {
        this.$axios.post('http://localhost:8080/signup', user).then((response) => {
          console.log(response.data)
        }).catch(() => {
          alert('Petit problème de back-end, nous revenons vite')
        })
      }, 3000)
    },
    connect () {
      const user = {
        email: this.user.email,
        password: this.user.password
      }
      console.log(user)
      setTimeout(() => {
        this.$axios.post('http://localhost:8080/login', user).then((response) => {
          console.log(response.data)
        }).catch(() => {
          alert('Petit problème de back-end, nous revenons vite')
        })
      }, 3000)
    }
  }
}
</script>

<style>

</style>
