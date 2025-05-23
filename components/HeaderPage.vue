<script setup lang="ts">
import {
  useWindowScroll,
  useBreakpoints,
  breakpointsTailwind,
  useScrollLock
} from "@vueuse/core";

const { y } = useWindowScroll();
const isScrolled = computed(() => y.value > 1);
const breakpoints = useBreakpoints(breakpointsTailwind);

const isMenuOpen = ref(false);
const isLocked = useScrollLock(document?.body, false);
const isMobile = ref(breakpoints.smaller("lg"));
</script>

<template>
  <header
    :class="{
      'backdrop-blur-md shadow-md bg-gray-400/50 dark:bg-slate-600/50 transition-all':
        isScrolled,
    }"
    class="w-full flex items-center justify-between dark:text-white md:px-8 lg:px-8 px-4 py-4 z-10 fixed"
  >
    <img
      src="/img/viewingTool-logo.png"
      alt="WiiLink Mii Contest Channel Viewer Logo"
      class="dark:invert h-[50px]! relative z-50"
    >
    <nav class="flex gap-10 items-center">
      <ul
        class="fixed top-0 left-0 w-screen h-screen gap-2 items-center px-4! pt-22! lg:p-0! flex-col lg:flex-row bg-gray-200 dark:bg-slate-700 lg:w-auto lg:h-auto lg:static lg:bg-transparent lg:dark:bg-transparent"
        :class="{ 'hidden lg:flex': !isMenuOpen }"
      >
        <li id="search-hook" class="w-full pb-3 border-b-2! border-b-black dark:border-b-white lg:hidden" @click="(isMenuOpen = false, isLocked = false)" />
        <li class="w-full lg:w-auto" @click="(isMenuOpen = false, isLocked = false)">
          <NuxtLink
            to="/"
            class="header-link w-full block lg:inline lg:w-auto"
            active-class="bg-gray-300/80 dark:bg-white/20 lg:scale-[0.97] transition-all"
          >
            <Icon name="fa6-solid:house" /> Home
          </NuxtLink>
        </li>
        <li class="w-full lg:w-auto" @click="(isMenuOpen = false, isLocked = false)">
          <NuxtLink
            to="/plaza/popular"
            class="header-link w-full block lg:inline lg:w-auto"
            active-class="bg-gray-300/80 dark:bg-white/20 lg:scale-[0.97] transition-all"
          >
            <Icon name="fa6-solid:fire" /> Popular
          </NuxtLink>
        </li>
        <li class="w-full lg:w-auto" @click="(isMenuOpen = false, isLocked = false)">
          <NuxtLink
            to="/plaza/top"
            class="header-link w-full block lg:inline lg:w-auto"
            active-class="bg-gray-300/80 dark:bg-white/20 lg:scale-[0.97] transition-all"
          >
            <Icon name="fa6-solid:ranking-star" /> The Top 50
          </NuxtLink>
        </li>
        <li class="w-full lg:w-auto" @click="(isMenuOpen = false, isLocked = false)">
          <NuxtLink
            to="/artisans"
            class="header-link w-full block lg:inline lg:w-auto"
            active-class="bg-gray-300/80 dark:bg-white/20 lg:scale-[0.97] transition-all"
          >
            <Icon name="fa6-solid:star" /> Artisans
          </NuxtLink>
        </li>
        <li class="w-full lg:w-auto border-r-2 border-gray-200/30 pr-4" @click="(isMenuOpen = false, isLocked = false)">
          <NuxtLink
            to="/contests/active"
            class="header-link w-full block lg:inline lg:w-auto"
            active-class="bg-gray-300/80 dark:bg-white/20 lg:scale-[0.97] transition-all"
            @click="(isMenuOpen = false, isLocked = false)"
          >
            <Icon name="fa6-solid:trophy" /> Contests
          </NuxtLink>
        </li>
        <li class="hidden lg:block pl-4">
          <teleport to="#search-hook" :disabled="!isMobile">
            <NuxtLink
              to="/search"
              class="bg-gray-400/30 dark:bg-gray-200/30 px-4 py-2 lg:w-80 flex justify-between items-center rounded-lg hover:no-underline hover:shadow-xl hover:scale-105 shadow-slate-400 transition-all"
            >
              <Icon name="fa6-solid:magnifying-glass" />Search...
            </NuxtLink>
          </teleport>
        </li>
      </ul>
      <button class="block lg:hidden" @click="(isMenuOpen = !isMenuOpen, isLocked = !isLocked)">
        <Icon name="fa6-solid:bars" />
      </button>
    </nav>
  </header>
</template>
