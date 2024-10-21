<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'
import { useCVStore } from '~/stores/cv'
import { MAX_UNPAID_CV_NUM } from '~/constants'
import { generateFileName, getJsonUpload } from '~/utils'
import type { CreateCV } from '~/types'

const eventURL = import.meta.env.VITE_EVENT_URL
const mediumURL = import.meta.env.VITE_MEDIUM_URL
const discordURL = import.meta.env.VITE_DISCORD_URL

const router = useRouter()
const auth = useAuthStore()
const cv = useCVStore()
const { user } = storeToRefs(auth)
const { cvs } = storeToRefs(cv)

const displayName = computed(() => {
  if (user.value?.firstName)
    return user.value.firstName
  if (user.value?.lastName)
    return user.value.lastName
  return 'Friend'
})

const isMaxNum = computed(() => Array.isArray(cvs.value) && cvs.value.length >= MAX_UNPAID_CV_NUM)

onMounted(async() => {
  const token = getQueryParam('token')
  if (token) {
    localStorage.setItem('token', token)
    window.history.replaceState({}, document.title, window.location.pathname)
  }

  cv.getAll()
})

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(name)
}

const createCV = () => {
  router.push('/template')
}

const importCV = async() => {
  if (!user.value)
    return

  try {
    const json = await getJsonUpload()
    const obj = JSON.parse(json as string)
    const newCV: CreateCV = {
      userId: user.value.id,
      title: generateFileName(obj?.user?.about?.name, obj?.user?.about?.jobTitle),
      description: '',
      content: json as string,
    }
    await cv.create(newCV)
    await cv.getAll()
  }
  catch (error) {
    // TODO: handle error
  }
}

const openInNewTab = (url) => {
  if (!url)
    return
  window.open(url, '_blank')
}
</script>

<template>
  <div class="max-w-[1184px] p-8 sm:p-16 mx-auto">
    <div class="sm:flex sm:justify-between">
      <div class="max-w-[540px] sm:mr-6">
        <h2 class="heading2 text-blacks-100">
          Hi, {{ displayName }}! 👋<br>
          <span class="hidden sm:block">Ready to jump into your CV today?</span>
          <span class="sm:hidden">Are you ready to dive into your CV today?</span>
        </h2>
        <p class="hidden sm:block subleading text-blacks-100 mt-2">
          Take a little time to invest in yourself; you're one step closer to achieving your dream job!
        </p>
      </div>
      <div class="flex flex-col gap-5 mt-5 sm:mt-0">
        <Tooltip
          placement="bottom"
          class="hidden sm:block"
          style="max-width: 260px;"
          :text="isMaxNum
            ? 'You\'ve reached the maximum CV limit. Please delete one to create a new CV.'
            : 'Import the CV saved on your local device. This option is only available for files with the .cvicream extension.'
          "
        >
          <button
            class="w-full sm:w-[260px] flex justify-center items-center px-7 py-5 rounded-[24px] text-white bg-primary-100 border-1 border-transparent transition duration-300 ease-out sm:hover:border-primary-20 disabled:bg-blacks-10 disabled:text-blacks-40"
            :disabled="isMaxNum"
            @click="createCV"
          >
            <span class="i-custom:plus w-6 h-6 mr-2" />
            <span class="leading">Create a New CV</span>
          </button>
        </Tooltip>
        <Tooltip
          placement="bottom"
          class="hidden sm:block"
          style="max-width: 260px;"
          :text="isMaxNum
            ? 'You\'ve reached the maximum CV limit. Please delete one to create a new CV.'
            : 'Import the CV saved on your local device. This option is only available for files with the .cvicream extension.'
          "
        >
          <button
            :disabled="isMaxNum"
            class="w-[260px] flex justify-center items-center px-7 py-5 rounded-[24px] text-blacks-100 bg-white border-1 border-primary-100 transition duration-300 ease-out sm:hover:bg-primary-10 disabled:bg-blacks-10 disabled:hover:bg-blacks-10 disabled:text-blacks-40 disabled:border-transparent"
            @click="importCV"
          >
            <span class="i-custom:upload w-6 h-6 mr-2" />
            <span class="leading">Import CV Draft</span>
          </button>
        </Tooltip>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row gap-5 mt-5 sm:mt-13">
      <div
        class="px-8 py-6 bg-white rounded-[24px] flex-1 border border-white cursor-pointer hover:border-primary-100 transition duration-300 ease-out"
        @click="openInNewTab(eventURL)"
      >
        <p class="leading text-blacks-100">
          Workshops  🎄
        </p>
        <p class="note text-blacks-100 mt-2">
          Join us for a sweet chat! Don’t miss our upcoming online event, 'Make Your CV Shine'.
          <a
            class="border-b border-blacks-100 cursor-pointer"
            :href="eventURL"
            target="_blank"
          >
            Register
          </a>
          now!
        </p>
      </div>
      <div
        class="px-8 py-6 bg-white rounded-[24px] flex-1 border border-white cursor-pointer hover:border-primary-100 transition duration-300 ease-out"
        @click="openInNewTab(mediumURL)"
      >
        <p class="leading text-blacks-100">
          Tips  👀
        </p>
        <p class="note text-blacks-100 mt-2">
          <a
            class="border-b border-blacks-100 cursor-pointer"
            :href="mediumURL"
            target="_blank"
          >
            Discover
          </a>
          handy and actionable tips on making a perfect CV in our Medium publication.
        </p>
      </div>
      <div
        class="px-8 py-6 bg-white rounded-[24px] flex-1 border border-white cursor-pointer hover:border-primary-100 transition duration-300 ease-out"
        @click="openInNewTab(discordURL)"
      >
        <p class="leading text-blacks-100">
          Community  🪂
        </p>
        <p class="note text-blacks-100 mt-2">
          You’re not traveling alone!
          <br>
          <a
            class="border-b border-blacks-100 cursor-pointer"
            :href="discordURL"
            target="_blank"
          >
            Join
          </a>
          our job-hunting community. Let’s safely land your dream job together.
        </p>
      </div>
    </div>
    <div class="mt-5 px-8 py-6 bg-white rounded-[24px]">
      <div class="flex justify-between items-center">
        <p class="leading text-blacks-100">
          Your CV
        </p>
        <Tooltip
          v-if="!isMaxNum"
          placement="bottom"
          text="Create a New CV"
        >
          <button
            class="w-6 h-6"
            @click="createCV"
          >
            <span class="i-custom:plus w-6 h-6 text-blacks-40 hover:text-blacks-70" />
          </button>
        </Tooltip>
      </div>

      <div v-if="cvs &&cvs.length" class="pt-5 pb-6">
        <div class="flex flex-col sm:flex-row sm:flex-wrap gap-5">
          <DashboardCV
            v-for="item in cvs"
            :key="item.id"
            :data="item"
          />
        </div>
      </div>
      <div v-else class="py-5 sm:py-16">
        <p class="paragraph text-blacks-60 text-center">
          You don't have any CVs saved here.
          <br class="block sm:hidden">
          <button
            class="text-link border-b border-link mt-1 sm:mt-0"
            @click="createCV"
          >
            Create a new CV
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: dashboard
  requiresAuth: true
</route>
