<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()
const translateY = computed(() => Math.min(100, y.value / 2))
const opacity = computed(() => Math.max(0, 0.5 - y.value / 100))

</script>

<template>
  <h1
    class="text-9xl font-normal outline-text uppercase whitespace-nowrap text-ellipsis opacity-50 z-0 relative flex items-center justify-between overflow-hidden invert dark:invert-0"
    :style="{ transform: `translateY(${translateY}px)`, opacity: opacity }"
  >
    <slot />
  </h1>
</template>
