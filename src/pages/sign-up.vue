<script setup lang="ts">
const signInWithGoogle = () => {
  window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/auth/google?redirect=${window.location.origin}`
}

const signInWithLinkedIn = () => {
  window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/auth/linkedin?redirect=${window.location.origin}`
}
</script>

<template>
  <div class="p-16 mt-16 bg-primary-5 rounded-[64px] w-fit mx-auto md:mt-[195px]">
    <div class="flex justify-center">
      <span class="i-origin:logo-full w-50 h-[54px]" />
    </div>
    <div class="flex flex-col justify-center gap-8 mt-8 md:mt-16 md:flex-row md:gap-16">
      <div>
        <h2 class="heading2 text-blacks-100 text-center md:text-left">
          Now you can sign up with <br>CV Icream 🚀
        </h2>
        <div class="mt-8">
          <p class="subleading text-blacks-100">
            Enjoy a smooth editing experience with features like:
          </p>
          <ol class="list-disc mt-4 ml-6">
            <li class="subleading text-blacks-100 mt-4">
              Edit your CV anytime, anywhere with just ☝️<b>One Link</b>.
            </li>
            <li class="subleading text-blacks-100 mt-4">
              Keep track of all your CVs in one sleek <b>Dashboard</b> 👀.
            </li>
            <li class="subleading text-blacks-100 mt-4">
              Enjoy 💾 <b>Automatic Saving</b> for peace of mind.
            </li>
          </ol>
        </div>
      </div>
      <div>
        <button
          class="w-full btn-secondary"
          @click="signInWithGoogle"
        >
          <span class="i-origin:logo-google w-6 h-6" />
          <span class="subleading text-blacks-100 ml-2">Sign up with Google</span>
        </button>
        <button
          class="w-full btn-secondary mt-4"
          @click="signInWithLinkedIn"
        >
          <span class="i-origin:logo-linkedin w-6 h-6" />
          <span class="subleading text-blacks-100 ml-2">Sign up with LinkedIn</span>
        </button>

        <p class="note text-blacks-60 mt-4">
          By signing up, you agree to the
          <a class="border-b border-blacks-60 cursor-pointer">Terms & Conditions</a> and
          <a class="border-b border-blacks-60 cursor-pointer">Privacy Policy</a>.
        </p>

        <hr class="border-t border-blacks-10 my-6">

        <button
          class="w-full btn-secondary"
          @click="$router.push('/')"
        >
          <span class="subleading text-blacks-100 ml-4">Continue as Guest</span>
        </button>

        <p class="note text-blacks-60 mt-3">
          By continuing as guest, your info won’t be saved on CV Icream platform.
        </p>
        <p class="mt-6 text-center md:text-left">
          <span class="note text-blacks-60">Already have an account?</span>
          &nbsp;
          <a
            class="note text-link border-b border-link cursor-pointer"
            @click="$router.push('/sign-in')"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
