<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()

</script>

<template>
  <div class="h-full flex flex-col items-center gap-10 mt-16">
    <h1 class="font-normal text-6xl text-black text-center leading-[4.875rem]">
      {{ t('layout.title') }}
    </h1>
    <fieldset class="inline-flex">
      <div class="text-center p-6">
        <img src="../../assets/images/layout-1.png">
        <input id="layout-1" type="radio" name="layout" value="1">
        <label for="layout-1" />
      </div>
      <div class="text-center p-6">
        <img src="../../assets/images/layout-2.png">
        <input id="layout-2" type="radio" name="layout" value="2">
        <label for="layout-2" />
      </div>
      <div class="text-center p-6">
        <img src="../../assets/images/layout-3.png">
        <input id="layout-3" type="radio" name="layout" value="3">
        <label for="layout-3" />
      </div>
    </fieldset>
    <div class="flex gap-10">
      <button
        h-12 border border-primary-100 rounded-xl text-white px-10 py-3
      >
        <span i-custom:add w-6 h-6 text-blacks-70 />
        <span class="font-normal text-lg text-blacks-100 leading-[1.375rem] vertical-middle ml-2">
          {{ t('layout.button.upload_cv') }}
        </span>
      </button>
      <button
        h-12 bg-primary-100 rounded-xl text-white px-10 py-3
        @click="router.push('template')"
      >
        <span i-custom:collapse w-6 h-6 />
        <span class="font-normal text-lg leading-[1.375rem] vertical-middle ml-2">
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
input[name="layout"] {
  accent-color: black;
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
}

input[type="radio"] {
    background-color: initial;
    cursor: default;
    appearance: auto;
    box-sizing: border-box;
    margin: 32px 0px 0px 0px;
}

</style>
