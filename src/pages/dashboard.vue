<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'
import { useCVStore } from '~/stores/cv'

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
</script>

<template>
  <div class="max-w-[1184px] px-8 py-6 mx-auto">
    <div class="flex justify-between py-11">
      <div class="max-w-[540px]">
        <h2 class="heading2 text-blacks-100">
          Hi, {{ displayName }}! 👋<br>
          Ready to jump into your CV today?
        </h2>
        <p class="subleading text-blacks-100 mt-2">
          Take a little time to invest in yourself; you're one step closer to achieving your dream job!
        </p>
      </div>
      <div class="flex flex-col gap-5">
        <button
          class="flex justify-center items-center px-7 py-5 rounded-[24px] text-white bg-primary-100 border-1 border-transparent transition duration-300 ease-out sm:hover:border-primary-20"
          @click="createCV"
        >
          <span class="i-custom:plus w-6 h-6 text-white mr-3" />
          <span class="leading text-white">Create a New CV</span>
        </button>
        <button class="flex justify-center items-center px-7 py-5 rounded-[24px] text-blacks-100 bg-white border-1 border-primary-100 transition duration-300 ease-out sm:hover:bg-primary-10">
          <span class="i-custom:upload w-6 h-6 text-blacks-70 mr-3" />
          <span class="leading text-blacks-100">Import CV Draft</span>
        </button>
      </div>
    </div>
    <div class="flex gap-5 mt-5">
      <div class="px-8 py-6 bg-white rounded-[24px] flex-1">
        <p class="leading text-blacks-100">
          Workshops  🎄
        </p>
        <p class="note text-blacks-100 mt-2">
          Join us for a sweet chat! Don’t miss our upcoming online event, 'Make Your CV Shine'.
          <a class="border-b border-blacks-100 cursor-pointer">Register</a>
          now!
        </p>
      </div>
      <div class="px-8 py-6 bg-white rounded-[24px] flex-1">
        <p class="leading text-blacks-100">
          Tips  👀
        </p>
        <p class="note text-blacks-100 mt-2">
          <a
            class="border-b border-blacks-100 cursor-pointer"
            href="https://medium.com/cv-icream"
            target="_blank"
          >
            Discover
          </a>
          handy and actionable tips on making a perfect CV in our Medium publication.
        </p>
      </div>
      <div class="px-8 py-6 bg-white rounded-[24px] flex-1">
        <p class="leading text-blacks-100">
          Community  🪂
        </p>
        <p class="note text-blacks-100 mt-2">
          You’re not traveling alone!
          <br>
          <a
            class="border-b border-blacks-100 cursor-pointer"
            href="https://discord.com/invite/mjVdcp6f"
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
        <div class="flex flex-wrap gap-5">
          <DashboardCV
            v-for="item in cvs"
            :key="item.id"
            :data="item"
          />
        </div>
      </div>
      <div v-else class="py-16">
        <p class="paragraph text-blacks-60 text-center">
          You don't have any CVs saved here.
          <button
            class="text-link border-b border-link"
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
