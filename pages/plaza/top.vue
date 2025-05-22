<script setup lang="ts">


useHead({
  title: 'Top 50 | CMOC Viewing Tool',
  meta: [
    { name: 'description', content: 'Top 50 Miis currently in the service!'},
    { property: 'og:image', content: '/img/cmocseobg.png' },
  ],
})

const { data, status } = await useAsyncData('top', () => {
    return $fetch('/api/plaza/top')
})
</script>

<template>
    <div>
        <img
    src="/img/cmoc-bg-orange.png"
    class="w-full absolute z-0 blur-sm dissolve"
    alt="CMOC Background Image"
  >
<div class="container translate-y-10">
    <TitlePage>Top 50</TitlePage>
    <p class="-translate-y-20 text-right opacity-45 text-black dark:text-white">
      These are the Top 50 Miis, sorted by number of likes!
    </p>
    <LoadingAnimation v-if="status === 'pending'" />
    <template v-if="data">
      <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-10 gap-3 -translate-y-14">
        <MiiCardNew
          v-for="(item, index) in data"
          :key="item.entryId"
          v-bind="item"
          :ranking="index + 1"
        />
        
      </ul>
    </template>
    <div v-else class="p-20 w-full h-30 rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative">
      <div class="flex flex-col items-center gap-3 text-gray-500 dark:text-slate-400">
          <Icon name="fa6-solid:bomb" class="text-6xl" />
          <h2 class="w-96 text-center relative">Could not establish a connection to the Plaza database, please try again later...</h2>
      </div>
    </div>
  </div>
  </div>
</template>