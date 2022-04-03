<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()
</script>

<template>
  <div class="h-full flex flex-col items-center gap-10 mt-16">
    <h1 class="font-normal text-6xl text-black text-center leading-[4.875rem]">
      {{ t('layout.title') }}
    </h1>
    <div class="flex gap-10">
      <button
        h-12 border border-primary-100 rounded-xl text-white px-10 py-3
      >
        <span i-custom:add w-6 h-6 text-blacks-70 />
        <span class="font-normal text-lg text-blacks-100 leading-[1.375rem] vertical-middle ml-2">
          {{ t('layout.button.upload_cv') }}
        </span>
      </button>
      <button
        h-12 bg-primary-100 rounded-xl text-white px-10 py-3
        @click="router.push('template')"
      >
        <span i-custom:collapse w-6 h-6 />
        <span class="font-normal text-lg leading-[1.375rem] vertical-middle ml-2">
          {{ t('layout.button.next_step') }}
        </span>
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
