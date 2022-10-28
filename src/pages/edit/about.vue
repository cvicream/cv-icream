<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { DEFAULT_TEMPLATE } from '~/constants'

const user = useUserStore()
const { about } = storeToRefs(user)

function focusIn() {
  user.$patch((state) => {
    state.about.isEditing = true
  })
}

function focusOut() {
  user.$patch((state) => {
    state.about.isEditing = false
  })
}

</script>

<template>
  <div class="flex justify-between items-center">
    <div class="flex items-center gap-2">
      <span class="i-custom:about icon-32" />
      <span class="leading text-blacks-100">ABOUT</span>
    </div>
  </div>
  <div
    class="flex-grow pr-2 -mr-3 overflow-y-auto custom-scrollbar last-child-pb-4"
    @focusin="() => focusIn()"
    @focusout="() => focusOut()"
  >
    <h3 class="subleading text-blacks-100">
      About
    </h3>
    <div class="bg-primary-10 rounded-xl mt-3 px-4 py-6 flex flex-col gap-6">
      <div>
        <label class="block note text-blacks-70">Name</label>
        <Editor
          v-model="about.name"
          class-name="h-[46px] mt-1"
          :placeholder="DEFAULT_TEMPLATE.about.name"
          :is-single-line="true"
        />
      </div>
      <div>
        <label class="block note text-blacks-70">Job Title</label>
        <Editor
          v-model="about.jobTitle"
          class-name="h-[46px] mt-1"
          :placeholder="DEFAULT_TEMPLATE.about.jobTitle"
          :is-single-line="true"
        />
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: edit
</route>
