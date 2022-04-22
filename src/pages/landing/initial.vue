<script setup lang="ts">
import { useUserStore } from '~/stores/user'

import { useToolbarStore } from '~/stores/toolbar'
import { getJsonUpload, setStatus } from '~/utils'

const user = useUserStore()
const toolbar = useToolbarStore()
const { t } = useI18n()
const router = useRouter()

async function upload() {
  await importJsonFile()
  redirectToEdit()
}

async function importJsonFile() {
  const jsonFile = await getJsonUpload()
  const obj = JSON.parse(jsonFile as string)
  Object.keys(obj).forEach((key) => {
    if (key === 'user') {
      const subObj = obj[key]
      Object.keys(subObj).forEach((subKey) => {
        user.$patch((state) => {
          state[subKey] = subObj[subKey]
        })
      })
    }
    else if (key === 'toolbar') {
      const subObj = obj[key]
      Object.keys(subObj).forEach((subKey) => {
        toolbar.$patch((state) => {
          state.currentState[subKey] = subObj[subKey]
        })
      })
    }
  })
}

function redirectToEdit() {
  setStatus({ isSaved: true })
  router.push('/edit/about')
}

const onNext = () => {
  router.push('/landing/template')
}
</script>

<template>
  <div class="h-full flex flex-col justify-center  items-center gap-16">
    <h1 class="heading1-mobile sm:heading1 text-center">
      {{ t('initial.title') }}
    </h1>
    <div class="border-black-70 flex flex-col gap-16 sm:flex-row">
      <button
        class="px-11 flex justify-center items-center w-101 h-66 rounded-xl flex-col gap-5 border-primary-100 shadow-custom hover:border-1 hover:bg-primary-10"
        @click="onNext"
      >
        <div class="w-12 h-12 flex justify-center items-center p-2 rounded-full border-1 border-transparent shadow-custom">
          <span class="i-custom:preview w-8 h-8" />
        </div>
        <span class="leading2 text-blacks-100">
          {{ t('initial.action.new') }}
        </span>
        <span>
          {{ t('initial.hint.new') }}
        </span>
      </button>
      <button
        class="px-8 flex justify-center items-center w-101 h-66 rounded-xl flex-col gap-5 border-primary-100 shadow-custom hover:border-1 hover:bg-primary-10"
        @click="upload"
      >
        <div class="w-12 h-12 flex justify-center items-center p-2 rounded-full border-1 border-transparent shadow-custom">
          <span class="i-custom:load w-8 h-8" />
        </div>
        <span class="leading2 text-blacks-100">
          {{ t('initial.action.upload') }}
        </span>
        <span>
          {{ t('initial.hint.upload') }}
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
