<script setup lang="ts">
/* import { fetchArtisan, renderMii, downloadMii, formatWiiNumber } from '@/backend'
import { formatDate } from '@/date_format'
import { isValidWiiNumber } from 'nwc24js' */

useHead({
  title: 'Artisan View | CMOC Viewing Tool',
  meta: [
    { name: 'description', content: 'Detailed information about a specific Mii Artisan, including all their posted Miis for you to download!'},
    { property: 'og:image', content: '/img/cmocseobg.png' },
  ],
})

const route = useRoute('/artisans/:id')
const router = useRouter()
const current_page = ref(route.query.page ? parseInt(route.query.page as string) : 1)
const artisanAsyncName = computed(() => `artisan-${route.params.id}`);

const { data, status } = useAsyncData(artisanAsyncName.value, () => {
    return $fetch('/api/artisans/100000005', {
        params: {
            page: current_page.value,
        }
    })
}, {
    lazy: true,
    watch: [current_page],
})
</script>

<template>
  <div v-if="data" class="container translate-y-10">
    <ReturnBtn />
    <div class="mt-3 flex sm:flex-row flex-col gap-6">
      <ul class="sm:w-48 w-full relative">
        <ArtisanCard v-bind="data.artisan_data" />
      </ul>
      <div class="pb-3 flex flex-col items-start justify-end">
        <Title :name="data.artisan_data.name" class="mobile-hide"/>
        <div class="sm:-translate-y-12" style="width:100%;">
            <div class="w-full mb-3 flex sm:flex-row sm:w-full flex-col sm:items-center items-start justify-between gap-3 relative">
        <button 
        class="p-3 pl-6 pr-6 sm-width bg-green-500/60 border-1 border-green-60 backdrop-blur-md rounded-md hover:bg-green-600 transition-all"
        @click="downloadMii(data.artisan_data.name, data.artisan_data.entryId, data.artisan_data.mii_data)"
        ><Icon name="fa6-solid:download" /> Download {{ data.artisan_data.name }}'s Mii</button>
        <span v-if="data.artisan_data.isMaster" class="sm-width p-1 pl-2 pr-2 text-md font-bold text-center select-none rounded-full bg-orange-400"
        >◆ Master Mii Artisan ◆
        </span>
        </div>
        <div class="flex flex-col text-xl text-black">
          <span class="opacity-30 text-sm">Wii Number</span>
          <div class="flex flex-row gap-3">{{ formatWiiNumber(data.artisan_data.wiiNumber) }}
          <span v-if="isArtisanNumberValid" class="text-green-500"><Icon name="fa6-solid:check" /></span>
          <span v-else class="text-red-500"><i class="fa-solid fa-triangle-exclamation text-yellow-300 cursor-pointer" title="This Wii Number was generated on Dolphin Emulator." onmouseover="document.getElementById('dolWarn').style.opacity = 1;" onmouseleave="document.getElementById('dolWarn').style.opacity = 0;"/></span>
        </div>
        </div>
        <div class="flex flex-row items-center text-black">
          <div class="flex flex-col justify-end text-left text-black">
            <span class="opacity-30 text-sm">Last posted on </span>
            <p id="lastPost" class="text-xl text-black">
              {{ lastPostFormatted }}
          </p>
          </div>
        </div>
    </div>
      </div>
    </div>
    <hr class="pb-3 opacity-5 border-t-black dark:border-t-white" >
    <div class="mt-6 mb-3 flex flex-row gap-5 items-center justify-between">
      <h1 class="font-bold text-4xl">Miis</h1>
      <h2 class="opacity-60 text-right">{{ data.artisan_data.name }} has submitted {{ data.artisan_data.numberOfPosts }} Miis.</h2>
    </div>
    <div v-if="data.entries_data.miis_data && data.entries_data.miis_data.length > 0">
      <ul v-id="status !== 'pending'" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-10 gap-3">
        <MiiCardNew v-for="entries in data.entries_data.miis_data" :key="entries.entryId" v-bind="entries" />
      </ul>
      <LoadingAnimation v-if="status === 'pending'" />
      <PageNavigation
        :current_page="current_page"
        :total_pages="data.entries_data.total_pages"
        class="mt-10"
        @update:current_page="(value) => { current_page = value; router.push({ query: { page: value } }) }" />
    </div>
    <div v-else-if="data.artisan_data && !data.entries_data.miis_data" class="p-20 w-full h-30 rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative">
      <div class="flex flex-col items-center gap-3 text-gray-500 dark:text-slate-400">
        <i class="fa-solid fa-magnifying-glass text-6xl"/>
        <h2 class="w-96 text-center relative">
          {{ data.artisan_data.name }} has posted no Miis. Once they do, they will be shown here...
        </h2>
      </div>
    </div>
  </div>
  <div v-else class="container p-20 w-full h-30 translate-y-14 rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative">
        <div class="flex flex-col items-center gap-3 text-gray-500 dark:text-slate-400">
          <div class="flex flex-row gap-3 items-center"><Icon name="fa6-solid:bomb" class="size-15" /></div>
        <h2 class="w-96 text-center relative">The Mii Artisan you were looking for could not be found...</h2>
    </div>
    </div>
</template>

<style>
  .sm-width {
    width:auto;
  }
  @media only screen and (max-width: 640px) {
    .sm-width {
      width:100%;
    }
  }
</style>