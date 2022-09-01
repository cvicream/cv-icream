<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { jsPDF as JsPDF } from 'jspdf'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'
import { getPreviousUrl, setStatus, stripHtml } from '~/utils'
import arial from '~/assets/fonts/arial/arial-normal'
import georgia from '~/assets/fonts/georgia/georgia-normal'
import gillsans from '~/assets/fonts/gillsans/gillsans-normal'
import lato from '~/assets/fonts/lato/lato-normal'

const router = useRouter()
const user = useUserStore()
const { about } = storeToRefs(user)
const toolbar = useToolbarStore()
const { currentState } = storeToRefs(toolbar)

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
    const maxWidth = 794 // A4 width
    const maxHeight = 1123 // A4 height
    const width = downloadPreviewContainer.clientWidth
    const scale = width / maxWidth

    downloadPreviewContainer.style.height = `${maxHeight * scale}px`
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
        setStatus({ isSaved: false })
      },
    })
  }
}

function print() {
  // document.title = `${stripHtml(about.value.jobTitle)} - ${stripHtml(about.value.name)}.pdf`
  window.print()
  setStatus({ isSaved: false })
  toggleFeedbackModal()
}

function back() {
  const previousUrl = getPreviousUrl()
  if (previousUrl) {
    setStatus({ previousUrl: '' })
    window.location.href = previousUrl
  }
  else { router.push('/edit/about') }
}
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="flex items-center gap-2 pt-4">
      <span class="i-custom:download icon-32" />
      <span class="leading text-blacks-100">Download My CV</span>
    </h2>
    <button class="w-6 h-6 self-start" @click="back()">
      <span class="i-custom:cancel icon-24" />
    </button>
  </div>
  <div class="flex flex-col gap-6 pr-2 -mr-3 overflow-y-scroll custom-scrollbar">
    <div>
      <div class="rounded-xl px-4 py-6 flex flex-col gap-6 bg-primary-10">
        <div>
          <label class="note text-blacks-70">File Type</label>
          <div value="pdf" class="block form-input">
            <option value="pdf">
              PDF
            </option>
          </div>
        </div>
        <div>
          <label class="note text-blacks-70">Preview</label>
          <div id="download-preview-container">
            <div id="download-preview" class="w-[210mm] min-w-[210mm] h-[297mm] min-h-[297mm] overflow-hidden border-1 border-blacks-70 rounded-xl">
              <CVPreview id="cv-download-preview" />
            </div>
          </div>
        </div>
      </div>
      <button
        class="w-full rounded-xl text-white inline-flex justify-center items-center gap-2 py-3 mt-6 bg-primary-100 border-1 border-transparent transition duration-300 ease-out hover:border-primary-20"
        @click="print"
      >
        <span class="i-custom:download w-6 h-6" />
        <span class="subleading">Download</span>
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
