<template>
  <div class="border-b-2 w-full h-16 flex justify-center items-center shadow-xl sticky top-0 z-10 bg-white">
    <div class="h-full w-3/5 sm:w-full flex justify-center">
      <NuxtLink to="/">
        <nuxt-img
          loading="lazy"
          src="logo.png"
          class="h-full"
        />
      </NuxtLink>
    </div>
    <div v-if="$store.state.store.user.displayName" class="h-full flex items-center">
      <sort-icon class="cursor-pointer" @click.native="sort" />
      <plus-icon class="cursor-pointer" @click.native="modal" />
      <nuxt-img
        :src="$store.state.store.user.url"
        class="h-12 w-12 rounded-full mr-2 ml-2 sm:ml-8 sm:mr-4 cursor-pointer"
        @click="profil"
      />
    </div>
    <div v-else class="w-32">
      <p class="text-center pr-4 hover:text-purple-600">
        <nuxt-link to="/Login">
          Se connecter
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
import PlusIcon from './PlusIcon.vue'
import SortIcon from './SortIcon.vue'
export default {
  name: 'HeaderComponent',
  components: { PlusIcon, SortIcon },
  props: {
  },
  methods: {
    sort () {
      this.$emit('update:sort', true)
    },
    modal () {
      this.$emit('update:show', true)
    },
    profil () {
      this.$router.push('/Profil')
    }
  }
}

</script>
