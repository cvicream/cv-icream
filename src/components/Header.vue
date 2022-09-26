<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'
import { getJsonUpload, isMobileDevice, setStatus, stripHtml } from '~/utils'

const props = defineProps<{
  isEdit?: boolean
}>()

const isActionActive = ref(false)
const feedbackVisible = ref(false)
const upload = ref(false)

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
  social,
} = storeToRefs(user)
const { currentState } = storeToRefs(toolbar)

const isSafari = () => ('safari' in window)

onMounted(() => {
  if (isSafari())
    window.addEventListener('click', onWindowClick, false)
})

onUnmounted(() => {
  if (isSafari())
    window.removeEventListener('click', onWindowClick)
})

function onWindowClick() {
  if (isActionActive.value)
    closeAction()
}

function toggleFeedbackModal() {
  feedbackVisible.value = !feedbackVisible.value
}

function redirectToDownload() {
  toolbar.$patch((state) => {
    state.isCVPreviewVisible = false
  })
  setStatus({ previousUrl: window.location.href })
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
      social: social.value,
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
  upload.value = false
  const jsonFile = await getJsonUpload()
  const fileType = jsonFile.slice(-3)
  if (fileType !== '}}}')
    upload.value = true
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
      <a class="btn-icon-32" href="https://cvicream.webflow.io/">
        <span class="i-origin:logo w-6 h-6" />
      </a>
      <button class="btn-icon-32">
        <span class="i-custom:idea w-6 h-6" />
      </button>
      <button class="btn-icon-32" @click="toggleFeedbackModal">
        <span class="i-custom:feedback w-6 h-6" />
      </button>
    </div>
    <div v-if="isEdit" @focusout="onFocusOut">
      <button
        class="w-14 h-8 rounded flex justify-center items-center gap-1 hover:bg-primary-10"
        @click.stop="toggle"
      >
        <span class="i-custom:download w-6 h-6 text-blacks-70" />
        <span class="w-[1px] h-4 bg-blacks-20" />
        <span
          class="i-custom:arrow-down w-4 h-4 text-blacks-70 transition"
          :class="isActionActive ? 'rotate-180' : 'rotate-0'"
        />
      </button>

      <div
        v-if="isActionActive"
        class="absolute right-2 top-[64px] z-3"
      >
        <div
          class="bg-white rounded-xl overflow-hidden"
          :class="isSafari() || isMobileDevice() ? 'w-[262px] border-1 border-blacks-100' : 'w-[260px] outline outline-1 outline-blacks-100'"
        >
          <button
            class="w-full h-[45px] flex justify-start items-center px-4 py-3 hover:bg-primary-10"
            :class="isSafari() || isMobileDevice() ? 'rounded-t-[11px]' : 'rounded-t-xl'"
            @mousedown="redirectToDownload"
          >
            <span class="paragraph text-blacks-100">Download as PDF</span>
          </button>
          <button
            class="w-full h-[46px] flex justify-start items-center px-4 py-3 hover:bg-primary-10"
            @mousedown="exportJsonFile"
          >
            <span class="paragraph text-blacks-100">Save as Draft</span>
          </button>
          <button
            class="w-full h-[45px] flex justify-start items-center px-4 py-3 hover:bg-primary-10"
            :class="isSafari() || isMobileDevice() ? 'rounded-b-[11px]' : 'rounded-b-xl'"
            @mousedown="importJsonFile"
          >
            <span class="paragraph text-blacks-100">Upload CV Draft</span>
          </button>
        </div>
      </div>
    </div>
  </header>
  <div class="border-b border-b-blacks-20" />

  <FeedbackModal
    title="Face a Problem or Need Help?"
    subtitle="Leave us a message. We will get back to you as soon as possible : )"
    :visible="feedbackVisible"
    :toggle="toggleFeedbackModal"
  />

  <Modal
    v-show="upload"
    title="Upload Your CV Draft"
    subtitle="Please upload the filename extension with ‘.cvicream’."
    @close="upload = false"
  >
    <div class="flex flex-col gap-6 mt-6 sm:flex-row">
      <button
        class="btn-secondary px-8 flex-shrink-0"
        @click="upload = false"
      >
        <span class="subleading">
          Cancel
        </span>
      </button>
      <button
        class="btn-primary px-8 flex-shrink-0"
        @click="importJsonFile"
      >
        <span class="subleading">
          Got it!
        </span>
      </button>
    </div>
  </Modal>
</template>
