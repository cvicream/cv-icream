<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { jsPDF as JsPDF } from 'jspdf'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'
import { getPreviousUrl, getStorage, setStatus, stripHtml } from '~/utils'
import { A4_WIDTH_PX } from '~/constants'
import arial from '~/assets/fonts/arial/arial-normal'
import georgia from '~/assets/fonts/georgia/georgia-normal'
import gillsans from '~/assets/fonts/gillsans/gillsans-normal'
import lato from '~/assets/fonts/lato/lato-normal'

const router = useRouter()
const user = useUserStore()
const { about } = storeToRefs(user)
const toolbar = useToolbarStore()
const { currentState } = storeToRefs(toolbar)

const loading = ref(false)
const feedbackVisible = ref(false)

function toggleFeedbackModal() {
  feedbackVisible.value = !feedbackVisible.value
}

onMounted(() => {
  const downloadPreviewContainer = document.getElementById('download-preview-container')
  if (downloadPreviewContainer) {
    const resizeObserver = new ResizeObserver(() => {
      resize()
    })

    resizeObserver.observe(downloadPreviewContainer)
  }
})

function resize() {
  const downloadPreviewContainer = document.getElementById('download-preview-container')
  const downloadPreview = document.getElementById('download-preview')

  if (downloadPreviewContainer && downloadPreview) {
    const maxWidth = A4_WIDTH_PX
    const width = downloadPreviewContainer.clientWidth
    const scale = width / maxWidth

    downloadPreviewContainer.style.height = `${downloadPreview.clientHeight * scale}px`
    downloadPreview.style.transform = `scale(${scale})`
    downloadPreview.style['transform-origin'] = 'top left'
  }
}

function addFonts(doc) {
  // TODO: better way to add new font
  if (currentState.value.fontFamily === 'font-arial') {
    doc.addFileToVFS('../../assets/fonts/arial/arial-normal.ttf', arial)
    doc.addFont('../../assets/fonts/arial/arial-normal.ttf', 'Arial', 'normal')
    doc.setFont('Arial')
  }
  else if (currentState.value.fontFamily === 'font-georgia') {
    doc.addFileToVFS('../../assets/fonts/georgia/georgia-normal.ttf', georgia)
    doc.addFont('../../assets/fonts/georgia/georgia-normal.ttf', 'Georgia', 'normal')
    doc.setFont('Georgia')
  }
  else if (currentState.value.fontFamily === 'font-gill-sans') {
    doc.addFileToVFS('../../assets/fonts/gillsans/gillsans-normal.ttf', gillsans)
    doc.addFont('../../assets/fonts/gillsans/gillsans-normal.ttf', 'Gillsans', 'normal')
    doc.setFont('Gillsans')
  }
  else if (currentState.value.fontFamily === 'font-helvetica') {
    doc.setFont('Helvetica')
  }
  else if (currentState.value.fontFamily === 'font-times-new-roman') {
    doc.setFont('Times-Roman')
  }
  else if (currentState.value.fontFamily === 'font-lato') {
    doc.addFileToVFS('../../assets/fonts/lato/lato-normal.ttf', lato)
    doc.addFont('../../assets/fonts/lato/lato-normal.ttf', 'Lato', 'normal')
    doc.setFont('Lato')
  }
}

function downloadPDF() {
  const doc = new JsPDF({
    orientation: 'p',
    unit: 'pt',
    format: 'a4',
    putOnlyUsedFonts: true,
  })
  addFonts(doc)
  const element = document.getElementById('cv-preview')
  if (element) {
    doc.html(element, {
      callback(doc) {
        doc.save(`${stripHtml(about.value.jobTitle)} - ${stripHtml(about.value.name)}.pdf`)
        toggleFeedbackModal()
      },
    })
  }
}

function print() {
  // document.title = `${stripHtml(about.value.jobTitle)} - ${stripHtml(about.value.name)}.pdf`
  window.print()
  toggleFeedbackModal()
}

async function generatePdf() {
  loading.value = true

  const fileName = `${stripHtml(about.value.jobTitle)} - ${stripHtml(about.value.name)}`
  const storage = getStorage()
  const data = {
    fileName,
    data: storage,
  }
  try {
    const res = await axios({
      method: 'POST',
      url: 'https://us-central1-dodosoya-develop.cloudfunctions.net/generatePdf',
      data,
      responseType: 'blob',
    })
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${fileName}.pdf`)
    document.body.appendChild(link)
    link.click()
    toggleFeedbackModal()
  }
  catch (error) {
    console.error(error)
  }

  loading.value = false
}

function back() {
  const previousUrl = getPreviousUrl()
  if (previousUrl) {
    setStatus({ previousUrl: '' })
    const targetUrl = new URL(previousUrl)
    if (targetUrl.origin === window.location.origin)
      router.push(targetUrl.pathname)
    else
      window.location.href = previousUrl
  }
  else { router.push('/edit/about') }
}
</script>

<template>
  <div class="flex justify-between items-center">
    <div class="flex items-center gap-2 pt-4">
      <span class="i-custom:download icon-32" />
      <span class="leading text-blacks-100">Download My CV</span>
    </div>
    <button class="w-6 h-6 self-start" @click="back()">
      <span class="i-custom:cancel icon-24" />
    </button>
  </div>
  <div class="flex flex-col gap-6 pr-2 -mr-3 overflow-y-scroll custom-scrollbar">
    <div>
      <div class="rounded-xl px-4 py-6 flex flex-col gap-6 bg-primary-10">
        <div>
          <label class="block note text-blacks-70">File Type</label>
          <div class="flex items-center w-full h-[46px] bg-white rounded-xl px-4 py-3 mt-1">
            <span class="paragraph text-blacks-100">PDF</span>
          </div>
        </div>
        <div>
          <label class="block note text-blacks-70">Preview</label>
          <div id="download-preview-container" class="relative mt-1">
            <div
              id="download-preview"
              class="w-[210mm] min-w-[210mm] min-h-[297mm] overflow-hidden border-1 border-blacks-70 rounded-xl"
            >
              <CVPreview id="cv-download-preview" read-only />
            </div>
            <div
              class="absolute top-0 bottom-0 left-0 right-0 z-1"
              :class="loading ? 'visible' : 'invisible'"
            >
              <div
                class="absolute top-0 bottom-0 left-0 right-0 opacity-[0.2] transition"
                :class="loading ? 'bg-primary-100 opacity-[0.2]' : 'bg-transparent'"
              />
              <div
                class="absolute top-0 bottom-0 left-0 right-0  flex flex-col justify-center items-center"
                :class="loading ? 'text-blacks-100' : 'text-transparent'"
              >
                <span class="i-custom:download w-6 h-6 transition" />
                <p class="paragraph mt-2 transition">
                  Downloading...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        class="w-full h-[46px] text-white bg-primary-100 rounded-xl inline-flex justify-center items-center gap-2 py-3 mt-6 border-1 border-transparent transition hover:border-primary-20"
        :disabled="loading"
        @click="generatePdf"
      >
        <Loading v-if="loading" />
        <template v-else>
          <span class="i-custom:download w-6 h-6" />
          <span class="subleading">Download</span>
        </template>
      </button>
    </div>

    <FeedbackModal
      title="Are you happy with our service?"
      subtitle="Leave us a message to let us know whether you are happy with our service or anything we can improve : )"
      :visible="feedbackVisible"
      :toggle="toggleFeedbackModal"
    />
  </div>
</template>

<route lang="yaml">
meta:
  layout: edit
</route>
