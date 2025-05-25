<!-- eslint-disable vue/prop-name-casing -->
<script setup lang="ts">
const props = defineProps<{
  total_pages: number,
  current_page: number
}>()

const emit = defineEmits(['update:current_page'])

const { y } = useWindowScroll()


const incrementPage = () => {
  if (props.current_page < props.total_pages) {
    y.value = 0
    emit('update:current_page', props.current_page + 1)
  }
}

const decrementPage = () => {
  if (props.current_page > 1) {
    y.value = 0
    emit('update:current_page', props.current_page - 1)
  }
}

const emitCurrentPage = () => {
  //fetch input value
  const input = document.getElementById('pageinput') as HTMLInputElement | null
  emit('update:current_page', parseInt((input?.value || '1')))
}
</script>

<template>
  <div class="inline-flex items-center gap-5 w-full justify-between">
    <p class="opacity-60 text-black dark:text-white">
      Showing page <b id="curr">{{ current_page }}</b> of <b id="last">{{ total_pages }}</b>
    </p>
    <div v-if="props.total_pages > 1" class="flex flex-row items-center gap-1">
      <button
        v-if="props.current_page > 1"
        id="prev"
        class="p-3 pl-4 pr-4 border-2 border-gray-300 bg-gray-300 dark:border-slate-700 hover:border-gray-200 dark:hover:border-slate-600 dark:bg-slate-700 dark:hover:bg-slate-600 transition-all rounded-l-[18px] rounded-r-[6px] text-black dark:text-white"
        @click="decrementPage"
      >
        <Icon name="fa6-solid:chevron-left" class="text-md" />
      </button>
      <input
        id="pageinput"
        type="number"
        :class="{
          'rounded-l-lg': props.current_page > 1 && props.current_page < props.total_pages,
          'rounded-r-lg': props.current_page < props.total_pages,
          'rounded-lg': props.current_page === 1 || props.current_page === props.total_pages,
          'rounded-tl-lg': props.current_page > 1,
          'text-black dark:text-white rounded-tr-lg': props.current_page < props.total_pages
        }"
        :style="{
          'border-top-left-radius': props.current_page > 1 ? '6px' : '18px',
          'border-bottom-left-radius': props.current_page > 1 ? '6px' : '18px',
          'border-top-right-radius': props.current_page < props.total_pages ? '6px' : '18px',
          'border-bottom-right-radius': props.current_page < props.total_pages ? '6px' : '18px'
        }"
        :value="props.current_page"
        class="p-3 bg-white/0 border-2 border-gray-300 hover:border-gray-200 dark:hover:border-slate-600 dark:border-slate-700 rounded-lg w-[70px] text-center transition-all"
        @keyup.enter="emitCurrentPage"
      >
      <button
        v-if="props.current_page < props.total_pages"
        id="next"
        class="p-3 pl-4 pr-4 border-2 border-gray-300 bg-gray-300 dark:border-slate-700 hover:border-gray-200 dark:hover:border-slate-600 dark:bg-slate-700 dark:hover:bg-slate-600 transition-all rounded-l-[6px] rounded-r-[18px] text-black dark:text-white"
        @click="incrementPage"
      >
        <Icon name="fa6-solid:chevron-right" class="text-md" />
      </button>
    </div>
  </div>
</template>

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
