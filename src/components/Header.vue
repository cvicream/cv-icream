<script setup lang="ts">
const props = defineProps<{
  isEdit: boolean
}>()
const router = useRouter()

</script>

<template>
  <header class="h-[80px] leading-80px text-center bg-white border-b border-b-blacks-20 flex justify-between px-8 py-4">
    <div class="flex gap-8">
      <span class="btn-header bg-primary-10" />
      <button
        class="btn-header"
      >
        <span class="i-custom:idea icon-header" />
      </button>
    </div>
    <div v-if="isEdit" class="flex gap-8">
      <button class="btn-header">
        <span class="i-custom:save icon-header" />
      </button>
      <button class="btn-header">
        <span class="i-custom:load icon-header" />
      </button>
      <button
        class="btn-header bg-primary-100"
        @click="router.push('/edit/download')"
      >
        <span class="i-custom:download icon-header text-white" />
      </button>
    </div>
  </header>
</template>
