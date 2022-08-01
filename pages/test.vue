<template>
  <image-compressor ref="compressor" class="compressor" :done="getFiles" :scale="scale" :quality="quality" />
</template>
<script>
export default {
  name: 'TestPo',
  plugins: [
    { src: '~/plugins/vue-image-compressor.client.js' }
  ],
  data () {
    return {
      scale: 100,
      quality: 50
    }
  },
  methods: {
    getFiles (obj) {
      this.img = obj.compressed.blob
      this.original = obj.original
      this.compressed = obj.compressed
    }
  }
}
</script>

<style>

</style>
