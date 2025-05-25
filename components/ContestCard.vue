<script setup lang="ts">
const url = useRuntimeConfig().public.CMOC_SERVER

interface ContestProps {
  contestId: number,
  englishName: string | null,
  status:  'open' | 'judging' | 'results' | 'closed' | string | null,
  openTime: string | null,
  closeTime: string | null,
  hasSouvenir: boolean | null,
  hasThumbnail: boolean | null,
  hasSpecialAward: boolean | null,
}

const props = defineProps<ContestProps>()
const hover = ref(false)
const rotationDegree = ref(0)

watch(hover, (newValue) => {
  if (newValue === true) {
    rotationDegree.value = Math.floor(Math.random() * 6) - 3;
    // Assign a value to rotationDegree here
  } else if (newValue === false) {
    rotationDegree.value = 0;
  }
})

const currentDate = new Date()

const daysRemaining = computed(() => {
  const closeDate = new Date(props.closeTime!)
  const differenceInTime = closeDate.getTime() - currentDate.getTime()
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24))
  return differenceInDays
})

const isNew = computed(() => {
  const openDate = new Date(props.openTime!);
  const differenceInTime = openDate.getTime() - currentDate.getTime()
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays < 5 && differenceInDays > 0;
});
</script>

<template>
  <div :style="{ rotate: `${rotationDegree}deg` }" class="list-none normal-case rounded-3xl w-100 h-50 shadow-[0px_0px_60px_#d3d68c60] hover:no-underline hover:shadow-lg hover:scale-105 transition-all" @mouseenter="hover = true" @mouseleave="hover = false">
      <div
        class="p-2 rounded-3xl border-[5px] border-white bg-[rgb(76,130,163)] shadow-2xl z-10 relative"
      >
        <div class="flex flex-row items-center justify-between">
            <p class="ml-1 text-white text-lg">
            <span>{{ daysRemaining < 0 ? 'The contest has ended!' : daysRemaining === 1 ? `${daysRemaining} day remaining` : `${daysRemaining} days remaining` }}</span>
            </p>
          <div class="flex flex-row items-center">
            <p class="first-letter:uppercase">
              {{ status }}
            </p>
              <span class="opacity-60">
                ({{ contestId }})
              </span>
              <div v-if="isNew" class="ml-3 box sb4">New!</div>
              <div v-if="daysRemaining <= 2 && daysRemaining >= 0" class="ml-3 box-red sb4-red">Closing soon!</div>
          </div>
        </div>
        <div class="mt-2 bg-white p-1 rounded-xl flex flex-row gap-5 items-center justify-between">
          <img
            :src="`${url}/assets/contest/${contestId}/thumbnail.jpg`"
            alt="Thumbnail Preview"
            class="p-1 w-32 h-32 rounded-xl"
          >
          <h2 id="contestName" class="mr-6 col-start-1 col-span-full text-2xl" style="color:black !important;">
            {{ englishName }} <b v-if="hasSouvenir"> | <Icon name="fa6-solid:gift"/></b>
          </h2>
        </div>
      </div>
      <img
        id="souvenirPreview2"
        class="w-80 hidden rounded-3xl shadow-2xl z-0 absolute !right-0 -translate-x-full -translate-y-[70%] rotate-3"
        alt="Thumbnail Preview"
      >
  </div>
</template>