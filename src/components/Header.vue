<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'
import { getJsonUpload } from '~/utils'

const props = defineProps<{
  isEdit: boolean
}>()

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

function exportJsonFile() {
  const jsonData = {
    toolbar: {
      layout: currentState.value.layout,
      fontFamily: currentState.value.fontFamily,
      fontScale: currentState.value.fontScale,
      primaryColour: currentState.value.primaryColour,
      secondaryColour: currentState.value.secondaryColour,
      shadowColour: currentState.value.shadowColour,
      titleScale: currentState.value.titleScale,
      subtitleScale: currentState.value.subtitleScale,
      paragraphScale: currentState.value.paragraphScale,
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
  if (about.value.name) fileNames.push(about.value.name)
  if (about.value.jobTitle) fileNames.push(about.value.jobTitle)
  const exportFileDefaultName = `${fileNames.join('_')}.cvicream`

  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', exportFileDefaultName)
  linkElement.click()
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

function download() {
  toolbar.$patch((state) => {
    state.isCVPreviewVisible = false
  })
  router.push('/edit/download')
}

</script>

<template>
  <header class="h-[80px] leading-80px text-center bg-white border-b border-b-blacks-20 flex justify-between px-8 py-4">
    <div class="flex gap-8">
      <span class="btn-header bg-primary-10" />
      <button class="btn-icon-48">
        <span class="i-custom:idea icon-32" />
      </button>
    </div>
    <div v-if="isEdit" class="flex gap-8">
      <button class="btn-icon-48" @click="exportJsonFile">
        <span class="i-custom:save icon-32" />
      </button>
      <button class="btn-icon-48" @click="importJsonFile">
        <span class="i-custom:load icon-32" />
      </button>
      <button class="btn-icon-48-fill" @click="download">
        <span class="i-custom:download icon-32-fill" />
      </button>
    </div>
  </header>
</template>
