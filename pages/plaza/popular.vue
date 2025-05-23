<script setup lang="ts">
useHead({
  title: 'Popular | CMOC Viewing Tool',
  meta: [
    { name: 'description', content: 'Up and rising Miis in our service, download them for yourself!'},
    { property: 'og:image', content: '/img/cmocseobg.png' },
  ],
})

const route = useRoute()
const router = useRouter()
const current_page = ref(route.query.page ? parseInt(route.query.page as string) : 1)

const { data, status } = await useAsyncData('popular', () => {
    return $fetch('/api/plaza/popular', {
      params: {
        page: current_page.value,
      },
    })
}, {
    lazy: true,
    watch: [current_page],
})
</script>

<template>
  <div>
    <img src="https://rc24.xyz/goodies/wallpapers/CMO_Channel_BG_blue_1600x900.png" class="w-full absolute z-0 blur-sm dissolve" alt="CMOC Background Image">
    <div class="container translate-y-10">
        <TitlePage>Popular</TitlePage>
        <LoadingAnimation v-if="status === 'pending'" />
        <template v-if="data">
            <p class="-translate-y-20 text-right opacity-45 text-black">
                There are {{ 50 * data.total_pages-1 }}+ Miis in the Plaza!
            </p>
            <div>
                <ul v-if="status !== 'pending'" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-10 gap-3 -translate-y-14">
                    <MiiCardNew v-for="mii in data.data" :key="mii.entryId" v-bind="mii" />
                </ul>
                <PageNavigation :current_page="current_page" :total_pages="data.total_pages" @update:current_page="(value: number) => (current_page = value, router.push({ query: { ...route.query, page: value.toString() } }))" />
            </div>
        </template>
        <div v-if="status === 'error'">
            <div class="p-20 w-full h-30 rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative">
                <div class="flex flex-col items-center gap-3 text-gray-500 dark:text-slate-400">
                    <Icon name="fa6-solid:bomb" class="text-6xl" />
                    <h2 class="w-96 text-center relative">Could not establish a connection to the Plaza database, please try again later...</h2>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
