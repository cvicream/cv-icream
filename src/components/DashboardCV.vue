<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import axios from 'axios'
import { useCVStore } from '~/stores/cv'
import { formatDate, setStatus } from '~/utils'
import type { CV, CreateCV } from '~/types'
import { MAX_UNPAID_CV_NUM } from '~/constants'

const props = defineProps({
  data: {
    required: true,
    type: Object as PropType<CV>,
  },
})

const router = useRouter()
const cv = useCVStore()
const { cvs } = storeToRefs(cv)
const titleInput = ref<HTMLInputElement | null>(null)
const title = ref(props.data.title)
const isMoreActionOpen = ref<boolean>(false)
const moreActionRef = ref(null)
const deleteModalVisible = ref<boolean>(false)

const isMaxNum = computed(() => Array.isArray(cvs.value) && cvs.value.length >= MAX_UNPAID_CV_NUM)

onClickOutside(moreActionRef, (event) => {
  isMoreActionOpen.value = false
})

const toggleMoreAction = () => {
  isMoreActionOpen.value = !isMoreActionOpen.value
}

const closeMoreAction = () => {
  isMoreActionOpen.value = false
}

const toggleDeleteModal = () => {
  deleteModalVisible.value = !deleteModalVisible.value
}

const download = async() => {
  const fileName = props.data.title
  const data = {
    targetUrl: location.hostname === 'localhost' || location.hostname === '127.0.0.1' ? null : window.origin,
    fileName,
    data: JSON.parse(props.data.content),
  }

  const generatePdfUrl: string = import.meta.env.VITE_GENERATE_PDF_URL as string
  if (generatePdfUrl) {
    try {
      const res = await axios({
        method: 'POST',
        url: generatePdfUrl,
        data,
        responseType: 'blob',
      })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${fileName}.pdf`)
      document.body.appendChild(link)
      link.click()
      closeMoreAction()
    }
    catch (error) {
      console.error(error)
    }
  }
}

const edit = () => {
  setStatus({ id: props.data.id })
  router.push('/edit/about')
  closeMoreAction()
}

const duplicate = async() => {
  const newCV: CreateCV = {
    userId: props.data.userId,
    title: `Copy of ${props.data.title}`,
    description: props.data.description,
    content: props.data.content,
  }
  await cv.create(newCV)
  await cv.getAll()
  closeMoreAction()
}

const rename = () => {
  titleInput.value?.focus()
  closeMoreAction()
}

const saveTitle = async() => {
  if (!title.value || title.value === props.data.title)
    return

  await cv.update({ ...props.data, title: title.value })
  await cv.getAll()
}

const prepareDelete = () => {
  toggleDeleteModal()
  closeMoreAction()
}

const deleteCV = async() => {
  await cv.delete(props.data.id)
  await cv.getAll()
}
</script>

<template>
  <div
    class="sm:w-[calc(100%*(1/4)-15px)] rounded-[20px] border-1 border-blacks-40 p-5 hover:bg-primary-10 hover:border-primary-100 transition duration-300 ease-out group"
    @dblclick="edit"
  >
    <ResponsiveCVPreview :id="`responsive-cv-preview-${data.id}`" read-only class="hidden sm:block mb-4" />
    <div>
      <div class="flex justify-between items-center">
        <div class="flex-1 mr-2">
          <input
            ref="titleInput"
            v-model="title"
            type="text"
            class="w-full h-full subleading text-blacks-100 group-hover:bg-primary-10 text-ellipsis whitespace-nowrap overflow-hidden outline-none rounded-none"
            @keyup.enter="saveTitle"
            @focusout="saveTitle"
          >
        </div>
        <div class="relative">
          <button class="w-6 h-6" @click="toggleMoreAction">
            <span class="i-custom:dots w-6 h-6 text-blacks-40 hover:text-blacks-70" />
          </button>
          <div
            v-show="isMoreActionOpen"
            ref="moreActionRef"
            class="absolute top-12 right-0 mt-2 w-[175px] bg-white border border-blacks-100 rounded-xl shadow-custom z-10 flex flex-col overflow-hidden"
          >
            <button
              class="flex items-center px-4 py-3 hover:bg-primary-10"
              @click="download"
            >
              <span class="paragraph text-blacks-100 ml-2">Download</span>
            </button>
            <button
              class="flex items-center px-4 py-3 hover:bg-primary-10"
              @click="edit"
            >
              <span class="paragraph text-blacks-100 ml-2">Edit</span>
            </button>
            <button
              v-if="!isMaxNum"
              class="flex items-center px-4 py-3 hover:bg-primary-10"
              @click="duplicate"
            >
              <span class="paragraph text-blacks-100 ml-2">Duplicate</span>
            </button>
            <button
              class="flex items-center px-4 py-3 hover:bg-primary-10"
              @click="rename"
            >
              <span class="paragraph text-blacks-100 ml-2">Rename</span>
            </button>
            <button
              class="flex items-center px-4 py-3 hover:bg-primary-10"
              @click="prepareDelete"
            >
              <span class="paragraph text-warning ml-2">Delete</span>
            </button>
          </div>
        </div>
      </div>
      <div class="note text-blacks-70 mt-1">
        Edited at {{ formatDate(data.updatedAt) }}
      </div>
    </div>

    <DeleteCVModal
      :visible="deleteModalVisible"
      :toggle="toggleDeleteModal"
      @yes="deleteCV"
    />
  </div>
</template>
