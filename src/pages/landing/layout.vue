<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'
import { getJsonUpload, setStatus } from '~/utils'
import { LAYOUTS } from '~/constants'

const user = useUserStore()
const toolbar = useToolbarStore()
const { currentState } = storeToRefs(toolbar)
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

function onNext() {
  router.push('/template')
}
</script>

<template>
  <div class="h-full flex flex-col items-center gap-16">
    <h1 class="heading1-mobile sm:heading1 text-center">
      {{ t('layout.title') }}
    </h1>
    <div class="flex flex-col gap-16 sm:flex-row">
      <div
        v-for="item in LAYOUTS"
        :key="item.id"
        class="text-center"
      >
        <label :for="item.id" class="cursor-pointer">
          <img :src="`/images/${item.image}`" :alt="item.name">
        </label>
        <input
          :id="item.id"
          v-model="currentState.layout"
          class="btn-radio mt-8"
          type="radio"
          name="layout"
          :value="item.id"
        >
      </div>
    </div>
    <div class="flex flex-col gap-8 sm:flex-row fix-padding-bottom">
      <button class="w-[294px] btn-secondary" @click="upload">
        <span class="i-custom:add w-6 h-6 text-blacks-70" />
        <span class="subleading vertical-text-top ml-2">
          {{ t('layout.button.upload_cv') }}
        </span>
      </button>
      <button
        class="w-[294px] btn-primary"
        @click="onNext"
      >
        <span class="i-custom:collapse w-6 h-6" />
        <span class="subleading vertical-text-top ml-2">
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

<style scoped>
.fix-padding-bottom > *:last-child {
  margin-bottom: 4rem;
}
</style>
