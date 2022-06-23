<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

const user = useUserStore()
const { about } = storeToRefs(user)

function focusIn(index) {
  user.$patch((state) => {
    state.about.isEditing = true
  })
}

function focusOut(index) {
  user.$patch((state) => {
    state.about.isEditing = false
  })
}

</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="flex items-center gap-2">
      <span class="i-custom:about icon-32" />
      <span class="leading text-blacks-100">ABOUT</span>
    </h2>
  </div>
  <div
    @focusin="() => focusIn(index)"
    @focusout="() => focusOut(index)"
  >
    <h3 class="subleading text-blacks-100">
      Summary
    </h3>
    <form class="bg-primary-10 rounded-xl mt-3 px-4 py-6 flex flex-col gap-6">
      <div>
        <label class="note text-blacks-70">Name</label>
        <input
          v-model="about.name"
          type="search"
          name="name"
          placeholder="Your Name"
          class="form-input"
        >
      </div>
      <div>
        <label class="note text-blacks-70">Job Title</label>
        <input
          v-model="about.jobTitle"
          type="search"
          name="title"
          placeholder="Job Title"
          class="form-input"
        >
      </div>
    </form>
  </div>
</template>

<route lang="yaml">
meta:
  layout: edit
</route>
