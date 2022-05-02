<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

const user = useUserStore()
const { about } = storeToRefs(user)
</script>

<template>
  <h2 class="flex items-center gap-2">
    <span class="i-custom:about w-8 h-8 text-blacks-70" />
    <span class="leading text-blacks-100">ABOUT</span>
  </h2>
  <div>
    <h3 class="subleading text-blacks-100">
      About
    </h3>
    <form class="bg-primary-10 rounded-xl mt-3 px-4 py-6 flex flex-col gap-6">
      <div>
        <label class="note text-blacks-70">Name</label>
        <input
          v-model="about.name"
          type="text"
          name="name"
          placeholder="Your Name"
          class="form-input"
        >
      </div>
      <div>
        <label class="note text-blacks-70">Job Title</label>
        <input
          v-model="about.jobTitle"
          type="text"
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
