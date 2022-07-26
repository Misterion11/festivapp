<template>
  <div class="border-b-2 w-full h-16 flex justify-center items-center shadow-xl mb-4">
    <div class="h-full w-5/6 flex justify-center">
      <NuxtLink to="/">
        <nuxt-img
          src="logo.png"
          class="h-full"
        />
      </NuxtLink>
    </div>
    <div class="h-full flex items-center">
      <PlusIcon />
      <nuxt-img
        src="thor.jpg"
        class="h-5/6 rounded-full mr-2 ml-2 sm:ml-8 sm:mr-0 "
      />
    </div>
  </div>
</template>

<script>
import PlusIcon from './PlusIcon.vue'
export default {
  name: 'HeaderComponent',
  components: { PlusIcon }
}

</script>
