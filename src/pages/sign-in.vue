<script setup lang="ts">
const signUpWithGoogle = () => {
  window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/auth/google?redirect=${window.location.origin}`
}

const signUpWithLinkedIn = () => {
  window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/auth/linkedin?redirect=${window.location.origin}`
}
</script>

<template>
  <div class="h-full flex justify-center items-center custom-scrollbar overflow-auto">
    <div class="p-8 sm:p-16 mx-8 sm:mx-16 bg-primary-5 rounded-[64px]">
      <div class="flex justify-center">
        <span class="i-origin:logo-full w-50 h-[54px]" />
      </div>
      <div class="mt-8">
        <h2 class="heading2 text-blacks-100 text-center">
          Welcome back to CV Icream
        </h2>
        <div class="mt-8 text-center">
          <button
            class="w-full max-w-[294px] btn-secondary"
            @click="signUpWithGoogle"
          >
            <span class="i-origin:logo-google w-6 h-6" />
            <span class="subleading text-blacks-100 ml-2">Log in with Google</span>
          </button>
          <button
            class="w-full max-w-[294px] btn-secondary mt-4"
            @click="signUpWithLinkedIn"
          >
            <span class="i-origin:logo-linkedin w-6 h-6" />
            <span class="subleading text-blacks-100 ml-2">Log in with LinkedIn</span>
          </button>

          <p class="mt-6 text-center">
            <span class="note text-blacks-60">Don’t have an account yet?</span>
          &nbsp;
            <a
              class="note text-link border-b border-link cursor-pointer"
              @click="$router.push('/sign-up')"
            >
              Sign up for free now!
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
