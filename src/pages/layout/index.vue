<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'
import { getJsonUpload, isEditing } from '~/utils'

const user = useUserStore()
const toolbar = useToolbarStore()
const { currentState } = storeToRefs(toolbar)
const { t } = useI18n()
const router = useRouter()

const modalVisible = ref(isEditing())

function createNew() {
  user.$reset()
  toolbar.$reset()
  modalVisible.value = false
}

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
      <div class="text-center">
        <label for="layout-1" class="cursor-pointer">
          <img src="../../assets/images/layout-1.png">
        </label>
        <input
          id="layout-1"
          v-model="currentState.layout"
          class="btn-radio mt-8"
          type="radio"
          name="layout"
          :value="1"
        >
      </div>
      <div class="text-center">
        <label for="layout-2" class="cursor-pointer">
          <img src="../../assets/images/layout-2.png">
        </label>
        <input
          id="layout-2"
          v-model="currentState.layout"
          class="btn-radio mt-8"
          type="radio"
          name="layout"
          :value="2"
        >
      </div>
      <div class="text-center">
        <label for="layout-3" class="cursor-pointer">
          <img src="../../assets/images/layout-3.png">
        </label>
        <input
          id="layout-3"
          v-model="currentState.layout"
          class="btn-radio mt-8"
          type="radio"
          name="layout"
          :value="3"
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

    <Modal
      v-show="modalVisible"
      @close="modalVisible = false"
    >
      <div class="leading text-primary-100 mt-1 px-2">
        Recover your information?
      </div>
      <div class="paragraph text-blacks-100 mt-6 px-2">
        Would you like to recover your information?
      </div>
      <div class="flex flex-col gap-6 px-2 pt-6 pb-2 sm:flex-row">
        <button
          class="btn-secondary px-8 flex-shrink-0"
          @click="createNew"
        >
          <span class="subleading">
            No, thanks.
          </span>
        </button>
        <button
          class="btn-primary px-8 flex-shrink-0"
          @click="redirectToEdit"
        >
          <span class="subleading">
            Yes, please.
          </span>
        </button>
      </div>
    </Modal>
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
