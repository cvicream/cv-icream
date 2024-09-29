<script setup lang="ts">
const props = defineProps <{
  label: string
  disabled?: boolean
}>()
const model = defineModel()

</script>

<template>
  <div class="flex-1">
    <label :for="label" class="block note text-blacks-70 mb-[4px]">{{ label }}</label>
    <input :id="label" v-model="model" :disabled="disabled" class="w-[100%] paragraph rounded-[12px]" :name="label" placeholder="edit me">
  </div>
</template>

<style lang="scss" scoped>
  input {
    padding: 12px 16px;
    &:disabled {
      background-color: white;
      color: #A7A7A7;
      cursor: not-allowed;
    }
  }
</style>
