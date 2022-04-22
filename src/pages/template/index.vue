<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()
</script>

<template>
  <div class="h-full flex flex-col items-center gap-16 mt-16">
    <h1 class="font-normal text-6xl text-black text-center leading-[4.875rem]">
      {{ t('template.title') }}
    </h1>
    <div class="flex gap-16">
      <div class="text-center">
        <label for="template-1" class="flex flex-col gap-5 cursor-pointer">
          <img src="../../assets/images/template-UIUXDesigner.png">
          <span class="text-xl">
            {{ t('template.job.designer') }}
          </span>
        </label>
        <div>
          <input id="template-1" class="btn-radio mt-8" type="radio" name="template" value="1">
        </div>
      </div>
      <div class="text-center">
        <label for="template-2" class="flex flex-col gap-5 cursor-pointer">
          <img src="../../assets/images/template-Developer.png">
          <span class="text-xl">
            {{ t('template.job.developer') }}
          </span>
        </label>
        <div>
          <input id="template-2" class="btn-radio mt-8" type="radio" name="template" value="2">
        </div>
      </div>
      <div class="text-center">
        <label for="template-3" class="flex flex-col gap-5 cursor-pointer">
          <img src="../../assets/images/template-ProjectManager.png">
          <span class="text-xl">
            {{ t('template.job.manager') }}
          </span>
        </label>
        <div>
          <input id="template-3" class="btn-radio mt-8" type="radio" name="template" value="3">
        </div>
      </div>
      <div class="text-center">
        <label for="template-4" class="flex flex-col gap-5 cursor-pointer">
          <img src="../../assets/images/template-BuildfromScratch.png">
          <div class="text-xl">
            {{ t('template.job.others') }}
          </div>
        </label>
        <div>
          <input id="template-4" class="btn-radio mt-8" type="radio" name="template" value="4">
        </div>
      </div>
    </div>
    <div class="flex gap-10">
      <button
        w-74 h-12 border border-primary-100 rounded-xl text-white px-10 py-3
        @click="router.back()"
      >
        <span i-custom:expand w-6 h-6 text-blacks-70 />
        <span class="font-normal text-lg text-blacks-100 leading-[1.375rem] vertical-middle ml-2">
          {{ t('template.button.back') }}
        </span>
      </button>
      <button
        w-74 h-12 bg-primary-100 rounded-xl text-white px-10 py-3
        @click="router.push('edit')"
      >
        <span i-custom:collapse w-6 h-6 />
        <span class="font-normal text-lg leading-[1.375rem] vertical-middle ml-2">
          {{ t('template.button.next_step') }}
        </span>
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
