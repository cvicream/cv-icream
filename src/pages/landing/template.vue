<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'
import { TEMPLATES } from '~/constants'

const user = useUserStore()
const toolbar = useToolbarStore()
const { template } = storeToRefs(user)

const { t } = useI18n()
const router = useRouter()

const setStyle = (style) => {
  toolbar.changeColor(style.color)
  toolbar.changeFontSize(style.fontSize)
  toolbar.changeFontFamily(style.fontFamily)
  toolbar.changeLayout(style.layout)
}

watch(template, () => {
  const defaultTemplate = TEMPLATES.find(t => t.template === template.value)
  if (defaultTemplate) {
    user.$patch((state) => {
      Object.assign(state, defaultTemplate)
    })
  }
})

const onNext = () => {
  setStyle(user.style)
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
          <img src="../../assets/images/template-UIDesigner.svg">
          <span class="leading text-blacks-100">
            {{ t('template.job.uidesigner') }}
          </span>
        </label>
        <input
          id="template-1"
          v-model="user.template"
          class="btn-radio mt-8"
          type="radio"
          name="template"
          :value="1"
        >
      </div>
      <div class="text-center">
        <label for="template-2" class="flex flex-col gap-5 cursor-pointer">
          <img src="../../assets/images/template-UXDesigner.svg">
          <span class="leading text-blacks-100">
            {{ t('template.job.uxdesigner') }}
          </span>
        </label>
        <input
          id="template-2"
          v-model="user.template"
          class="btn-radio mt-8"
          type="radio"
          name="template"
          :value="2"
        >
      </div>
      <div class="text-center">
        <label for="template-3" class="flex flex-col gap-5 cursor-pointer">
          <img src="../../assets/images/template-Developer.svg">
          <span class="leading text-blacks-100">
            {{ t('template.job.developer') }}
          </span>
        </label>
        <input
          id="template-3"
          v-model="user.template"
          class="btn-radio mt-8"
          type="radio"
          name="template"
          :value="3"
        >
      </div>
      <div class="text-center">
        <label for="template-4" class="flex flex-col gap-5 cursor-pointer">
          <img src="../../assets/images/template-ProductManager.svg">
          <span class="leading text-blacks-100">
            {{ t('template.job.manager') }}
          </span>
        </label>
        <input
          id="template-4"
          v-model="user.template"
          class="btn-radio mt-8"
          type="radio"
          name="template"
          :value="4"
        >
      </div>
      <div class="text-center">
        <label for="template-0" class="flex flex-col gap-5 cursor-pointer">
          <img src="../../assets/images/template-BuildfromScratch.svg">
          <span class="leading text-blacks-100">
            {{ t('template.job.others') }}
          </span>
        </label>
        <input
          id="template-0"
          v-model="user.template"
          class="btn-radio mt-8"
          type="radio"
          name="template"
          :value="0"
        >
      </div>
    </div>
    <div class="flex flex-col gap-10 sm:flex-row fix-padding-bottom">
      <button
        class="w-[294px] btn-secondary"
        @click="router.back()"
      >
        <span class="i-custom:expand w-6 h-6 text-blacks-70" />
        <span class="subleading vertical-text-top ml-2">
          {{ t('template.button.back') }}
        </span>
      </button>
      <button
        class="w-[294px] btn-primary"
        @click="onNext"
      >
        <span class="i-custom:collapse w-6 h-6" />
        <span class="subleading vertical-text-top ml-2">
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
