<script setup lang="ts">
import { onMounted } from 'vue'
import { jsPDF as JsPDF } from 'jspdf'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

const router = useRouter()
const user = useUserStore()
const { about, summary } = storeToRefs(user)

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
  const cvPreview = document.getElementById('cv-preview')
  const downloadPreviewContainer = document.getElementById('download-preview-container')
  const downloadPreview = document.getElementById('download-preview')

  if (cvPreview && downloadPreviewContainer && downloadPreview) {
    const maxWidth = cvPreview.clientWidth
    const maxHeight = cvPreview.clientHeight
    const width = downloadPreviewContainer.clientWidth
    const scale = width / maxWidth

    downloadPreviewContainer.style.height = `${maxHeight * scale}px`
    downloadPreview.style.transform = `scale(${scale})`
    downloadPreview.style['transform-origin'] = 'top left'
  }
}

function downloadPDF() {
  const doc = new JsPDF({
    orientation: 'p',
    unit: 'pt',
    format: 'a4',
    putOnlyUsedFonts: true,
  })
  const element = document.getElementById('cv-preview')
  if (element) {
    doc.html(element, {
      callback(doc) {
        doc.save(`${about.value.jobTitle} - ${about.value.name}.pdf`)
      },
    })
  }
}
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="flex items-center gap-2 pt-4">
      <span class="i-custom:download icon-32" />
      <span class="leading text-blacks-100">Download My CV</span>
    </h2>
    <button class="w-6 h-6 self-start" @click="router.back()">
      <span class="i-custom:cancel icon-24" />
    </button>
  </div>
  <div class="flex flex-col gap-6 pr-2 -mr-3 overflow-y-scroll custom-scrollbar">
    <div>
      <div
        class="rounded-xl px-4 py-6 flex flex-col gap-6"
        :class="[(summary.isShow ? 'bg-primary-10': 'bg-blacks-10')]"
      >
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
            <div id="download-preview" class="w-[595px] min-w-[595px] h-[842px] min-h-[842px] overflow-hidden border-1 border-blacks-70 rounded-xl">
              <CVPreview id="cv-download-preview" />
            </div>
          </div>
        </div>
      </div>
      <button
        class="w-full rounded-xl text-white inline-flex justify-center items-center gap-2 py-3 mt-6 bg-primary-100 border-1 border-transparent transition duration-300 ease-out hover:border-primary-20"
        @click="downloadPDF"
      >
        <span class="i-custom:download w-6 h-6" />
        <span class="subleading">Download</span>
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: edit
</route>
