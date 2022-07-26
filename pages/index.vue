<template>
  <div>
    <HeaderComponent />
    <div
      v-for="post in posts"
      :key="post.id"
      class="bg-gray-100 flex justify-center w-full"
    >
      <ComponentPost />
    </div>
  </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'
export default {
  name: 'HomePage',
  components: {
    HeaderComponent
  },
  data () {
    return {
      posts: [{
        id: 1,
        caption: 'Ichigo',
        date: 1658844658327,
        location: 'Hueco Mundo',
        url: 'Bleach.jpg'
      },
      {
        id: 2,
        caption: 'Ichigo',
        date: 1658844658327,
        location: 'Hueco Mundo',
        url: 'Bleach.jpg'
      },
      {
        id: 3,
        caption: 'Ichigo',
        date: 1658844658327,
        location: 'Hueco Mundo',
        url: 'Bleach.jpg'
      },
      {
        id: 4,
        caption: 'Ichigo',
        date: 1658844658327,
        location: 'Hueco Mundo',
        url: 'Bleach.jpg'
      }
      ]
    }
  }
}

</script>
