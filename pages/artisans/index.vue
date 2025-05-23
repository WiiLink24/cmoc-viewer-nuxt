<script setup lang="ts">

useHead({
  title: 'Artisans | CMOC Viewing Tool',
  meta: [
    { name: 'description', content: 'Here are all the people that make the amazing Miis you see on the Plaza!'},
    { property: 'og:image', content: '/img/cmocseobg.png' },
  ],
})

const route = useRoute()
const router = useRouter()
const current_page = ref(route.query.page ? parseInt(route.query.page as string) : 1)

const { data, status } = useAsyncData('artisans', () => {
    return $fetch('/api/artisans', {
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
  <div>
      <img
        src="https://rc24.xyz/goodies/wallpapers/CMO_Channel_BG_1600x900.png"
        class="w-full absolute z-0 blur-sm dissolve"
        alt="CMOC Background Image"
      >
      <div class="container translate-y-10">
        <TitlePage>Artisans</TitlePage>
        <div v-if="data">
          <ul v-if="status !== 'pending'" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-10 gap-3 mb-6 -translate-y-8">
            <ArtisanCard v-for="artisan in data.data" :key="artisan.artisanId" v-bind="artisan" />
          </ul>
          <LoadingAnimation v-if="status === 'pending'" />
          <PageNavigation
            :current_page="current_page"
            :total_pages="data.total_pages"
            @update:current_page="(value) => { current_page = value; router.push({ query: { page: value } }) }"
          />
        </div>
        <div v-else class="p-20 w-full h-30 rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative">
          <div class="flex flex-col items-center gap-3 text-gray-500 dark:text-slate-400">
              <Icon name="fa6-solid:bomb" class="text-6xl" />
              <h2 class="w-96 text-center relative">Could not establish a connection to the Plaza database, please try again later...</h2>
          </div>
        </div>
      </div>
  </div>
</template>
