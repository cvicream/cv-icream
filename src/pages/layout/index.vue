<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'
import { isEditing } from '~/utils'

const user = useUserStore()
const toolbar = useToolbarStore()
const { t } = useI18n()
const router = useRouter()

const selectedLayout = ref(toolbar.currentState.layout || 1)

const modalVisible = ref(isEditing())

function loadStorage() {
  router.push('/edit/about')
}

function createNew() {
  user.$reset()
  toolbar.$reset()
  modalVisible.value = false
}

function onNext() {
  toolbar.$patch((state) => {
    state.currentState.layout = selectedLayout.value
  })
  router.push('/template')
}
</script>

<template>
  <div class="h-full flex flex-col items-center gap-16">
    <h1 class="heading1-mobile sm:heading1 text-center">
      {{ t('layout.title') }}
    </h1>
    <div class="flex flex-col gap-16 sm:flex-row">
      <div class="text-center">
        <label for="layout-1" class="cursor-pointer">
          <img src="../../assets/images/layout-1.png">
        </label>
        <input
          id="layout-1"
          v-model="selectedLayout"
          class="btn-radio mt-8"
          type="radio"
          name="layout"
          :value="1"
        >
      </div>
      <div class="text-center">
        <label for="layout-2" class="cursor-pointer">
          <img src="../../assets/images/layout-2.png">
        </label>
        <input
          id="layout-2"
          v-model="selectedLayout"
          class="btn-radio mt-8"
          type="radio"
          name="layout"
          :value="2"
        >
      </div>
      <div class="text-center">
        <label for="layout-3" class="cursor-pointer">
          <img src="../../assets/images/layout-3.png">
        </label>
        <input
          id="layout-3"
          v-model="selectedLayout"
          class="btn-radio mt-8"
          type="radio"
          name="layout"
          :value="3"
        >
      </div>
    </div>
    <div class="flex flex-col gap-8 sm:flex-row fix-padding-bottom">
      <button class="w-[294px] btn-secondary">
        <span class="i-custom:add w-6 h-6 text-blacks-70" />
        <span class="subleading vertical-middle ml-2">
          {{ t('layout.button.upload_cv') }}
        </span>
      </button>
      <button
        class="w-[294px] btn-primary"
        @click="onNext"
      >
        <span class="i-custom:collapse w-6 h-6" />
        <span class="subleading vertical-middle ml-2">
          {{ t('layout.button.next_step') }}
        </span>
      </button>
    </div>

    <Modal
      v-show="modalVisible"
      @close="modalVisible = false"
    >
      <div class="leading text-primary-100 mt-1 px-2">
        Recover your information?
      </div>
      <div class="paragraph text-blacks-100 mt-6 px-2">
        Would you like to recover your information?
      </div>
      <div class="flex flex-col gap-6 px-2 pt-6 pb-2 sm:flex-row">
        <button
          class="btn-secondary px-8 flex-shrink-0"
          @click="createNew"
        >
          <span class="subleading">
            No, thanks.
          </span>
        </button>
        <button
          class="btn-primary px-8 flex-shrink-0"
          @click="loadStorage"
        >
          <span class="subleading">
            Yes, please.
          </span>
        </button>
      </div>
    </Modal>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

<style scoped>
.fix-padding-bottom > *:last-child {
  margin-bottom: 4rem;
}
</style>
