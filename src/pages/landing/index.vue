<script setup lang="ts">
import { useUserStore } from '~/stores/user'

import { useToolbarStore } from '~/stores/toolbar'
import { getJsonUpload } from '~/utils'

const user = useUserStore()
const toolbar = useToolbarStore()
const { t } = useI18n()
const uploadFiletype = ref(false)
const router = useRouter()

async function upload() {
  await importJsonFile()
  redirectToEdit()
}

async function importJsonFile() {
  uploadFiletype.value = false
  const jsonFile = await getJsonUpload()
  const fileType = jsonFile.slice(-3)
  if (fileType !== '}}}')
    uploadFiletype.value = true
  const obj = JSON.parse(jsonFile as string)
  Object.keys(obj).forEach((key) => {
    if (key === 'user') {
      const subObj = obj[key]
      Object.keys(subObj).forEach((subKey) => {
        user.$patch((state) => {
          state[subKey] = subObj[subKey]
        })
      })
      user.updateTimestamp()
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

const onNext = () => {
  router.push('/landing/template')
}

</script>

<template>
  <div class="h-full flex flex-col justify-center  items-center gap-16">
    <h1 class="heading1-mobile sm:heading1 text-center">
      {{ t('initial.title') }}
    </h1>
    <div class="border-black-70 flex flex-col gap-16 lg:flex-row">
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

  <Modal
    v-show="uploadFiletype"
    title="Upload Your CV Draft"
    subtitle="Please upload the file with the format in ‘.cvicream’."
    @close="uploadFiletype = false"
  >
    <div class="flex justify-between gap-6 mt-6 sm:flex-row">
      <button
        class="btn-secondary px-12 flex-shrink-0"
        @click="uploadFiletype = false"
      >
        <span class="subleading">
          Cancel
        </span>
      </button>
      <button
        class="btn-primary px-12 flex-shrink-0"
        @click="upload"
      >
        <span class="subleading">
          Got it!
        </span>
      </button>
    </div>
  </Modal>
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
