<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
  error: Object as () => NuxtError,
})

useHead({
  title: () => `${props.error?.statusCode} | CMOC Viewing Tool`,
  meta: [
    { name: 'description', content: 'The content you were looking for could not be found...' },
    { property: 'og:image', content: '/img/cmocseobg.png' }
  ]
})
</script>

<template>
  <div
    class="translate-y-20 pt-48 pb-48 container rounded-2xl flex flex-col items-center"
  >
    <ReturnBtn class="top-5 left-5 absolute" />
    <h1
      id="title"
      class="text-9xl outline-text uppercase whitespace-nowrap text-ellipsis z-5 relative flex items-center justify-between overflow-hidden"
    >
      {{ props.error?.statusCode }}
    </h1>
    <p class="text-3xl font-bold">{{ props.error?.statusMessage }}</p>
  </div>
</template>
