<script setup lang="ts">
import { MOBILE_BREAKPOINT, SIGN_UP_SURVEY } from '~/constants'
import type { Step, Survey } from '~/types'

const router = useRouter()

const isSmallWindow = ref(false)
const steps = ref<Step[]>(SIGN_UP_SURVEY)
const hasSubmitted = ref<boolean>(false)

onMounted(() => {
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
})

function submit(value: Survey) {
  hasSubmitted.value = true
  console.log(value, 'submit value')
}

function resize() {
  isSmallWindow.value = (window.innerWidth <= MOBILE_BREAKPOINT)
}

const logoClass = computed(() => ({
  'i-origin:cv-icream-2 w-[150px] h-[28.8px] hidden sm:block': true,
  ...(hasSubmitted.value ? { 'mb-[80px]': true } : { 'mb-[44px]': true }),
}))
</script>

<template>
  <div class="flex flex-col justify-start items-center mt-[82px] mb-[64px]">
    <div class="flex justify-center items-center">
      <span :class="logoClass" />
    </div>
    <div v-if="!hasSubmitted" class="sm:w-[500px] flex flex-col gap-[32px] sm:gap-[42px]">
      <div class="text-center">
        <h3 class="heading2-mobile sm:heading2">
          Welcome to CV Icream!
        </h3>
        <p class="note text-blacks-70">
          Just a few more questions left to create your CV
        </p>
      </div>
      <Wizard :steps="steps" @submit="submit" />
    </div>
    <div v-else class="text-center flex flex-col">
      <div class="heading2-mobile sm:heading2">
        Thanks for your feedback!
      </div>
      <div class="note text-blacks-70 mt-[4px]">
        We constantly make our product better!
      </div>
      <button
        class="h-[46px] btn-primary mt-[44px] subleading"
        @click="router.push('/dashboard')"
      >
        Go to Dashboard
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: survey
</route>
