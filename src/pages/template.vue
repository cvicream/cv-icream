<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'
import { useCVStore } from '~/stores/cv'
import { DEFAULT_TEMPLATE, MOBILE_BREAKPOINT, TEMPLATES } from '~/constants'
import { getStorage, hasStorage, setStatus, stripHtml } from '~/utils'
import type { CreateCV } from '~/types'

const auth = useAuthStore()
const { user: authUser } = storeToRefs(auth)
const user = useUserStore()
const toolbar = useToolbarStore()
const cv = useCVStore()

const { t } = useI18n()
const router = useRouter()

const selectedTemplate = ref(user.template)
const isSmallWindow = ref(false)

onBeforeMount(() => {
  // make sure style change back
  toolbar.setCurrentState(DEFAULT_TEMPLATE.style)
})

onMounted(() => {
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
})

async function onNext() {
  if (authUser.value) {
    // create new CV in database
    const defaultTemplate = TEMPLATES.find(t => t.template === selectedTemplate.value)
    if (defaultTemplate) {
      user.$patch((state) => {
        Object.assign(state, defaultTemplate)
      })
      toolbar.setCurrentState(defaultTemplate.style)
    }

    const content = {
      user: user.$state,
      toolbar: toolbar.$state,
    }
    const newCV: CreateCV = {
      userId: authUser.value.id,
      title: `${stripHtml(defaultTemplate.about.name)}_${stripHtml(defaultTemplate.about.jobTitle)}`,
      description: '',
      content: JSON.stringify(content),
    }
    const cvData = await cv.create(newCV)
    if (cvData)
      setStatus({ id: cvData.id })
  }
  else {
    let isNewTemplate = true

    if (hasStorage()) {
      const storage = getStorage()
      if (selectedTemplate.value === storage.user.template) {
        // load previous state from storage
        isNewTemplate = false
        Object.keys(storage).forEach((key) => {
          if (key === 'user') {
            const subObj = storage[key]
            Object.keys(subObj).forEach((subKey) => {
              user.$patch((state) => {
                state[subKey] = subObj[subKey]
              })
            })
            user.updateTimestamp()
          }
          else if (key === 'toolbar') {
            const subObj = storage[key]
            Object.keys(subObj).forEach((subKey) => {
              if (subKey === 'currentState') {
                toolbar.setCurrentState(subObj[subKey])
              }
              else {
                toolbar.$patch((state) => {
                  state[subKey] = subObj[subKey]
                })
              }
            })
          }
        })
      }
    }

    if (isNewTemplate) {
      const defaultTemplate = TEMPLATES.find(t => t.template === selectedTemplate.value)
      if (defaultTemplate) {
        user.$patch((state) => {
          Object.assign(state, defaultTemplate)
        })
        toolbar.setCurrentState(defaultTemplate.style)
      }
    }
  }

  setStatus({ isEditing: true })
  router.push('/edit/about')
}

function resize() {
  isSmallWindow.value = (window.innerWidth <= MOBILE_BREAKPOINT)
}
</script>

<template>
  <div class="h-full flex flex-col justify-start py-12 px-4 sm:p-4 items-center gap-16">
    <div>
      <h1 class="heading1-mobile sm:heading1 text-center">
        {{ t('template.title') }}
      </h1>
      <p class="px-4 py-4 paragraph text-center md:px-8 lg:px-12">
        {{ isSmallWindow
          ? 'The template you choose will add relevant text for the job type selected, and we suggest a layout, but everything is editable.'
          : 'The template you choose will add relevant text for the job type selected, and we suggest a layout, but everything is editable. If you don’t see your job position, don’t worry. You can easily choose which layout you prefer or build from scratch, and they all work perfectly fine with all jobs.'
        }}
      </p>
    </div>
    <div class="flex flex-col gap-16 sm:flex-row">
      <div class="flex flex-col justify-between items-center">
        <label for="template-ui-designer" class="flex flex-col gap-5 cursor-pointer">
          <img class="w-[210px] sm:w-auto" src="../assets/images/template-ui-designer.png">
          <span class="leading text-blacks-100 text-center">
            {{ t('template.job.uidesigner') }}
          </span>
        </label>
        <input
          id="template-ui-designer"
          v-model="selectedTemplate"
          class="btn-radio mt-8"
          type="radio"
          name="template"
          :value="1"
        >
      </div>
      <div class="flex flex-col justify-between items-center">
        <label for="template-ux-designer" class="flex flex-col gap-5 cursor-pointer">
          <img class="w-[210px] sm:w-auto" src="../assets/images/template-ux-designer.png">
          <span class="leading text-blacks-100 text-center">
            {{ t('template.job.uxdesigner') }}
          </span>
        </label>
        <input
          id="template-ux-designer"
          v-model="selectedTemplate"
          class="btn-radio mt-8"
          type="radio"
          name="template"
          :value="2"
        >
      </div>
      <div class="flex flex-col justify-between items-center">
        <label for="template-developer" class="flex flex-col gap-5 cursor-pointer">
          <img class="w-[210px] sm:w-auto" src="../assets/images/template-developer.png">
          <span class="leading text-blacks-100 text-center">
            {{ t('template.job.developer') }}
          </span>
        </label>
        <input
          id="template-developer"
          v-model="selectedTemplate"
          class="btn-radio mt-8"
          type="radio"
          name="template"
          :value="3"
        >
      </div>
      <div class="flex flex-col justify-between items-center">
        <label for="template-product-manager" class="flex flex-col gap-5 cursor-pointer">
          <img class="w-[210px] sm:w-auto" src="../assets/images/template-product-manager.png">
          <span class="leading text-blacks-100 text-center">
            {{ t('template.job.manager') }}
          </span>
        </label>
        <input
          id="template-product-manager"
          v-model="selectedTemplate"
          class="btn-radio mt-8"
          type="radio"
          name="template"
          :value="4"
        >
      </div>
      <div class="flex flex-col justify-between items-center">
        <label for="template-build-from-scratch" class="flex flex-col gap-5 cursor-pointer">
          <img class="w-[210px] sm:w-auto" src="../assets/images/template-scratch.png">
          <span class="leading text-blacks-100 text-center">
            {{ t('template.job.others') }}
          </span>
        </label>
        <input
          id="template-build-from-scratch"
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
