<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import type { Mii } from '~/types/data'
import { renderMii, downloadMii  } from '@/backend'
import { countries } from '~/types/countries'
import { skills } from '~/types/skills'


const props = defineProps<Mii>()
const mii_img = await renderMii(props.mii_data)
const country_flag = computed(() => countries[props.country_id]?.flag)

const artisanMaster = ref(false)
const mouseOver = ref(false)
const mouseClick = ref(false)

const isTooltipHovered = ref(false)

const twemoji = ref(null)

// Import twemoji from the CDN
onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/@twemoji/api@latest/dist/twemoji.min.js'
  script.crossOrigin = 'anonymous'
  script.onload = () => {
    twemoji.value = window.twemoji
  }
  document.head.appendChild(script)

})

// Use twemoji to render the country flag
const countryFlagHtml = computed(() => {
  if (twemoji.value && country_flag.value) {
    return twemoji.value.parse(country_flag.value)
  }
  return ''
})

const encodeEntryId = (entry_id) => {
    let num = entry_id;
    num = (num ^ ((num << 0x1E) ^ (num << 0x12) ^ (num << 0x18))) >>> 0;
    num = (num ^ ((num & 0xF0F0F0F) << 4)) >>> 0;
    num = (num ^ ((num >>> 0x1D) ^ (num >>> 0x11) ^ (num >>> 0x17) ^ 0x20070419)) >>> 0;

    let crc = ((num >>> 8) ^ (num >>> 24) ^ (num >>> 16) ^ (num & 0xFF) ^ 0xFF) >>> 0;
    if (232 < ((0xD4A50FFF < num) + (crc & 0xFF))) {
        crc &= 0x7F;
    }

    crc &= 0xFF;

    const crcBinary = crc.toString(2).padStart(8, '0');
    const numBinary = num.toString(2).padStart(32, '0');
    const combinedBinary = crcBinary + numBinary;
    const combinedNumberString = parseInt(combinedBinary, 2).toString().padStart(12, '0');

    return combinedNumberString.match(/.{1,4}/g).join('-');
};

const entry_id = encodeEntryId(props.entry_id)
const basic_entry_id = props.entry_id

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
}

const rankingClass = computed(() => {
  switch (props.ranking) {
    case 1:
      return 'bg-gold'
    case 2:
      return 'bg-silver'
    case 3:
      return 'bg-bronze'
    default:
      return ''
  }
})

const skillName = computed(() => {
  return skills[props.skill]
})

const genderIcon = computed(() => {
  switch (props.gender) {
    case 1:
      return 'fa-solid fa-male'
    case 2:
      return 'fa-solid fa-female'
    default:
      return ''
  }
})
</script>

<template>
  <li
    ref="card"
    :class="rankingClass"
    :style="{
    backgroundColor: isTooltipHovered ? '#36d14160' : '',
    border: isTooltipHovered ? '1px solid green' : ''
    }"
    class="p-3 has-report rounded-xl border flex flex-col justify-between relative z-20 bg-gray-100 dark:border-slate-600/60 dark:bg-slate-700/60 dark:text-white hover:shadow-xl transition-shadow overflow-hidden backdrop-blur-md bg-opacity-50"
    @mousemove="handleMouseMove"
    @mouseleave="resetTransform"
  >

    <span
      v-if="ranking"
      class="-top-4 text-7xl font-bold dark:text-white opacity-5 z-0 absolute select-none self-start text-black -ml-2"
      :class="{ 'mb-[7.5rem]' : !nickname }"
      >{{ ranking }}</span
    >
    <div class="z-10 flex flex-col w-full items-center hover:z-30">
      <span class="self-end text-2xl" v-html="countryFlagHtml" />
      <div 
      v-if="nickname"
      class="has-tooltip"
      @mouseenter="isTooltipHovered = true"
      @mouseleave="isTooltipHovered = false">
        <span
          class="top-2 left-2 tooltip rounded shadow-lg p-2 pl-3 pr-3 bg-green-600 hover:bg-green-700 text-white cursor-pointer absolute"
          @click="downloadMii(nickname, entry_id, mii_data)"
          ><Icon name="fa6-solid:download" />
        </span>
        <img
          class="w-28 bottom-3 cursor-pointer relative"
          :src="mii_img"
          :alt="`${nickname} Mii`"
          @click="downloadMii(nickname, entry_id, mii_data)"
        >
      </div>
      <div 
      v-else
      class="has-tooltip"
      @mouseenter="isTooltipHovered = true"
      @mouseleave="isTooltipHovered = false">
        <span
          class="top-2 left-2 tooltip rounded shadow-lg p-2 pl-3 pr-3 bg-green-600 hover:bg-green-700 text-white cursor-pointer absolute"
          @click="downloadMii([contest_id, ranking], entry_id, mii_data)"
          ><i class="fa-solid fa-download"/></span>
        <img
          class="w-28 h-30 bottom-3 cursor-pointer relative"
          :src="mii_img"
          :alt="`${nickname} Mii`"
          @click="downloadMii([contest_id, ranking], entry_id, mii_data)"
        >
      </div>
      <h1 class="text-3xl relative bottom-3 text-center flex flex-col gap-1">{{ nickname }} <p class="text-sm text-black opacity-60">{{ entry_id }} 
        <i
:class="[
      'cursor-pointer', 
      'transition-all', 
      mouseClick ? 'fa-solid fa-check text-green-400' : (mouseOver ? 'fa-solid fa-copy' : 'fa-regular fa-copy')
    ]"
   @mouseenter="mouseOver = true"
   @mouseleave="mouseOver = false"
   @click="mouseClick = true; copyToClipboard(entry_id)"/>
      </p></h1>
    </div>
    <span class="w-full text-2xl flex items-end justify-between gap-1 flex-no-wrap z-10"
        ><span class="flex flex-col gap-1"><span><i class="fa-solid fa-thumbs-up text-xl"/> {{ perm_likes }}</span><span v-if="artisan_name" class="text-sm opacity-60">by <RouterLink v-if="artisan_is_master" :to="`/artisans/${artisan_id}`" class="p-1 pl-2 pr-2 text-sm text-black bg-orange-400 rounded-full">◆{{ artisan_name }}◆</RouterLink><RouterLink v-else :to="`/artisans/${artisan_id}`" class="underline text-sm text-black">{{ artisan_name }}</RouterLink></span></span
        ><span class="flex flex-col gap-1"><i :class="genderIcon" class="text-right"/><span v-if="skill" class="text-sm opacity-60">{{ skillName.name }}</span></span></span
      >
    <span
      class="bottom-0 text-8xl font-bold text-white opacity-5 absolute -mr-3.5 -mb-4 text-black select-none self-end z-0"
      >{{ initials }}</span
    >
    <div class="blur"/>
  </li>
</template>

<script lang="ts">
export default {
  methods: {
    handleMouseMove(event) {
      const card = this.$refs.card
      const blur = card.querySelector('.blur')
      const { width, height, left, top } = card.getBoundingClientRect()
      const mouseX = event.clientX - left - width / 2
      const mouseY = event.clientY - top - height / 2

      const rotateY = (mouseX / width) * 20 // Rotation around the Y axis
      const rotateX = (-mouseY / height) * 20 // Rotation around the X axis

      card.style.transform = `perspective(800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`

      const rect = card.getBoundingClientRect()
      blur.style.left = event.clientX - rect.left - 50 + 'px'
      blur.style.top = event.clientY - rect.top - 50 + 'px'
      blur.style.display = 'block'
    },
    resetTransform() {
      const card = this.$refs.card
      const blur = card.querySelector('.blur')
      card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)'
      blur.style.display = 'none'
    },
  }
}
</script>

<style>


</style>
