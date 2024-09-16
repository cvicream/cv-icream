<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const { user } = storeToRefs(auth)

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
})

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(name)
}

</script>

<template>
  <div class="max-w-[1184px] px-8 py-6 mx-auto">
    <div class="flex justify-between py-11">
      <div>
        <h2 class="heading2 text-blacks-100">
          Hi, {{ displayName }}! 👋 Are you ready to
          <br>
          dive into your CV today?
        </h2>
        <p class="subleading text-blacks-100 mt-2">
          Take a little time to invest in yourself; you're one
          <br>
          step closer to achieving your dream job!
        </p>
      </div>
      <div class="flex flex-col gap-5">
        <button class="flex justify-center items-center btn-primary">
          <span class="i-custom:plus w-6 h-6 text-white mr-3" />
          <span class="leading text-white">Add New CV</span>
        </button>
        <button class="flex justify-center items-center btn-secondary">
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
          <a class="border-b border-blacks-100 cursor-pointer">Discover</a>
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
          <a class="border-b border-blacks-100 cursor-pointer">Join</a>
          our job-hunting community. Let’s safely land your dream job together.
        </p>
      </div>
    </div>
    <div class="mt-5 px-8 py-6 bg-white rounded-[24px]">
      <p class="leading text-blacks-100">
        Your CV
      </p>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: dashboard
  requiresAuth: true
</route>
