<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'
import { onUnmounted } from 'vue'

const props = defineProps<{
  isEdit: boolean
  isActionActive: boolean
}>()

const isActionActive = false;

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
const { currentState, } = storeToRefs(toolbar)
const {
  layout, fontFamily, fontSizeScale, primaryColour, secondaryColour,
} = currentState.value

function exportJsonFile() {
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



function cvAction() {
 const isActionActive = true;
 console.log("cv" + isActionActive);

}

function closeCvAction() {
  const isActionActive = false;
  console.log("closeCvAction" + isActionActive);
}

onMounted(() => {
  window.removeEventListener('click', closeCvAction)
})

</script>

<template>
  <header class="h-[80px] leading-80px text-center bg-white border-b border-b-blacks-20 flex justify-between px-8 py-4">
    <div class="flex gap-8">
      <span  class="btn-icon-32">
      <span class="i-origin:logo icon-32" />
      </span>
      <button class="btn-icon-32">
        <span class="i-custom:idea icon-32" />
      </button>
      <button class="btn-icon-32">
        <span class="i-custom:feedback icon-32" />
      </button>
    </div>
    <div v-if="isEdit" class="flex gap-8">
      <button class="btn-icon-32 text-blacks-70" @click="cvAction">
        <span class="i-custom:download icon-32"></span>
      </button>
      
      <div  v-if="isActionActive" class="w-[232px] h-[145px] bg-white overflow-auto border rounded-[20px] px-4 py-3 z-1 absolute right-2 top-[84px]">
        <button 
          class="w-full h-[46px] text-left text-base absolute left-0 top-0 px-4 py-3 hover:bg-primary-10"
          @click="router.push('/edit/download')"
        >Download</button>
          
        <button 
          class="w-full h-[46px] text-left text-base absolute left-0 top-[46px] px-4 py-3 hover:bg-primary-10"
          @click="exportJsonFile"
        >Save</button>

        <button 
          class="w-full h-[46px] text-left text-base absolute left-0 top-[96px] px-4 py-3 hover:bg-primary-10"
          @click="importJsonFile"
        >Import</button>
        
      </div>
    </div>
      
  </header>
</template>
