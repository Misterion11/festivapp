<template>
  <div class="border-2 border-gray-300 rounded-2xl flex flex-col items-center sm:w-2/5 mb-4">
    <div class="flex items-center justify-start w-full border-b-2 ">
      <nuxt-img
        src="thor.jpg"
        class="rounded-full h-12 mx-4"
      />
      <p>Misterion</p>
    </div>
    <nuxt-img
      src="/Bleach.jpg"
      class="w-full object-scale-down"
    />
    <div class="flex flex-col space-y-2 justify-start w-full">
      <div class="flex justify-start space-x-2 w-full">
        <heart-icon />
        <p class="font-bold">
          56 J'aime
        </p>
      </div>
      <p>
        <b>Misterion</b> Ceci est une description vraiment incroyable et spectaculaire faite par
        mes soins.
      </p>
      <p class="italic">
        Il y a une heure
      </p>
      <input
        class="w-full rounded-b-xl border-t-2 "
        type="text"
        placeholder="Ajoutez votre commentaire"
      >
      <airplane-icon
        class=""
      />
      <SearchIcon />
    </div>
  </div>
</template>
<script>
import { SearchIcon } from '@heroicons/vue/outline'
import AirplaneIcon from './AirplaneIcon.vue'
import HeartIcon from './HeartIcon.vue'
export default {
  name: 'ComponentPost',
  components: {
    HeartIcon,
    AirplaneIcon,
    SearchIcon
  }
}

</script>
