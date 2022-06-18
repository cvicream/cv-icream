<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'

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
const {
  layout, fontFamily, fontSizeScale, primaryColour, secondaryColour,
} = currentState.value

function redirectToDownload() {
  router.push('/edit/download')
  closeAction()
}

function exportJsonFile() {
  closeAction()
  const jsonData = {
    layout,
    fontFamily,
    fontSizeScale,
    primaryColour,
    secondaryColour,
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
  closeAction()
  const jsonFile = await getJsonUpload()
  const obj = JSON.parse(jsonFile)
  Object.keys(obj).forEach((key) => {
    user.$patch((state) => {
      state[key] = obj[key]
    })
    toolbar.$patch((state) => {
      state.currentState[key] = obj[key]
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

function onFocusOut() {
  // TODO: better solution
  setTimeout(() => {
    closeAction()
  }, 150)
}

function toggle() {
  isActionActive.value = !isActionActive.value
}

function closeAction() {
  isActionActive.value = false
}

</script>

<template>
  <header class="h-[80px] leading-80px text-center bg-white border-b border-b-blacks-20 flex justify-between px-8 py-4">
    <div class="flex gap-8">
      <span class="btn-icon-32">
        <span class="i-origin:logo icon-32" />
      </span>
      <button class="btn-icon-32">
        <span class="i-custom:idea icon-32" />
      </button>
      <button class="btn-icon-32">
        <span class="i-custom:feedback icon-32" />
      </button>
    </div>
    <div v-if="isEdit" class="flex gap-8" @focusout="onFocusOut">
      <button class="btn-icon-32 text-blacks-70" @click="toggle">
        <span class="i-custom:download icon-32" />
      </button>

      <div v-if="isActionActive" class="w-[230px] bg-white outline outline-1 outline-blacks-100 rounded z-1 absolute right-2 top-[88px]">
        <button
          class="w-full h-[46px] flex justify-start items-center px-4 py-3 rounded-t hover:bg-primary-10"
          @click="redirectToDownload"
        >
          <span class="paragraph text-blacks-100">Download</span>
        </button>
        <button
          class="w-full h-[46px] flex justify-start items-center px-4 py-3 hover:bg-primary-10"
          @click="exportJsonFile"
        >
          <span class="paragraph text-blacks-100">Save</span>
        </button>
        <button
          class="w-full h-[46px] flex justify-start items-center px-4 py-3 rounded-b hover:bg-primary-10"
          @click="importJsonFile"
        >
          <span class="paragraph text-blacks-100">Import</span>
        </button>
      </div>
    </div>
  </header>
</template>
