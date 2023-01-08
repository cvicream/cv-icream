<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'
import { DEFAULT_TEMPLATE, TEMPLATES } from '~/constants'

const user = useUserStore()
const toolbar = useToolbarStore()
const { template } = storeToRefs(user)

const { t } = useI18n()
const router = useRouter()

const selectedTemplate = ref(user.template)

onBeforeMount(() => {
  // make sure style change back
  setStyle(DEFAULT_TEMPLATE.style)
})

function setStyle(style) {
  toolbar.changeColor(style.color)
  toolbar.changeFontSize(style.fontSize)
  toolbar.changeFontFamily(style.fontFamily)
  toolbar.changeLayout(style.layout)
}

function onNext() {
  // if the selected template is different from the previous template
  if (selectedTemplate.value !== template.value) {
    const defaultTemplate = TEMPLATES.find(t => t.template === selectedTemplate.value)
    if (defaultTemplate) {
      user.$patch((state) => {
        Object.assign(state, defaultTemplate)
      })
    }
  }
  router.push('/edit/about')
}
</script>

<template>
  <div class="h-full flex flex-col justify-start py-12 px-4 sm:p-4 items-center gap-16">
    <h1 class="heading1-mobile sm:heading1 text-center">
      {{ t('template.title') }}
    </h1>
    <div class="flex flex-col gap-16 sm:flex-row">
      <div class="flex flex-col justify-between items-center">
        <label for="template-1" class="flex flex-col gap-5 cursor-pointer">
          <img class="w-[210px] sm:w-auto" src="../assets/images/template-ui-designer.png">
          <span class="leading text-blacks-100 text-center">
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
      <div class="flex flex-col justify-between items-center">
        <label for="template-2" class="flex flex-col gap-5 cursor-pointer">
          <img class="w-[210px] sm:w-auto" src="../assets/images/template-ux-designer.png">
          <span class="leading text-blacks-100 text-center">
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
      <div class="flex flex-col justify-between items-center">
        <label for="template-3" class="flex flex-col gap-5 cursor-pointer">
          <img class="w-[210px] sm:w-auto" src="../assets/images/template-developer.png">
          <span class="leading text-blacks-100 text-center">
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
      <div class="flex flex-col justify-between items-center">
        <label for="template-4" class="flex flex-col gap-5 cursor-pointer">
          <img class="w-[210px] sm:w-auto" src="../assets/images/template-product-manager.png">
          <span class="leading text-blacks-100 text-center">
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
      <div class="flex flex-col justify-between items-center">
        <label for="template-0" class="flex flex-col gap-5 cursor-pointer">
          <img class="w-[210px] sm:w-auto" src="../assets/images/template-scratch.png">
          <span class="leading text-blacks-100 text-center">
            {{ t('template.job.others') }}
          </span>
        </label>
        <input
          id="template-0"
          v-model="selectedTemplate"
          class="btn-radio mt-8"
          type="radio"
          name="template"
          :value="0"
        >
      </div>
    </div>
    <div class="flex flex-col gap-5 pb-16 sm:gap-10 sm:flex-row">
      <button
        class="w-[294px] btn-primary order-1 sm:order-2"
        @click="onNext"
      >
        <span class="i-custom:collapse w-6 h-6" />
        <span class="subleading vertical-text-top ml-2">
          {{ t('template.button.next_step') }}
        </span>
      </button>
      <button
        class="w-[294px] btn-secondary order-2 sm:order-1"
        @click="router.back()"
      >
        <span class="i-custom:expand w-6 h-6 text-blacks-70" />
        <span class="subleading vertical-text-top ml-2">
          {{ t('template.button.back') }}
        </span>
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>