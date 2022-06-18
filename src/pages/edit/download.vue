<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as htmlToImage from 'html-to-image'
import { toPng } from 'html-to-image'
import { jsPDF as JsPDF } from 'jspdf'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

const router = useRouter()
const user = useUserStore()
const { about, summary } = storeToRefs(user)

const toggleShow = () => {
  user.$patch((state) => {
    state.summary.isShow = !state.summary.isShow
  })
}

const imgSrc = ref(null)

onMounted(() => {
  htmlToImage.toPng(document.getElementById('cv-preview'))
    .then((dataUrl) => {
      imgSrc.value = dataUrl
    })
    .catch((error) => {
      console.error('Oops, something went wrong!', error)
    })
})

const downloadPDF = () => {
  const doc = new JsPDF({
    orientation: 'p',
    unit: 'pt',
    format: 'a4',
    putOnlyUsedFonts: true,
  })
  doc.html(document.getElementById('cv-preview'), {
    callback(doc) {
      doc.save(`${about.value.jobTitle} - ${about.value.name}.pdf`)
    },
  })
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
      <form
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
          <img
            v-if="imgSrc"
            :src="imgSrc"
            class="w-full h-[370px] bg-white border border-blacks-70 rounded-xl"
          >
        </div>
      </form>
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
