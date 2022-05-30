<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

const user = useUserStore()
const {
  layout,
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

const props = defineProps<{
  isEdit: boolean
}>()

const router = useRouter()

function exportJsonFile() {
  const jsonData = {
    layout: layout.value,
    template: template.value,
    about: about.value,
    summary: summary.value,
    experience: experience.value,
    project: project.value,
    skill: skill.value,
    education: education.value,
    certificate: certificate.value,
    contact: contact.value,
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
  const obj = JSON.parse(jsonFile)
  Object.keys(obj).forEach((key) => {
    user.$patch((state) => {
      state[key] = obj[key]
    })
  })
}

function getJsonUpload() {
  return new Promise((resolve) => {
    const inputFileElement = document.createElement('input')
    inputFileElement.setAttribute('type', 'file')
    inputFileElement.setAttribute('multiple', 'false')
    inputFileElement.setAttribute('accept', '.cvicream')

    inputFileElement.addEventListener('change', (event) => {
      const { files } = event.target
      if (!files) return

      resolve(files[0].text())
    }, false)
    inputFileElement.click()
  })
}

</script>

<template>
  <header class="h-[80px] leading-80px text-center bg-white border-b border-b-blacks-20 flex justify-between px-8 py-4">
    <div class="flex gap-8">
      <span class="btn-header bg-primary-10" />
      <button
        class="btn-header"
      >
        <span class="i-custom:idea icon-header" />
      </button>
    </div>
    <div v-if="isEdit" class="flex gap-8">
      <button class="btn-header" @click="exportJsonFile">
        <span class="i-custom:save icon-header" />
      </button>
      <button class="btn-header" @click="importJsonFile">
        <span class="i-custom:load icon-header" />
      </button>
      <button
        class="btn-header bg-primary-100"
        @click="router.push('/edit/download')"
      >
        <span class="i-custom:download icon-header text-white" />
      </button>
    </div>
  </header>
</template>
