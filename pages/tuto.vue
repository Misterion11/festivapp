<template>
  <div class="">
    <Tutorial />
    <h1>Index</h1>
    <NuxtLink to="/test">
      Ici le test
    </NuxtLink>
  </div>
</template>

<script>
import Tutorial from '~/components/Tutorial.vue'
export default {
  name: 'IndexPage',
  components: { Tutorial }
}

</script>
