<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'
import { getJsonUpload, stripHtml, validateEmail } from '~/utils'

const props = defineProps<{
  isEdit: boolean
}>()

const isActionActive = ref(false)
const feedbackModalVisible = ref(false)
const content = ref('')
const name = ref('')
const email = ref('')
const feedbackEnable = computed(() => {
  return content.value && name.value && email.value && validateEmail(email.value)
})

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

function toggleFeedback() {
  feedbackModalVisible.value = !feedbackModalVisible.value
}

function resetFeedback() {
  name.value = ''
  email.value = ''
  content.value = ''
}

async function sendFeedback() {
  const url = 'https://script.google.com/macros/s/AKfycbxq_a3TUrbsvWHxASqFqouHQ-12J2QQbYjvyumY4-DCc2d_Kb07pBAe_-NCuQ9t878Z/exec'
  await fetch(`${url}?${new URLSearchParams({
    name: name.value,
    email: email.value,
    content: content.value,
  })}`)
  feedbackModalVisible.value = false
  resetFeedback()
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
      <button class="btn-icon-32" @click="toggleFeedback">
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

  <Modal
    v-show="feedbackModalVisible"
    @close="feedbackModalVisible = false"
  >
    <div class="px-2 pb-4">
      <div class="leading text-primary-100 mt-1">
        Face a Problem or Need Help?
      </div>
      <div class="paragraph text-blacks-70">
        Leave us a message. We will get back to you as soon as possible : )
      </div>
      <textarea
        v-model="content"
        placeholder="Share your feedback here..."
        class="form-textarea bg-primary-10 custom-scrollbar mt-8"
      />
      <div class="mt-6">
        <label class="note text-blacks-70">Your Contact Info</label>
        <input
          v-model="name"
          type="search"
          placeholder="Name"
          class="form-input bg-primary-10 mt-1"
        >
        <input
          v-model="email"
          type="search"
          placeholder="Email"
          class="form-input bg-primary-10 mt-3"
        >
      </div>
      <div class="flex flex-col gap-6 mt-8 sm:flex-row sm:justify-between">
        <button
          class="btn-secondary px-8 flex-shrink-0"
          @click="feedbackModalVisible = false"
        >
          <span class="subleading">
            Next Time
          </span>
        </button>
        <button
          class="btn-primary px-8 flex-grow flex-shrink-0"
          :class="{ 'text-blacks-40 bg-blacks-10': !feedbackEnable}"
          :disabled="!feedbackEnable"
          @click="sendFeedback"
        >
          <span class="subleading">
            Send
          </span>
        </button>
      </div>
    </div>
  </Modal>
</template>
