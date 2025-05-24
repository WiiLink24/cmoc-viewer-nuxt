<script setup lang="ts">
import twemoji from "twemoji";
import { countries } from "~/types/countries";

interface ArtisanProps {
  artisanId: number | null;
  name: string | null;
  countryId: number | null;
  wiiNumber: number | null;
  miiData: string | null;
  numberOfPosts: number;
  totalLikes: number;
  isMaster: boolean;
  lastPost: string;
}

const props = defineProps<ArtisanProps>();
const mii_img = await renderMii(props.miiData!);

const country_flag = computed(() => countries[props.countryId!].flag);

const target = ref<HTMLElement | null>(null);
const { handleMouseMove, resetTransform } = useCardHover(target);

const countryFlagHTML = computed(() => {
  return twemoji.parse(country_flag.value, {
    base: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/",
  });
});
</script>

<template>
  <li
    ref="target"
    :class="{
      'bg-yellow-600/30 dark:bg-yellow-600/30 border-yellow-300/50 dark:border-yellow-300/50':
        props.isMaster,
    }"
    class="p-3 rounded-xl border flex flex-col justify-between relative z-20 dark:border-slate-600/60 dark:bg-slate-700/60 dark:text-white hover:shadow-xl transition-shadow overflow-hidden backdrop-blur-md bg-opacity-50"
    @mousemove="handleMouseMove"
    @mouseleave="resetTransform"
  >
    <NuxtLink :href="{ name: 'artisans-id', params: { id: artisanId } }" class="hover:no-underline">
      <span
        v-if="props.isMaster"
        class="w-full text-7xl font-bold opacity-30 z-0 absolute select-none -ml-0 mb-[9.75rem] text-yellow-500 -rotate-6"
        ><Icon name="fa6-solid:crown" /></span>
      <div class="z-10 flex flex-col w-full items-center justify-between">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span class="self-end text-2xl" v-html="countryFlagHTML" />
        <img
          class="w-28 h-30 bottom-3 relative"
          :src="mii_img"
          :alt="`${props.name}'s Mii`"
        >
        <h1 class="text-3xl relative bottom-5 text-center">
          {{ props.name }}
        </h1>
      </div>
      <div class="blur" />
    </NuxtLink>
    <span
      class="w-full text-2xl flex items-center justify-between gap-3 flex-wrap"
      ><span><Icon name="fa6-solid:thumbs-up" /> {{ props.totalLikes }}</span
      ><span>{{ props.numberOfPosts }} <Icon name="fa6-solid:user" /></span
    ></span>
  </li>
</template>
