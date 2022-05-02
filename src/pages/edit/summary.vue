<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

const user = useUserStore()
const { summary } = storeToRefs(user)

const toggleShow = () => {
  user.$patch((state) => {
    state.summary.isShow = !state.summary.isShow
  })
}
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="flex items-center gap-2">
      <span class="i-custom:summary w-8 h-8 text-blacks-70" />
      <span class="leading text-blacks-100">Summary</span>
    </h2>
    <ToggleSwitch
      :checked="summary.isShow"
      @click="toggleShow"
    />
  </div>
  <p v-show="!summary.isShow">
    The session is currently hidden on CV. Click the toggle if you would like to show it on CV.
  </p>
  <div>
    <h3 class="subleading text-blacks-100">
      Summary
    </h3>
    <form
      class="rounded-xl mt-3 px-4 py-6 flex flex-col gap-6"
      :class="[(summary.isShow ? 'bg-primary-10': 'bg-blacks-10')]"
    >
      <div>
        <label class="note text-blacks-70">Hashtag 1</label>
        <input
          v-model="summary.hashtags[0]"
          type="text"
          name="hashtag1"
          placeholder="#TeamPlayer"
          class="form-input"
          :disabled="!summary.isShow"
        >
      </div>
      <div>
        <label class="note text-blacks-70">Hashtag 2</label>
        <input
          v-model="summary.hashtags[1]"
          type="text"
          name="hashtag2"
          placeholder="#SelfMotivated"
          class="form-input"
          :disabled="!summary.isShow"
        >
      </div>
      <div>
        <label class="note text-blacks-70">Hashtag 3</label>
        <input
          v-model="summary.hashtags[2]"
          type="text"
          name="hashtag3"
          placeholder="#CanDoAttitude"
          class="form-input"
          :disabled="!summary.isShow"
        >
      </div>
      <div>
        <label class="note text-blacks-70">Summary</label>
        <textarea
          v-model="summary.paragraph"
          name="summary"
          class="form-textarea"
          :disabled="!summary.isShow"
        />
      </div>
    </form>
  </div>
</template>

<route lang="yaml">
meta:
  layout: edit
</route>
