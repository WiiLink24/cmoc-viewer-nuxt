<template>
<button
  class="inline-flex items-center gap-3 px-3 py-3 hover:no-underline hover:bg-gray-300 hover:dark:bg-slate-600 transition-all rounded-lg"
  aria-label="Go back to the previous page"
  @click="$router.go(-1)"
>
  <Icon name="fa6-solid:chevron-left" />
  Go back
</button>
</template>