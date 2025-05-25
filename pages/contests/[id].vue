<script setup lang="ts">
import type { Contest, ContestMii } from '~/drizzle/schema'

const route = useRoute('/contests/:id')
const router = useRouter()
const contestIdAsync = computed(() => `contest-${route.params.id}`)

const { data, status } = useAsyncData<{ contest: Contest, entries: { total_pages: number, data: ContestMii[] }}>(contestIdAsync.value, () => {
    return $fetch('/api/contests/' + route.params.id)
})

useHead({
  title: 'Contest View | CMOC Viewing Tool',
  meta: [
    { name: 'description', content: 'View all running and past contests of the service, as well as information associated to them!'},
    { property: 'og:image', content: '/img/cmocseobg.png' },
  ],
})

const current_page = ref(route.query.page ? parseInt(route.query.page as string) : 1)
</script>

<template>
  <div>
      <div v-if="data">
        <div class="flex flex-row gap-3 items-center justify-between">
            <ReturnBtn />
            <h1 class="text-xl font-bold">Contest Results for {{ data.contest?.englishName }}</h1>
        </div>
        <div class="mt-3">
          <ContestCard v-bind="data.contest" class="w-full" />
          <hr class="mt-6 mb-6 border-t-black dark:border-t-white">
          <div v-if="data.entries && data.entries.data.length > 0 && data.contest.status === 'results'">
          <ul v-if="status !== 'pending'" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-10 gap-3">
            <MiiCardNew
              v-for="(entry, index) in data.entries.data"
              :key="entry.artisanId!"
              v-bind="entry"
              :contest_id="data.contest?.contestId"
              :ranking="index + 1"
            />
          </ul>
          <PageNavigation
            :current_page="current_page"
            :total_pages="data.entries.total_pages"
            class="mt-10"
            @update:current_page="(value) => { current_page = value; router.push({ query: { page: value } }) }"
            />
            <LoadingAnimation v-if="status === 'pending'" />
        </div>
          <div v-if="data.contest.status !== 'results'" class="text-red-500">
            <div class="p-20 w-full h-30 rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative">
            <div class="flex flex-col items-center gap-3 text-gray-500 dark:text-slate-400">
                <Icon name="fa6-solid:bomb" class="text-6xl" />
            <h2 class="w-96 text-center relative">Coming soon!</h2>
        </div>
        </div>
    </div>
        </div>
      </div>
      <div v-if="status === 'error'" class="p-20 w-full h-30 rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative">
            <div class="flex flex-col items-center gap-3 text-gray-500 dark:text-slate-400">
              <div class="flex flex-row gap-3 items-center"><Icon name="fa6-solid:bomb" class="text-6xl" /></div>
            <h2 class="w-96 text-center relative">The Contest you were looking for could not be found...</h2>
        </div>
        </div>
  </div>
</template>
