<script setup lang="ts">
useHead({
  title: 'Active Contests | CMOC Viewing Tool',
  meta: [
    { name: 'description', content: 'View all running and past contests of the service, as well as information associated to them!'},
    { property: 'og:image', content: '/img/cmocseobg.png' },
  ],
})

const { data } = await useAsyncData('contests-open', async () => {
    return $fetch('/api/contests')
})

const contests = data.value?.filter((contest) => contest.status === 'open')
</script>

<template>
    <div>
        <ul v-if="contests" class="flex flex-col gap-3">
            <div v-for="contest in contests" :key="contest.contestId">
            <RouterLink :to="`/contests/${contest.contestId}`">
                <ContestCard v-bind="contest" />
            </RouterLink>
            </div>
        </ul>
        <div v-else class="text-red-500">
        <div class="p-20 w-full h-30 rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative">
        <div class="flex flex-col items-center gap-3 text-gray-500 dark:text-slate-400">
            <Icon name="fa6-solid:bomb" class="text-6xl" /> 
        <h2 class="w-96 text-center relative">There are no running contests at the moment, please check back later...</h2>
    </div>
    </div>
</div>
    </div>

</template>