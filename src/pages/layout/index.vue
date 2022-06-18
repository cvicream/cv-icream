<script setup lang="ts">
import { ref } from 'vue'
import { useToolbarStore } from '~/stores/toolbar'

const toolbar = useToolbarStore()
const { t } = useI18n()
const router = useRouter()

const selectedLayout = ref(toolbar.currentState.layout || 1)

const onNext = () => {
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
        <span class="subleading vertical-text-top ml-2">
          {{ t('layout.button.upload_cv') }}
        </span>
      </button>
      <button
        class="w-[294px] btn-primary"
        @click="onNext"
      >
        <span class="i-custom:collapse w-6 h-6" />
        <span class="subleading vertical-text-top ml-2">
          {{ t('layout.button.next_step') }}
        </span>
      </button>
    </div>
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
