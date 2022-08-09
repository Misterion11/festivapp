<template>
  <div class="border-b-2 w-full h-16 flex justify-center items-center shadow-xl sticky top-0 z-10 bg-white">
    <div class="h-full w-3/5 sm:w-full flex justify-center">
      <NuxtLink to="/">
        <nuxt-img
          src="logo.png"
          class="h-full"
        />
      </NuxtLink>
    </div>
    <div v-if="$store.state.store.user.displayName" class="h-full flex items-center">
      <plus-icon class="cursor-pointer" @click.native="click" />
      <nuxt-img
        :src="$store.state.store.user.url"
        class="h-12 w-12 rounded-full mr-2 ml-2 sm:ml-8 sm:mr-4 "
      />
      <p class="text-center cursor-pointer text-xs sm:text-base pr-4" @click="logOut">
        Se déconnecter
      </p>
    </div>
    <div v-else>
      <p class="text-center pr-2">
        <nuxt-link to="/Login">
          Se connecter
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
import PlusIcon from './PlusIcon.vue'
export default {
  name: 'HeaderComponent',
  components: { PlusIcon },
  props: {
  },
  methods: {
    click () {
      this.$emit('update:show', true)
    },
    logOut () {
      this.$store.commit('store/refreshState')
    }
  }
}

</script>
