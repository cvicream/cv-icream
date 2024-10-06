<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useCVStore } from '~/stores/cv'
import { formatDate, setStatus } from '~/utils'
import type { CV } from '~/types'

const props = defineProps({
  data: {
    required: true,
    type: Object as PropType<CV>,
  },
})

const router = useRouter()
const cv = useCVStore()
const isMoreActionOpen = ref<boolean>(false)
const moreActionRef = ref(null)
const deleteModalVisible = ref<boolean>(false)

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

const download = () => {
  // TODO: Implement
  closeMoreAction()
}

const edit = () => {
  setStatus({ id: props.data.id })
  router.push('/edit/about')
  closeMoreAction()
}

const duplicate = () => {
  // TODO: Implement
  closeMoreAction()
}

const rename = () => {
  // TODO: Implement
  closeMoreAction()
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
    class="w-[calc(100%*(1/4)-15px)] rounded-[20px] border-1 border-blacks-40 p-5 hover:bg-primary-10 hover:border-primary-100 transition duration-300 ease-out"
  >
    <ResponsiveCVPreview :id="`responsive-cv-preview-${data.id}`" read-only />
    <div class="mt-4">
      <div class="flex justify-between items-center">
        <div class="subleading text-blacks-100 mr-2 text-ellipsis whitespace-nowrap overflow-hidden">
          {{ data.title }}
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
