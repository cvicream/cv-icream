<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { HIDDEN_INFORMATION } from '~/constants'
import Editor from '~/components/Editor.vue'

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
      <span class="i-custom:summary icon-32" />
      <span class="leading text-blacks-100">Summary</span>
    </h2>
    <ToggleSwitch
      :checked="summary.isShow"
      @click="toggleShow"
    />
  </div>
  <div class="flex flex-col gap-6 pr-2 -mr-3 overflow-y-scroll custom-scrollbar">
    <p v-if="!summary.isShow" class="paragraph text-blacks-70">
      {{ HIDDEN_INFORMATION }}
    </p>
    <div>
      <h3 class="subleading text-blacks-100">
        Summary
      </h3>
      <div
        class="rounded-xl mt-3 px-4 py-6 flex flex-col gap-6"
        :class="[(summary.isShow ? 'bg-primary-10': 'bg-blacks-10')]"
      >
        <div>
          <label class="note text-blacks-70">Hashtag 1</label>
          <Editor
            v-model="summary.hashtags[0]"
            class-name="h-[46px]"
            :enable="summary.isShow"
            placeholder="#TeamPlayer"
            :is-single-line="true"
          />
        </div>
        <div>
          <label class="note text-blacks-70">Hashtag 2</label>
          <Editor
            v-model="summary.hashtags[1]"
            class-name="h-[46px]"
            :enable="summary.isShow"
            placeholder="#SelfMotivated"
            :is-single-line="true"
          />
        </div>
        <div>
          <label class="note text-blacks-70">Hashtag 3</label>
          <Editor
            v-model="summary.hashtags[2]"
            class-name="h-[46px]"
            :enable="summary.isShow"
            placeholder="#CanDoAttitude"
            :is-single-line="true"
          />
        </div>
        <div>
          <label class="note text-blacks-70">Summary</label>
          <Editor
            v-model="summary.paragraph"
            class-name="h-[130px]"
            :enable="summary.isShow"
            placeholder="summary"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: edit
</route>
