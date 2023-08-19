<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { DEFAULT_TEMPLATE, HIDDEN_INFORMATION } from '~/constants'
import Editor from '~/components/Editor.vue'

const user = useUserStore()
const { summary } = storeToRefs(user)

const toggleShow = () => {
  user.$patch((state) => {
    state.summary.isShow = !state.summary.isShow
  })
}

function focusIn(index) {
  user.$patch((state) => {
    state.summary.isEditing = true
  })
}

function focusOut(index) {
  user.$patch((state) => {
    state.summary.isEditing = false
  })
}

</script>

<template>
  <div class="flex justify-between items-center">
    <div class="flex items-center gap-2">
      <span class="i-custom:summary icon-32" />
      <span class="leading text-blacks-100">Summary</span>
    </div>
    <ToggleSwitch
      :checked="summary.isShow"
      @click="toggleShow"
    />
  </div>
  <div class="flex-grow flex flex-col pr-2 -mr-3 overflow-y-auto custom-scrollbar last-child-pb-4">
    <p v-if="!summary.isShow" class="paragraph text-blacks-40">
      {{ HIDDEN_INFORMATION }}
    </p>
    <p v-else class="paragraph text-blacks-70">
      Let people get to know you quickly by giving them a brief description of yourself and what your characteristics are.
    </p>
    <div
      @focusin="() =>focusIn(index)"
      @focusout="() => focusOut(index)"
    >
      <h3 class="subleading text-blacks-100 invisible">
        Summary
      </h3>
      <div
        class="rounded-xl mt-3 px-4 py-6 flex flex-col gap-6"
        :class="[(summary.isShow ? 'bg-primary-10': 'bg-blacks-10')]"
      >
        <div>
          <label class="block note text-blacks-70">Hashtag 1</label>
          <Editor
            v-model="summary.hashtags[0]"
            class-name="mt-1"
            :enable="summary.isShow"
            :placeholder="DEFAULT_TEMPLATE.summary.hashtags[0]"
            :is-single-line="true"
          />
        </div>
        <div>
          <label class="block note text-blacks-70">Hashtag 2</label>
          <Editor
            v-model="summary.hashtags[1]"
            class-name="mt-1"
            :enable="summary.isShow"
            :placeholder="DEFAULT_TEMPLATE.summary.hashtags[1]"
            :is-single-line="true"
          />
        </div>
        <div>
          <label class="block note text-blacks-70">Hashtag 3</label>
          <Editor
            v-model="summary.hashtags[2]"
            class-name="mt-1"
            :enable="summary.isShow"
            :placeholder="DEFAULT_TEMPLATE.summary.hashtags[2]"
            :is-single-line="true"
          />
        </div>
        <div>
          <label class="block note text-blacks-70">Summary</label>
          <Editor
            v-model="summary.paragraph"
            class-name="mt-1"
            :enable="summary.isShow"
            :placeholder="DEFAULT_TEMPLATE.summary.paragraph"
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
