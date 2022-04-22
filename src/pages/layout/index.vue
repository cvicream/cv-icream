<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()

</script>

<template>
  <div class="h-full flex flex-col items-center gap-16 mt-16">
    <h1 class="font-normal text-6xl text-black text-center leading-[4.875rem]">
      {{ t('layout.title') }}
    </h1>
    <div class="flex gap-16">
      <div class="text-center">
        <label for="layout-1" class="cursor-pointer">
          <img src="../../assets/images/layout-1.png">
        </label>
        <input id="layout-1" class="btn-radio mt-8" type="radio" name="layout" value="1">
      </div>
      <div class="text-center">
        <label for="layout-2" class="cursor-pointer">
          <img src="../../assets/images/layout-2.png">
        </label>
        <input id="layout-2" class="btn-radio mt-8" type="radio" name="layout" value="2">
      </div>
      <div class="text-center">
        <label for="layout-3" class="cursor-pointer">
          <img src="../../assets/images/layout-3.png">
        </label>
        <input id="layout-3" class="btn-radio mt-8" type="radio" name="layout" value="3">
      </div>
    </div>
    <div class="flex gap-8">
      <button class="w-[294px] h-12 border border-primary-100 rounded-xl text-white px-10 py-3">
        <span i-custom:add w-6 h-6 text-blacks-70 />
        <span class="font-normal text-lg text-blacks-100 leading-[1.375rem] vertical-middle ml-2">
          {{ t('layout.button.upload_cv') }}
        </span>
      </button>
      <button
        w-74 h-12 bg-primary-100 rounded-xl text-white px-10 py-3
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
