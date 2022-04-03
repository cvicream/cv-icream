<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()
</script>

<template>
  <div class="h-full flex flex-col justify-center items-center">
    <h1 class="font-normal text-6xl text-black text-center leading-[4.875rem]">
      {{ t('home.title') }}
    </h1>
    <div mt-16>
      <button
        h-12 bg-primary-100 rounded-xl text-white px-10 py-3
        @click="router.push('layout')"
      >
        <span i-custom:about w-6 h-6 />
        <span class="font-normal text-lg leading-[1.375rem] vertical-middle ml-2">
          {{ t('home.button.start_cv') }}
        </span>
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
