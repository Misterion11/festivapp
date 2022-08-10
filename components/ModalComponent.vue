<template>
  <transition name="modal-fade">
    <div class="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-20">
      <div
        class="bg-white flex flex-col rounded-xl max-h-90 items-center sm:w-1/2 max-h-screen w-11/12 overflow-y-auto"
        role="dialog"
      >
        <header
          id="modalTitle"
          class="p-2 border-b-2 font-30 flex items-center w-full"
        >
          <slot name="header">
            <div
              class=""
              @click="click"
            >
              <back-icon class="cursor-pointer" />
            </div>
            <div class="w-full text-center">
              Créer une nouvelle publication
            </div>
          </slot>
        </header>
        <section
          id="modalDescription"
          class="relative self-center p-x-20 p-y-10 w-full"
        >
          <slot name="body">
            <client-only>
              <div class="flex justify-center my-4">
                <image-uploader
                  :debug="1"
                  output-format="file"
                  :max-height="300"
                  :auto-rotate="true"
                  @input="setImage"
                />
              </div>
            </client-only>
            <div class="flex flex-col relative w-11/12 mx-auto">
              <div class="flex items-center border-gray-400">
                <nuxt-img
                  loading="lazy"
                  :src="$store.state.store.user.url || 'thor.jpg'"
                  class="rounded-full mr-2 h-12 w-12 mb-1"
                />
                <b> {{ $store.state.store.user.displayName }}</b>
              </div>
              <textarea
                id=""
                v-model="post.description"
                name=""
                class="h-28 resize-none pl-2 pt-1"
                placeholder="Ajouter une légende"
              />
              <div class="flex pt-2">
                <input v-model="post.festival" type="text" placeholder="Nom du festival" class="border-t border border-gray-300 w-1/2 h-9 mr-2 pl-2">
                <input v-model="post.location" type="text" placeholder="Ajouter un lieu" class="border-t border border-gray-300 w-1/2 h-9 relative pr-8 pl-2">
                <location-icon class="absolute right-2 bottom-18 cursor-pointer" @click.native="getLocation" />
              </div>

              <div class="flex justify-center pt-3">
                <button class="border border-gray-400 w-1/3 rounded-full bg-blue-600 text-white hover:bg-blue-800 my-4" :disabled="!post.description || !post.url || !post.location || !post.festival" @click="addPost">
                  Partager
                </button>
              </div>
            </div>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
import BackIcon from './BackIcon.vue'
import LocationIcon from './LocationIcon.vue'
export default {
  name: 'ModalComponent',
  components: {
    BackIcon,
    LocationIcon
  },
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  },
  data () {
    return {
      com: false,
      input: '',
      search: '',
      post: {
        id: Math.ceil(Math.random() * 100000000),
        name: this.$store.state.store.user.displayName,
        description: '',
        location: '',
        festival: '',
        url: null,
        urlUser: this.$store.state.store.user.url,
        date: Date.now()
      }
    }
  },
  methods: {
    append (emoji) {
      this.post.description += emoji
    },
    addPost () {
      console.log(this.$store.state.store.user.displayName)
      const formData = new FormData()
      formData.append('id', this.post.id)
      formData.append('date', this.post.date)
      formData.append('name', this.post.name)
      formData.append('urlUser', this.post.urlUser)
      formData.append('description', this.post.description)
      formData.append('festival', this.post.festival)
      formData.append('location', this.post.location)
      formData.append('url', this.post.url, this.post.id + '.png')

      /* API: 'http://localhost:5000/createPost'
           API: 'https://festivapp-back.herokuapp.com/createPost' */
      this.$axios.post('https://festivapp-back.herokuapp.com/createPost', formData).then((res) => {
        window.location.reload(true)
      }).catch(() => {
        alert('Petite erreur')
      })
    },
    setImage (file) {
      this.hasImage = true
      this.post.url = file
    },
    click () {
      this.$emit('update:show', false)
    },
    getLocation () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.getCityAndCountry(position)
      }, () => {
        alert("Nous n'arrivons pas à vous trouver, essayez encore")
      }, { timeout: 7000 })
    },
    getCityAndCountry (position) {
      const url = `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1&auth123097088423134e15976243x81044`
      this.$axios.get(url).then((result) => {
        this.locationSucess(result)
      }).catch(() => {
        alert("Nous n'arrivons pas à vous trouver, essayez encore")
      })
    },
    locationSucess (result) {
      this.post.location = result.data.city
      if (result.data.country) {
        this.post.location += `, ${result.data.country}`
      }
    }
  },
  plugins: [
    { src: '~/plugins/vue-image-upload.client.js' }
  ]

}

</script>

<style scoped>
  @import '~/css/emoji.css';

</style>
