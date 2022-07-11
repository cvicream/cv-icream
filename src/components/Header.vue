<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'
import { getJsonUpload, stripHtml } from '~/utils'

const props = defineProps<{
  isEdit: boolean
}>()

const isActionActive = ref(false)

const router = useRouter()

const user = useUserStore()
const toolbar = useToolbarStore()
const {
  template,
  about,
  summary,
  experience,
  project,
  skill,
  education,
  certificate,
  contact,
} = storeToRefs(user)
const { currentState } = storeToRefs(toolbar)

function redirectToDownload() {
  toolbar.$patch((state) => {
    state.isCVPreviewVisible = false
  })
  router.push('/edit/download')
  closeAction()
}

function exportJsonFile() {
  closeAction()
  const jsonData = {
    toolbar: {
      layout: currentState.value.layout,
      fontSize: currentState.value.fontSize,
      color: currentState.value.color,
      fontFamily: currentState.value.fontFamily,
    },
    user: {
      template: template.value,
      about: about.value,
      summary: summary.value,
      experience: experience.value,
      project: project.value,
      skill: skill.value,
      education: education.value,
      certificate: certificate.value,
      contact: contact.value,
    },
  }
  const dataStr = JSON.stringify(jsonData)
  const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

  const fileNames = ['CV']
  if (about.value.name) fileNames.push(stripHtml(about.value.name))
  if (about.value.jobTitle) fileNames.push(stripHtml(about.value.jobTitle))
  const exportFileDefaultName = `${fileNames.join('_')}.cvicream`

  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', exportFileDefaultName)
  linkElement.click()
}

async function importJsonFile() {
  closeAction()
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

function onFocusOut() {
  closeAction()
}

function toggle() {
  isActionActive.value = !isActionActive.value
}

function closeAction() {
  isActionActive.value = false
}

</script>

<template>
  <header class="h-[56px] leading-56px text-center bg-white flex justify-between items-center px-6 py-3">
    <div class="flex gap-3">
      <a class="btn-icon-32" href="/">
        <span class="i-origin:logo w-6 h-6" />
      </a>
      <button class="btn-icon-32">
        <span class="i-custom:idea w-6 h-6" />
      </button>
      <button class="btn-icon-32">
        <span class="i-custom:feedback w-6 h-6" />
      </button>
    </div>
    <div v-if="isEdit" @focusout="onFocusOut">
      <button class="btn-icon-32" @click="toggle">
        <span class="i-custom:download w-6 h-6" />
      </button>

      <div v-if="isActionActive" class="w-[230px] bg-white outline outline-1 outline-blacks-100 rounded z-3 absolute right-2 top-[64px]">
        <button
          class="w-full h-[46px] flex justify-start items-center px-4 py-3 rounded-t hover:bg-primary-10"
          @mousedown="redirectToDownload"
        >
          <span class="paragraph text-blacks-100">Download</span>
        </button>
        <button
          class="w-full h-[46px] flex justify-start items-center px-4 py-3 hover:bg-primary-10"
          @mousedown="exportJsonFile"
        >
          <span class="paragraph text-blacks-100">Save</span>
        </button>
        <button
          class="w-full h-[46px] flex justify-start items-center px-4 py-3 rounded-b hover:bg-primary-10"
          @mousedown="importJsonFile"
        >
          <span class="paragraph text-blacks-100">Import</span>
        </button>
      </div>
    </div>
  </header>
  <div class="border-b border-b-blacks-20" />
</template>
