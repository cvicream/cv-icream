<script>
export default {
  props: {
    isEdit: Boolean,
  },
}
</script>

<template>
  <header class="h-20 leading-80px text-center bg-white border-b border-b-gray-400 flex justify-between px-8 py-4">
    <div class="flex gap-8">
      <span class="inline-block w-12 h-12 bg-primary-10 rounded-full cursor-pointer" />
      <button
        class="flex inline-block w-12 h-12 p-2 bg-white rounded-full shadow-custom"
      >
        <span class="i-custom:idea inline-block w-8 h-8 text-blacks-70" />
      </button>
    </div>
    <div v-if="isEdit" class="flex gap-8">
      <button class="flex inline-block w-12 h-12 p-2 bg-white rounded-full shadow-custom">
        <span class="i-custom:save inline-block w-8 h-8 text-blacks-70" />
      </button>
      <button class="flex inline-block w-12 h-12 p-2 bg-white rounded-full shadow-custom">
        <span class="i-custom:load inline-block w-8 h-8 text-blacks-70" />
      </button>
      <button class="flex inline-block w-12 h-12 p-2 bg-primary-100 rounded-full shadow-custom">
        <span class="i-custom:download inline-block w-8 h-8 text-white" />
      </button>
    </div>
  </header>
</template>
