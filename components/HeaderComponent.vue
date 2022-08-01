<template>
  <div class="border-b-2 w-full h-16 flex justify-center items-center shadow-xl sticky top-0 z-10 bg-white">
    <div class="h-full w-5/6 flex justify-center">
      <NuxtLink to="/">
        <nuxt-img
          src="logo.png"
          class="h-full"
        />
      </NuxtLink>
    </div>
    <div v-if="connected" class="h-full flex items-center">
      <div class="text-5xl h-full cursor-pointer" @click="click">
        +
      </div>
      <nuxt-img
        src="thor.jpg"
        class="h-5/6 rounded-full mr-2 ml-2 sm:ml-8 sm:mr-0 "
      />
    </div>
    <div v-else>
      <p class="text-center">
        Se connecter
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  props: {
  },
  data () {
    return {
      connected: true
    }
  },
  methods: {
    click () {
      this.$emit('update:show', true)
    }
  }
}

</script>
