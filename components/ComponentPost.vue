<template>
  <div class="border-2 border-gray-300 rounded-2xl flex flex-col items-center sm:w-2/5 h-2/5 my-4 w-11/12">
    <div class="flex items-center justify-start w-full border-b-2 py-1 ">
      <nuxt-img
        loading="lazy"
        :src="urlUser"
        class="rounded-full w-12 h-12 mx-4"
      />
      <h1 class="font-bold text-lg">
        {{ user }}
      </h1>
    </div>
    <nuxt-img
      loading="lazy"
      :src="url"
      class="w-full w-96"
    />
    <div class="flex flex-col space-y-2 justify-start w-full px-2 pt-2">
      <div class="flex justify-start space-x-2 w-full">
        <heart-icon class="cursor-pointer" />
        <p class="font-bold">
          {{ nbLikes }} J'aime
        </p>
      </div>
      <p>
        <b>{{ user || thor }}</b> {{ description }}
      </p>
      <p
        class="text-gray-600 cursor-pointer w-56"
        @click="com = !com"
      >
        Afficher le(s) commentaire(s)
      </p>
      <div v-if="com">
        <p
          v-for="commentaire in commentaires"
          :key="commentaire"
          class="mb-2"
        >
          {{ commentaire }}
        </p>
      </div>

      <div class="flex">
        <location-icon class="mr-1 -ml-1" /> <p> {{ festival }}, <i>{{ location }}</i> posté le <i>{{ date | niceDate }}</i></p>
      </div>
    </div>
    <div class="relative flex items-center text-gray-400 w-full">
      <form
        action=""
        class="w-full mt-2"
      >
        <input
          v-model="input"
          class="w-full text-gray-600 rounded-b-xl sm:pl-8 pl-3 pb-3 pr-8 h-12 pb-1 border-none"
          type="text"
          placeholder="Ajoutez votre commentaire"
        >
      </form>
      <airplane-icon class="w-6 h-6 absolute right-1 bottom-3 cursor-pointer" @click.native="send" />
      <emoji-picker
        v-if="!isMobile()"
        :search="search"
        class="w-6 h-6 absolute left-1 bottom-3 cursor-pointer"
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
          slot-scope="{ emojis, insert }"
        >
          <div
            class="emoji-picker"
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
    </div>
  </div>
</template>
<script>
import EmojiPicker from 'vue-emoji-picker'
import AirplaneIcon from './AirplaneIcon.vue'
import HeartIcon from './HeartIcon.vue'
import LocationIcon from './LocationIcon.vue'
export default {
  name: 'ComponentPost',
  components: {
    HeartIcon,
    AirplaneIcon,
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
  filters: {
    niceDate (value) {
      return new Date(value).toLocaleDateString()
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    nbLikes: {
      type: Number,
      default: () => 0
    },
    commentaires: {
      type: Array,
      default: () => []
    },
    description: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    festival: {
      type: String,
      required: true
    },
    date: {
      type: Number,
      required: true
    },
    url: {
      type: String,
      default: () => ''
    },
    urlUser: {
      type: String,
      default: () => ''
    }
  },
  data () {
    return {
      com: false,
      input: '',
      search: ''
    }
  },
  methods: {
    append (emoji) {
      this.input += emoji
    },
    isMobile () {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    },
    send () {
      if (!this.$store.state.store.user.name) {
        alert("Vous n'êtes pas connecté")
      }
      const data = {
        id: this.id,
        com: this.input,
        store: this.$store.state.store.user.displayName
      }
      // http://localhost:8000/com
      // https://festivapp-log.herokuapp.com/com
      this.$axios.post('https://festivapp-log.herokuapp.com/com', data).then(() => {
        window.location.reload(true)
      }).catch(() => {
        alert('Petit problème de back-end, nous revenons vite')
      })
    }
  }
}

</script>
<style scoped>
  @import '~/css/emoji.css';

</style>
