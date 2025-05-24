<script setup lang="ts">
useHead({
  title: 'Search | CMOC Viewing Tool',
  meta: [
    { name: 'description', content: 'Search all of our Mii database and download them for yourself!'},
    { property: 'og:image', content: '/img/cmocseobg.png' },
  ],
})

const search_field = ref<string>('')
const search_type = ref<'miis' | 'artisans'>('miis')
const search_url = computed(() => {
  return search_type.value === 'miis' ? '/api/plaza/search' : '/api/artisans/search'
})


const route = useRoute()
const current_page = ref(route.query.page ? parseInt(route.query.page as string) : 1)


const { data, status, execute, clear } = await useFetch(search_url, {
  query: {
    query: search_field,
    page: current_page,
  },
  immediate: false,
  watch: [current_page, search_field],

})
</script>

<template>
<div>
<div class="w-full h-full absolute z-0 blur-sm"/>
<div class="top-0 left-0 w-full h-80 absolute dissolve"  style="background: linear-gradient(33deg, rgba(217,114,118,1) 0%, rgba(73,199,44,1) 39%, rgba(26,228,207,1) 80%, rgba(36,189,240,1) 100%);"/>
  <div class="container translate-y-14">
    <TitlePage>Search <Icon name="fa6-solid:magnifying-glass" class="text-white" /></TitlePage>
    <div class="w-full -translate-y-8 flex flex-row gap-1 relative">
      <input
        v-model="search_field"
        class="w-full p-3 bg-gray-200/60 dark:bg-slate-500/60 backdrop-blur-sm hover:bg-gray-300 dark:hover:bg-slate-600 focus:bg-gray-300 dark:focus:bg-slate-700 transition-all relative rounded-l-[18px] rounded-r-[4px]"
        type="text"
        placeholder="Search for Miis or Artisans by Name, ID or Initials..."
        :autofocus="true"
        @keyup.enter="execute(), current_page = 1"
      >
      <div class="flex items-center bg-gray-200/60 dark:bg-slate-500/60 backdrop-blur-sm hover:bg-gray-300 dark:hover:bg-slate-600 transition-all rounded-[4px] p-1">
        <div
          class="mr-1 h-full flex items-center justify-center cursor-pointer dark:hover:bg-slate-500 rounded-[4px]"
          :class="{ 'bg-green-500 dark:hover:bg-green-500': search_type === 'miis' }"
          @click="search_type = 'miis'"
        >
          <div class="flex items-center gap-2 px-4 py-2 text-white">
            <Icon name="fa6-solid:user" :class="{ 'text-gray-400' : search_type !== 'miis', 'text-white' : search_type === 'miis' }" />
            <label
              class="select-none mobile-hide"
              :class="{
                'text-gray-400': search_type !== 'miis',
                'text-white': search_type === 'miis'
              }"
              >Miis</label
            >
          </div>
          <input
            v-model="search_type"
            type="radio"
            name="search_type"
            value="miis"
            class="hidden"
          >
        </div>
        <div
          class="cursor-pointer h-full flex items-center justify-center dark:hover:bg-slate-500 rounded-[4px]"
          :class="{ 'bg-blue-500 dark:hover:bg-blue-500': search_type === 'artisans' }"
          @click="search_type = 'artisans', clear()"
        >
          <div class="flex items-center gap-2 px-4 py-2 text-white">
            <Icon name="fa6-solid:paintbrush" :class="{ 'text-gray-400' : search_type !== 'artisans', 'text-white' : search_type === 'artisans' }" />
            <label
              class="select-none mobile-hide"
              :class="{
                'text-gray-400': search_type !== 'artisans',
                'text-white': search_type === 'artisans'
              }"
              >Artisans</label
            >
          </div>
          <input
            v-model="search_type"
            type="radio"
            name="search_type"
            value="artisans"
            class="hidden"
          >
        </div>
    </div>
      <button
        class="p-3 pl-4 pr-4 bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-700 transition-all rounded-l-[4px] rounded-r-[18px]"
        @click="execute, current_page = 1"
      >
        <Icon name="fa6-solid:magnifying-glass" />
      </button>
    </div>

    <div v-if="data">
  <div>
    <div v-if="data.length > 0 && search_type === 'miis'">
    <ul v-if="status !== 'pending'" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-10 gap-3">
      <MiiCardNew v-for="result in data" :key="result.entry_id" v-bind="result" />
    </ul>
    <LoadingAnimation v-if="status === 'pending'" />
      <PageNavigation
        :current_page="current_page"
        :total_pages="page_total"
        class="mt-10"
        @update:current_page="(value) => { current_page = value; $router.push({ query: { page: value } }) }"
      />
  </div>
    <div v-else-if="search_results.length > 0 && search_type === 'artisans'">
    <ul v-if="status !== 'pending'" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-10 gap-3">
      <ArtisanCard v-for="result in search_results" :key="result.entry_id" v-bind="result" />
    </ul>
    <LoadingAnimation v-if="status === 'pending'" />
      <PageNavigation
        :current_page="current_page"
        :total_pages="page_total"
        class="mt-10"
        @update:current_page="(value) => { current_page = value; $router.push({ query: { page: value } }) }"
      />
  </div>
    <div v-else class="text-red-500">
        <div class="p-20 w-full h-30 rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative">
        <div class="flex flex-col items-center gap-3 text-gray-500 dark:text-slate-400">
            <Icon name="fa6-solid:bomb" class="text-6xl" />
        <h2 class="sm:w-96 w-full text-center relative">Nothing was found... Did you type it in correctly?</h2>
    </div>
    </div>
    </div>
  </div>
    </div>
    <div v-else-if="search_type == 'miis'" class="p-20 w-full rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative">
        <div class="flex flex-col items-center gap-3 text-gray-500 dark:text-slate-400">
            <div class="flex flex-row gap-3 items-center"><Icon name="fa6-solid:magnifying-glass" class="text-6xl" /><b class="p-3 pl-6 pr-6 rounded-lg text-white bg-green-500">Mii Search Mode</b></div>
        <h2 class="sm:w-96 w-full text-center relative">To begin searching, type your query in the box and press the enter key or <Icon name="fa6-solid:magnifying-glass" /> Search icon. You can search for a Mii by using its Name, CMOC Contest Code, or Initals.</h2>
    </div>
    </div>
    <div v-else-if="search_type == 'artisans'" class="p-20 w-full rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative">
        <div class="flex flex-col items-center gap-3 text-gray-500 dark:text-slate-400">
          <div class="flex flex-row gap-3 items-center"><Icon name="fa6-solid:magnifying-glass" class="text-6xl" /><b class="p-3 pl-6 pr-6 rounded-lg text-white bg-blue-500">Artisan Search Mode</b></div>
        <h2 class="sm:w-96 w-full text-center relative">To begin searching, type your query in the box and press the enter key or <Icon name="fa6-solid:magnifying-glass" /> Search icon. You can search for an Artisan by using its Name, or Wii Number.</h2>
    </div>
    </div>
  </div>
</div>
</template>
