<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { A4_WIDTH_PX } from '~/constants'

const props = defineProps({
  id: {
    required: true,
    type: String,
    default: 'responsive-cv-preview',
  },
})

const containerId = computed(() => `${props.id}-container`)
const previewId = computed(() => `${props.id}-preview`)
const cvPreviewId = computed(() => `${props.id}-cv-preview`)

onMounted(() => {
  const downloadPreviewContainer = document.getElementById(containerId.value)
  if (downloadPreviewContainer) {
    const resizeObserver = new ResizeObserver(() => {
      resize()
    })

    resizeObserver.observe(downloadPreviewContainer)
  }
})

function resize() {
  const downloadPreviewContainer = document.getElementById(containerId.value)
  const downloadPreview = document.getElementById(previewId.value)

  if (downloadPreviewContainer && downloadPreview) {
    const maxWidth = A4_WIDTH_PX
    const width = downloadPreviewContainer.clientWidth
    const scale = width / maxWidth

    downloadPreviewContainer.style.height = `${downloadPreview.clientHeight * scale}px`
    downloadPreview.style.transform = `scale(${scale})`
    downloadPreview.style['transform-origin'] = 'top left'
  }
}
</script>

<template>
  <div :id="containerId">
    <div
      :id="previewId"
      class="w-[210mm] min-w-[210mm] min-h-[297mm] overflow-hidden rounded-xl shadow-custom"
    >
      <CVPreview :id="cvPreviewId" read-only />
    </div>
  </div>
</template>
