<script setup lang="ts">
import { countries } from '~/types/countries'
import { skills } from '~/types/skills'
import twemoji from 'twemoji';

interface MiiProps {
    entryId: number | null
    miiData: string | null
    nickname?: string | null
    countryId?: number | null
    skill?: number | null
    permLikes?: number | null
    initials?: string | null
    gender?: number | null
    ranking?: number | null
    artisan?: {
        artisanId: number
        name: string | null
        isMaster: boolean
    } | null,
    likes?: number | null
    contestId?: number | null
}

const props = defineProps<MiiProps>()

const country_flag = computed(() => (countries[props.countryId!].flag))
const skillName = computed(() => { return props.skill !== undefined ? (skills as Record<number, { name: string }>)[props.skill!].name : ''})

const target = ref<HTMLElement | null>(null)
const { handleMouseMove, resetTransform } = useCardHover(target)

const mouseEffect = reactive({
    mouseOver: false,
    mouseClick: false,
})

const countryFlagHTML = computed(() => {
    return twemoji.parse(country_flag.value, { base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/' })
})

const encodedEntryId = encodeEntryId(props.entryId!)

const rankingBg = computed(() => {
    switch (props.ranking) {
        case 1:
            return 'bg-gold'
        case 2:
            return 'bg-silver'
        case 3:
            return 'bg-bronze'
        default:
            return ''
    }
})

const mii_img = await renderMii(props.miiData!)

const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
}
</script>

<template>
    <li ref="target" class="p-3 rounded-xl border flex flex-col justify-between relative z-20 bg-gray-100 dark:border-slate-600/60 dark:bg-slate-700/60 dark:text-white hover:shadow-xl transition-all overflow-hidden backdrop-blur-md bg-opacity-50 has-[.miiImg:hover]:bg-[#36d14160] has-[.miiImg:hover]:border has-[.miiImg:hover]:border-green-700" :class="rankingBg" @mousemove="handleMouseMove" @mouseleave="resetTransform">
        <span v-if="ranking" class="-top-4 text-7xl font-bold dark:text-white opacity-5 z-0 absolute select-none self-start -ml-2" :class="{ 'mb-[7.5rem]' : !props.nickname }">{{ props.ranking }}</span>
        <div class="z-10 flex flex-col w-full items-center hover:z-30">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span class="self-end text-2xl" v-html="countryFlagHTML" />
            <div class="group">
                <button class="top-2 left-2 rounded tooltip shadow-lg p-2 px-3 bg-green-600 hover:bg-green-700 text-white cursor-pointer absolute opacity-0 transition-opacity group-hover:opacity-100" @click="props.nickname ? downloadMii(props.nickname, encodedEntryId, props.miiData!) : downloadMii([props.contestId!, props.ranking!], encodedEntryId, props.miiData!)">
                    <Icon name="fa6-solid:download" />
                </button>
                <img :src="mii_img" :alt="`${props.nickname}'s Mii`" class="w-28 bottom-3 cursor-pointer relative miiImg" @click="props.nickname ? downloadMii(props.nickname, encodedEntryId, props.miiData!) : downloadMii([props.contestId!, props.ranking!], encodedEntryId, props.miiData!)">
            </div>
        <h1 class="text-3xl relative bottom-3 text-center flex flex-col gap-1">
            {{ props.nickname }}
            <p class="text-sm opacity-60">
                {{ encodedEntryId }}
                <Icon
                    :name="mouseEffect.mouseClick ? 'fa6-solid:check' : 'fa6-regular:copy'" class="cursor-pointer transition-all"
                    @mouseenter="mouseEffect.mouseOver = true"
                    @mouseleave="mouseEffect.mouseOver = false"
                    @click="mouseEffect.mouseClick = true; copyToClipboard(encodedEntryId); useTimeoutFn(() => { mouseEffect.mouseClick = false }, 2000)" />
            </p>
        </h1>
        </div>
        <span class="w-full text-2xl flex items-end justify-between gap-1 flex-nowrap z-10">
            <span class="flex flex-col gap-1">
                <span>
                    <Icon name="fa6-solid:thumbs-up" class="text-xl" />
                    {{ props.permLikes || props.likes }}
                </span>
                <span v-if="props.artisan?.name" class="text-sm opacity-60">
                    by
                    <NuxtLink :href="{ name: 'artisans-id', params: { id: props.artisan.artisanId }}" class="text-sm hover:underline" :class="{ 'p-1 px-2 bg-orange-400 rounded-full': props.artisan.isMaster, 'underline': !props.artisan.isMaster }">
                        <span v-if="props.artisan.isMaster">◆</span>
                        {{ props.artisan?.name }}
                        <span v-if="props.artisan.isMaster">◆</span>
                    </NuxtLink>
                </span>
            </span>
            <span class="flex flex-col gap-1 items-end">
                <Icon :name="props.gender === 1 ? 'fa6-solid:person' : 'fa6-solid:person-dress'" class="text-right"/>
                <span v-if="props.skill" class="text-sm opacity-60">{{ skillName }}</span>
            </span>
        </span>
        <span class="bottom-0 text-8xl font-bold text-white opacity-5 absolute -mr-3 5 -mb-4 select-none self-end z-0">
            {{ props.initials }}
        </span>
        <div class="blur" />
    </li>
</template>