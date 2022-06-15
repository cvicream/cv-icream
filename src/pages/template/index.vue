<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '~/stores/user'
import { TEMPLATES } from '~/constants'

const user = useUserStore()
const { t } = useI18n()
const router = useRouter()

const selectedTemplate = ref(user.template || 1)

const onNext = () => {
  user.$patch((state) => {
    state.template = selectedTemplate.value
    const defaultTemplate = TEMPLATES.find(t => t.id === state.template)
    if (defaultTemplate)
      Object.assign(state, defaultTemplate)
  })
  router.push('/edit/about')
}
</script>

<template>
  <div class="h-full flex flex-col items-center gap-16">
    <h1 class="heading1-mobile sm:heading1 text-center">
      {{ t('template.title') }}
    </h1>
    <div class="flex flex-col gap-16 sm:flex-row">
      <div class="text-center">
        <label for="template-1" class="flex flex-col gap-5 cursor-pointer">
          <img src="../../assets/images/template-UIDesigner.png">
          <span class="leading text-blacks-100">
            {{ t('template.job.uidesigner') }}
          </span>
        </label>
        <input
          id="template-1"
          v-model="selectedTemplate"
          class="btn-radio mt-8"
          type="radio"
          name="template"
          :value="1"
        >
      </div>
      <div class="text-center">
        <label for="template-2" class="flex flex-col gap-5 cursor-pointer">
          <img src="../../assets/images/template-UXDesigner.png">
          <span class="leading text-blacks-100">
            {{ t('template.job.uxdesigner') }}
          </span>
        </label>
        <input
          id="template-2"
          v-model="selectedTemplate"
          class="btn-radio mt-8"
          type="radio"
          name="template"
          :value="2"
        >
      </div>
      <div class="text-center">
        <label for="template-3" class="flex flex-col gap-5 cursor-pointer">
          <img src="../../assets/images/template-Developer.png">
          <span class="leading text-blacks-100">
            {{ t('template.job.developer') }}
          </span>
        </label>
        <input
          id="template-3"
          v-model="selectedTemplate"
          class="btn-radio mt-8"
          type="radio"
          name="template"
          :value="3"
        >
      </div>
      <div class="text-center">
        <label for="template-4" class="flex flex-col gap-5 cursor-pointer">
          <img src="../../assets/images/template-ProductManager.png">
          <span class="leading text-blacks-100">
            {{ t('template.job.manager') }}
          </span>
        </label>
        <input
          id="template-4"
          v-model="selectedTemplate"
          class="btn-radio mt-8"
          type="radio"
          name="template"
          :value="4"
        >
      </div>
      <div class="text-center">
        <label for="template-4" class="flex flex-col gap-5 cursor-pointer">
          <img src="../../assets/images/template-BuildfromScratch.png">
          <span class="leading text-blacks-100">
            {{ t('template.job.others') }}
          </span>
        </label>
        <input
          id="template-4"
          v-model="selectedTemplate"
          class="btn-radio mt-8"
          type="radio"
          name="template"
          :value="4"
        >
      </div>
    </div>
    <div class="flex flex-col gap-10 sm:flex-row fix-padding-bottom">
      <button
        class="w-[294px] btn-secondary"
        @click="router.back()"
      >
        <span class="i-custom:expand w-6 h-6 text-blacks-70" />
        <span class="subleading vertical-middle ml-2">
          {{ t('template.button.back') }}
        </span>
      </button>
      <button
        class="w-[294px] btn-primary"
        @click="onNext"
      >
        <span class="i-custom:collapse w-6 h-6" />
        <span class="subleading vertical-middle ml-2">
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

<style scoped>
.fix-padding-bottom > *:last-child {
  margin-bottom: 4rem;
}
</style>
