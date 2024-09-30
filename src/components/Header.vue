<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'
import { useNotificationStore } from '~/stores/notification'
import { getJsonUpload, isMobileDevice, isSafari, setStatus, stripHtml } from '~/utils'
import { DRAFT_FILE_TYPE } from '~/constants'

defineProps<{
  isEdit?: boolean
}>()

const isActionActive = ref(false)
const feedbackVisible = ref(false)
const paymentVisible = ref(false)
const contactVisible = ref(false)
const upload = ref(false)

const router = useRouter()

const auth = useAuthStore()
const { user: authUser, displayName } = storeToRefs(auth)
const user = useUserStore()
const toolbar = useToolbarStore()
const {
  template,
  splitIndex,
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
const { currentState, noteList } = storeToRefs(toolbar)
const notification = useNotificationStore()
const { notification: notificationRecord } = storeToRefs(notification)

const isDashboard = computed(() => {
  return router.currentRoute.value.name === 'dashboard'
})

onMounted(() => {
  window.addEventListener('click', closeAction, false)

  if (isSafari())
    window.addEventListener('click', onWindowClick, false)
})

onUnmounted(() => {
  window.removeEventListener('click', closeAction)

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

function toggleFeedbackNotification() {
  notification.set({ message: 'Your feedback has already been sent :)' })
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
  const currentStateData = Object.keys(currentState.value).reduce((acc, cur) => {
    acc[cur] = currentState.value[cur]
    return acc
  }, {})
  const jsonData = {
    toolbar: {
      currentState: currentStateData,
      noteList: noteList.value,
    },
    user: {
      template: template.value,
      splitIndex: splitIndex.value,
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
  const dataUri = `data:application/${DRAFT_FILE_TYPE};charset=utf-8,${encodeURIComponent(dataStr)}`

  const fileNames = ['CV']
  if (about.value.name) fileNames.push(stripHtml(about.value.name))
  if (about.value.jobTitle) fileNames.push(stripHtml(about.value.jobTitle))
  const exportFileDefaultName = `${fileNames.join('_')}.${DRAFT_FILE_TYPE}`

  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', exportFileDefaultName)
  linkElement.click()

  // push data to gtm
  window.dataLayer.push(
    {
      event: 'download-as-draft',
      layout: currentState.value.layout,
      colour: currentState.value.color,
      fontFamily: currentState.value.fontFamily,
      fontSize: currentState.value.fontSize,
    },
  )
  fbq('track', 'download-as-draft', {
    layout: currentState.value.layout,
    colour: currentState.value.color,
    fontFamily: currentState.value.fontFamily,
    fontSize: currentState.value.fontSize,
  })
}

async function importJsonFile() {
  closeAction()
  upload.value = false
  try {
    const json = await getJsonUpload()
    const obj = JSON.parse(json as string)
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
            state[subKey] = subObj[subKey]
          })
        })
      }
    })
  }
  catch (error) {
    upload.value = true
  }

  // push data to gtm
  window.dataLayer.push({
    event: 'open-cv-draft',
  })
  fbq('track', 'open-cv-draft')
}

function toggle() {
  isActionActive.value = !isActionActive.value
}

function closeAction() {
  isActionActive.value = false
}

function togglePaymentModal() {
  paymentVisible.value = !paymentVisible.value
}

function toggleContactModal() {
  contactVisible.value = !contactVisible.value
}

function deleteNotification() {
  notification.set(null)
}

function redirectToDashboard() {
  router.push('/dashboard')
  closeAction()
}

function redirectToAccount() {
  router.push('/profile')
  closeAction()
}

function logout() {
  auth.logout()
  router.push('/sign-in')
  closeAction()
}
</script>

<template>
  <header class="h-[56px] text-center bg-white flex justify-between items-center px-6 py-3">
    <div class="flex gap-3">
      <a class="btn-icon-32" href="https://cvicream.com">
        <span class="i-origin:logo w-6 h-6" />
      </a>
      <Tooltip
        placement="bottom"
        text="Blog"
      >
        <a class="btn-icon-32" href="https://medium.com/cv-icream" target="_blank">
          <span class="i-custom:idea w-6 h-6" />
        </a>
      </Tooltip>
      <Tooltip
        placement="bottom"
        text="Feedback"
      >
        <button class="btn-icon-32" @click="toggleFeedbackModal">
          <span class="i-custom:feedback w-6 h-6" />
        </button>
      </Tooltip>
      <Tooltip
        placement="bottom"
        text="Support us"
      >
        <button class="btn-icon-32" @click="togglePaymentModal">
          <span class="i-custom:payment w-6 h-6" />
        </button>
      </Tooltip>
    </div>

    <div class="leading-56px" @click="toggle">
      <button
        v-if="authUser && isDashboard"
        class="px-2 py-1 rounded-xl flex items-center gap-3 sm:hover:bg-primary-10"
        @click.stop="toggle"
      >
        <Avatar :src="authUser.avatar" />
        <span class="subleading text-blacks-100">{{ displayName }}</span>
      </button>

      <div v-else-if="isEdit" class="flex items-center">
        <Avatar :src="authUser ? authUser.avatar : ''" class="mr-4" />
        <button
          class="h-8 rounded flex justify-center items-center gap-1 sm:hover:bg-primary-10 outline-none"
          @click.stop="toggle"
        >
          <span class="i-custom:download w-6 h-6 text-blacks-70" />
          <span class="w-[1px] h-4 bg-blacks-20" />
          <span
            class="i-custom:arrow-down w-4 h-4 text-blacks-70 transition"
            :class="isActionActive ? 'rotate-180' : 'rotate-0'"
          />
        </button>
      </div>

      <div
        v-if="isActionActive"
        class="absolute right-6 top-[64px] z-3"
      >
        <div
          class="bg-white rounded-xl overflow-hidden"
          :class="isSafari() || isMobileDevice() ? 'w-[262px] border-1 border-blacks-100' : 'w-[260px] outline outline-1 outline-blacks-100'"
        >
          <template v-if="isDashboard">
            <button
              class="w-full h-[45px] flex justify-start items-center px-4 py-3 sm:hover:bg-primary-10"
              :class="isSafari() || isMobileDevice() ? 'rounded-t-[11px]' : 'rounded-t-xl'"
              @mousedown="redirectToDashboard"
            >
              <span class="paragraph text-blacks-100">Dashboard</span>
            </button>
            <button
              class="w-full h-[45px] flex justify-start items-center px-4 py-3 sm:hover:bg-primary-10"
              @mousedown="redirectToAccount"
            >
              <span class="paragraph text-blacks-100">Account</span>
            </button>
            <button
              class="w-full h-[45px] flex justify-start items-center px-4 py-3 sm:hover:bg-primary-10"
              @mousedown="toggleContactModal"
            >
              <span class="paragraph text-blacks-100">Contact Us</span>
            </button>
            <button
              class="w-full h-[45px] flex justify-start items-center px-4 py-3 sm:hover:bg-primary-10"
              :class="isSafari() || isMobileDevice() ? 'rounded-b-[11px]' : 'rounded-b-xl'"
              @mousedown="logout"
            >
              <span class="paragraph text-warning">Log out</span>
            </button>
          </template>
          <template v-else>
            <button
              class="w-full h-[45px] flex justify-start items-center px-4 py-3 sm:hover:bg-primary-10"
              :class="isSafari() || isMobileDevice() ? 'rounded-t-[11px]' : 'rounded-t-xl'"
              @mousedown="redirectToDownload"
            >
              <span class="paragraph text-blacks-100">Download as PDF</span>
            </button>
            <button
              id="download-as-draft"
              class="w-full h-[46px] flex justify-start items-center px-4 py-3 sm:hover:bg-primary-10"
              @mousedown="exportJsonFile"
            >
              <span class="paragraph text-blacks-100">Save draft to local device</span>
            </button>
            <button
              class="w-full h-[45px] flex justify-start items-center pl-4 py-3 sm:hover:bg-primary-10"
              :class="isSafari() || isMobileDevice() ? 'rounded-b-[11px]' : 'rounded-b-xl'"
              @mousedown="importJsonFile"
            >
              <span class="paragraph text-blacks-100">Import draft from local device</span>
            </button>
          </template>
        </div>
      </div>
    </div>
  </header>
  <div class="border-b border-b-blacks-20" />

  <FeedbackModal
    v-if="feedbackVisible"
    title="Have a Problem or Need Help?"
    subtitle="Leave us a message. We will get back to you as soon as possible : )"
    :toggle="toggleFeedbackModal"
    :notify="toggleFeedbackNotification"
  />

  <PaymentModal
    v-if="paymentVisible"
    :toggle="togglePaymentModal"
  />

  <ContactModal
    v-if="contactVisible"
    title="Have a Problem or Need Help?"
    subtitle="Leave us a message. We will get back to you as soon as possible : )"
    :toggle="toggleContactModal"
  />

  <Modal
    v-show="upload"
    title="Open your CV Draft"
    :subtitle="`Please upload the file with the format in ‘.${DRAFT_FILE_TYPE}’.`"
    @close="upload = false"
  >
    <div class="flex justify-between gap-6 mt-6 sm:flex-row">
      <button
        class="btn-secondary px-12 flex-shrink-0"
        @click="upload = false"
      >
        <span class="subleading">
          Cancel
        </span>
      </button>
      <button
        class="btn-primary px-12 flex-shrink-0"
        @click="importJsonFile"
      >
        <span class="subleading">
          Got it!
        </span>
      </button>
    </div>
  </Modal>

  <Notification
    v-if="notificationRecord"
    :message="notificationRecord.message"
    :duration="notificationRecord.duration"
    :visible="true"
    @close="deleteNotification"
  />
</template>
