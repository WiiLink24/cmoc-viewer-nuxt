<script setup lang="ts">
import ChangesTitle from '~/components/home/changes/ChangesTitle.vue';
import ChangesDescription from '~/components/home/changes/ChangeDescription.vue';

const tools = [
  { id: 'miichar', name: 'Mii Characters', link: 'https://www.miicharacters.com/', description: 'Mii Characters is a website where you can find all kinds of Mii Characters, from popular characters to original creations.' },
  { id: 'miilib', name: 'Mii Library', link: 'https://www.miilibrary.com/', description: 'Mii Library is a website where you can find all kinds of Mii Characters, from popular characters to original creations.' },
  { id: 'miiport', name: 'MiiPort', link: 'https://github.com/Genwald/MiiPort/releases/tag/0.1.1', description: 'MiiPort is a tool that allows you to transfer Mii Characters between your Wii and your computer. You can use it to back up your Mii Characters, share them with friends, or even edit them on your computer!'},
  { id: 'miirender', name: 'Mii Renderer', link: 'https://pf2m.com/tools/mii/', description: 'Mii Renderer is a tool that allows you to render Mii Characters in high resolution. You can use it to create high-quality images of your Mii Characters for use in videos, artwork, or other projects!' },
  { id: 'miiedit', name: 'Mii Avatar Editor', link: 'https://www.wiilink24.com/extras/mii', description: 'Mii Avatar Editor is a tool that allows you to create custom Mii Characters. You can choose from a wide range of features to create a Mii that looks just like you, or create a completely original character!' },
]

const hoveredTool = ref<string>('')

const { data: newMiis } = await useAsyncData('newMiis', () =>
  $fetch('/api/plaza/popular', {
    method: 'GET',
    params: {
      page: 1
    },
  })
);
</script>

<template>
  <div>
    <div
      class="lg:w-[calc(100%-50px)] lg:h-[650px] lg:rounded-[80px] lg:rounded-t-2xl border-2 border-gray-200 dark:border-slate-600 cmoc-bg z-10 overflow-hidden left-1/2 -translate-x-1/2 translate-y-12.5 relative"
    >
      <div class="container lg:py-20 py-10 lg:absolute relative">
        <section class="lg:h-[500px] flex flex-col justify-between grow-0 lg:w-1/2 space-y-2">
          <div>
            <h1 class="text-5xl font-bold">Welcome to the new CMOC Viewing Tool</h1>
            <h2 class="mt-2 text-3xl mb-7">
              Get updated info on all running contests, as well as download your favorite Mii
              Characters from our service.
            </h2>
            <a
              class="w-full sm:w-auto justify-center inline-flex flex-row gap-1 items-center bg-[#2bca38] hover:bg-green-600 hover:scale-105 hover:shadow-xl hover:shadow-green-400/10 hover:no-underline transition-all px-8 py-3 rounded-xl text-white border-2 border-gray-200/10"
              href="https://www.wiilink24.com/"
              ><img
                src="/img/favicon.png"
                alt="WiiLink Logo"
                style="filter: brightness(10000); height: 20px !important"
              >
              Install WiiLink</a
            >
          </div>
          <div class="text-xl opacity-80 hidden lg:block">
            <Icon name="fa6-solid:hand" /> Here are all available contests, go ahead and play around
            with them!
          </div>
        </section>
      </div>
      </div>
      <ul class="mb-10 flex gap-1 items-center justify-center translate-y-[67px] z-0 mobile-hide-flex relative group">
        <li class="transition-opacity group-hover:opacity-50 hover:opacity-100">
          <NuxtLink to="/" class="header-link-index hover:pb-7.5 rounded-bl-2xl">
        <Icon name="fa6-solid:house" /> Home
          </NuxtLink>
        </li>
        <li class="transition-opacity group-hover:opacity-50 hover:opacity-100">
          <NuxtLink to="/plaza/popular" class="header-link-index hover:pb-7.5">
        <Icon name="fa6-solid:fire" /> Popular
          </NuxtLink>
        </li>
        <li class="transition-opacity group-hover:opacity-50 hover:opacity-100">
          <NuxtLink to="/plaza/top" class="header-link-index hover:pb-7.5">
        <Icon name="fa6-solid:ranking-star" /> The Top 50
          </NuxtLink>
        </li>
        <li class="transition-opacity group-hover:opacity-50 hover:opacity-100">
          <NuxtLink to="/artisans" class="header-link-index hover:pb-7.5">
        <Icon name="fa6-solid:star" /> Artisans
          </NuxtLink>
        </li>
        <li class="transition-opacity group-hover:opacity-50 hover:opacity-100">
          <NuxtLink to="/contests/active" class="header-link-index hover:pb-7.5">
        <Icon name="fa6-solid:trophy" /> Contests
          </NuxtLink>
        </li>
        <li class="transition-opacity group-hover:opacity-50 hover:opacity-100">
          <NuxtLink to="/search" class="header-link-index hover:pb-7.5 rounded-br-2xl">
        <Icon name="fa6-solid:magnifying-glass" class="mr-2" /> Search
          </NuxtLink>
        </li>
      </ul>
      <div class="container translate-y-22.5">
        <h1 class="font-bold text-4xl">Newest Miis</h1>
        <div class="mt-3 mb-8 scroll-container">
          <ul class="mt-3 inline-flex flex-row gap-3">
            <MiiCardNew v-for="mii in newMiis?.data" :key="mii.entryId" class="w-75 relative" v-bind="mii" />
            <MiiCardNew v-for="mii in newMiis?.data" :key="`duplicate-${mii.entryId}`" class="w-75 relative" v-bind="mii" />
            
          </ul>
        </div>
      </div>
      <div class="container translate-y-22.5">
          <div class="mt-6 mb-10">
            <h1 class="font-bold text-4xl">What's new on the Check Mii Out Channel?</h1>
            <div class="p-6 mt-3 border-4 border-slate-600 border-dashed rounded-3xl block relative">
              <Icon name="fa6-solid:certificate" class="-right-10 -top-10 text-9xl animate-spin text-yellow-300/60 absolute"/>
              <div>
                <ChangesTitle><Icon name="fa6-solid:hammer" /> Improved infrastructure</ChangesTitle>
                <ChangesDescription>We have improved our infrastructure to make the service faster and more reliable. It is now much easier to post new contests and manage data, so expect more frequent contests!</ChangesDescription>
              </div>
              <div>
                <ChangesTitle><Icon name="fa6-solid:bug" /> Bug fixes</ChangesTitle>
                <ChangesDescription>We have fixed a lot of bugs, meaning you will experience a smoother experience in the Channel.</ChangesDescription>
              </div>
              <div>
                <ChangesTitle><Icon name="fa6-solid:globe" /> New website</ChangesTitle>
                <ChangesDescription>We have updated our website to make it more user-friendly and easier to navigate. We have also added new features to make it easier to find the content you are looking for.</ChangesDescription>
              </div>
              <div>
                <ChangesTitle><Icon name="fa6-solid:code" /> New API</ChangesTitle>
                <ChangesDescription>We have created a new API that allows developers to access the data on the Channel. This will make it easier to create new tools and services that use the data from the Channel.</ChangesDescription>
              </div>
              <div>
                <ChangesTitle><Icon name="fa6-solid:gavel" /> Easier moderation</ChangesTitle>
                <ChangesDescription>We have added new moderation tools to make it easier to manage the content on the Channel. This will help us keep the Channel safe and fun for everyone.</ChangesDescription>
              </div>
              <hr class="mt-6 mb-6">
              <div>
                <h1 class="opacity-60">
                  <Icon name="fa6-regular:circle-dot"/>
                  ...and much more!
                </h1>
              </div>
            </div>
            
          </div>
      </div>
      <div class="container translate-y-20">
        <div class="flex flex-row items-center justify-between gap-3">
          <h1 class="font-bold text-4xl">Tools</h1>
          <h2 class="opacity-60">Here are some tools we really like!</h2>
        </div>
        <!-- Ajoutez la classe peer au premier bouton pour que son état de survol soit accessible aux éléments frères -->
        <div class="mt-3 mb-20 lg:mb-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            <NuxtLink
            v-for="(tool, index) in tools"
            :key="tool.id"
            external
            :href="tool.link"
            :class="index === 0 ? 'btn lg:rounded-l-xl lg:rounded-r-md rounded-xl text-center peer'
              : index === tools.length - 1 ? 'btn lg:rounded-l-md lg:rounded-r-xl rounded-xl text-center'
              : 'btn lg:rounded-md rounded-xl text-center'"
            @mouseover="hoveredTool = tool.id"
            >
            {{ tool.name }}
            </NuxtLink>
        </div>
        <div class="mb-10 dark:text-white hidden lg:block">
          <div>
            <p
              v-if="!hoveredTool"
              class="mt-6 p-3 border-2 border-slate-500/30 rounded-t-md rounded-b-lg flex items-center justify-center gap-3"
            >
              <Icon name="fa6-solid:question-circle" />
              Hover over a tool to view its description.
            </p>
            <template v-for="tool in tools" :key="tool.id">
              <p
                v-if="hoveredTool === tool.id"
                class="mt-6 p-3 border-2 border-slate-500/30 rounded-t-md rounded-b-lg"
              >
                <Icon name="fa6-solid:info-circle" />
                {{ tool.description }}
              </p>
            </template>
          </div>
        </div>
      </div>
  </div>
</template>