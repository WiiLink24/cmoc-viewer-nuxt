<script setup lang="ts">
useHead({
  title: 'Previous Contests | CMOC Viewing Tool',
  meta: [
    { name: 'description', content: 'View all running and past contests of the service, as well as information associated to them!'},
    { property: 'og:image', content: '/img/cmocseobg.png' },
  ],
})

const { data, error } = await useAsyncData('contests-previous', async () => {
    return $fetch('/api/contests')
})

const judging_contests = data.value?.filter((contest) => contest.status === 'judging')
const results_contests = data.value?.filter((contest) => contest.status === 'results')
const closed_contests = data.value?.filter((contest) => contest.status === 'closed')
</script>

<template>
    <div class="space-y-7">
        <section v-if="judging_contests && judging_contests.length > 0" class="space-y-3">
            <h2>Contests being judged</h2>
            <ul class="flex flex-col gap-3 group">
                <li v-for="contest in judging_contests" :key="contest.contestId" class="group-hover:opacity-50 group-hover:duration-200 group-hover:transition-opacity hover:opacity-100">
                <NuxtLink :href="{ name: 'contests-id', params: { id: contest.contestId }}">
                    <ContestCard  v-bind="contest" class="w-full" />
                </NuxtLink>
            </li>
            </ul>
        </section>
        <section v-if="results_contests && results_contests.length > 0" class="space-y-3">
            <h2>Contests displaying results</h2>
            <ul class="flex flex-col gap-3 group">
                <li v-for="contest in results_contests" :key="contest.contestId" class="group-hover:opacity-50 group-hover:duration-200 group-hover:transition-opacity hover:opacity-100">
                <NuxtLink :href="{ name: 'contests-id', params: { id: contest.contestId }}">
                    <ContestCard v-bind="contest" class="w-full" />
                </NuxtLink>
            </li>
            </ul>
        </section>
        <section v-if="closed_contests && closed_contests.length > 0" class="space-y-3">
            <h2>Closed contests</h2>
            <ul class="flex flex-col gap-3 group">
                <li v-for="contest in closed_contests" :key="contest.contestId" class="group-hover:opacity-50 group-hover:duration-200 group-hover:transition-opacity hover:opacity-100">
                <NuxtLink :href="{ name: 'contests-id', params: { id: contest.contestId }}">
                    <ContestCard v-bind="contest" class="w-full" />
                </NuxtLink>
            </li>
            </ul>
        </section>
        <div v-if="error" class="text-red-500">
        <div class="p-20 w-full h-30 rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative">
        <div class="flex flex-col items-center gap-3 text-gray-500 dark:text-slate-400">
            <i class="fa-solid fa-bomb text-6xl"/>
        <h2 class="w-96 text-center relative">A backend error has occurred. Please try again later...</h2>
    </div>
    </div>
    </div>
    </div>

</template>