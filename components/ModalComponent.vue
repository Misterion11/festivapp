<template>
  <transition name="modal-fade">
    <div class="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-20">
      <div
        class="bg-white flex flex-col rounded-xl max-h-90 items-center sm:w-1/2 "
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
          class="relative self-center p-x-20 p-y-10 w-5/6"
        >
          <slot name="body">
            <client-only>
              <div class="flex justify-center my-4">
                <image-uploader
                  :debug="1"
                  output-format="file"
                  :max-height="300"
                  @input="setImage"
                />
              </div>
            </client-only>
            <div class="flex flex-col relative">
              <div class="flex items-center border-b border-gray-400">
                <nuxt-img
                  src="thor.jpg"
                  alt=""
                  class="rounded-full mr-2 h-10 mb-1"
                />
                <b> {{ userModal }}</b>
              </div>
              <textarea
                id=""
                v-model="post.description"
                name=""
                class="md:h-28 h-40 resize-none"
                placeholder="Ajouter une légende"
              />
              <emoji-picker
                :search="search"
                class="w-6 h-6 absolute bottom-20 right-0 cursor-pointer"
                @emoji="append"
              >
                <button
                  slot="emoji-invoker"
                  slot-scope="{ events: { click: clickEvent } }"
                  class="emoji-invoker"
                  @click.stop="clickEvent"
                >
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 fill-current text-grey"
                  >
                    <path
                      d="M0 0h24v24H0z"
                      fill="none"
                    />
                    <path
                      d="M11.99  2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                    />
                  </svg>
                </button>
                <div
                  slot="emoji-picker"
                  slot-scope="{ emojis, insert, display }"
                  class="md:ml-8 -mt-64"
                >
                  <div
                    class="emoji-picker"
                    :style="{ top: display.y + 'px', left: display.x + 'px' }"
                  >
                    <div class="emoji-picker__search">
                      <input
                        v-model="search"
                        v-focus
                        placeholder="thumbs_up"
                        type="text"
                      >
                    </div>
                    <div>
                      <div
                        v-for="(emojiGroup, category) in emojis"
                        :key="category"
                      >
                        <h5>{{ category }}</h5>
                        <div class="emojis">
                          <span
                            v-for="(emoji, emojiName) in emojiGroup"
                            :key="emojiName"
                            :title="emojiName"
                            @click="insert(emoji)"
                          >{{ emoji }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </emoji-picker>
              <div class="flex pt-2">
                <input v-model="post.festival" type="text" placeholder="Nom du festival" class="border-t border border-gray-300 w-1/2 h-9 mr-2">
                <input v-model="post.location" type="text" placeholder="Ajouter un lieu" class="border-t border border-gray-300 w-1/2 h-9 relative">
                <location-icon class="absolute right-0 bottom-11 cursor-pointer" @click.native="getLocation" />
              </div>

              <div class="flex justify-center pt-3">
                <button class="border border-gray-400 w-1/3 rounded-full bg-blue-600 text-white hover:bg-blue-800 my-4">
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
import EmojiPicker from 'vue-emoji-picker'
import BackIcon from './BackIcon.vue'
import LocationIcon from './LocationIcon.vue'
export default {
  name: 'ModalComponent',
  components: {
    BackIcon,
    EmojiPicker,
    LocationIcon
  },
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  },
  props: {
    userModal: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      com: false,
      input: '',
      search: '',
      post: {
        id: Math.ceil(Math.random() * 1000000),
        description: '',
        location: '',
        festival: '',
        url: null,
        date: Date.now()
      }
    }
  },
  methods: {
    append (emoji) {
      this.post.description += emoji
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
      }, (err) => {
        console.log('err:', err)
        alert("Nous n'arrivons pas à vous trouver, essayer encore")
      }, { timeout: 7000 })
    },
    getCityAndCountry (position) {
      const url = `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1&auth123097088423134e15976243x81044`
      this.$axios.get(url).then((result) => {
        console.log('result:', result)
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
