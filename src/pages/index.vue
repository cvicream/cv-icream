<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()

function start() {
  router.push('/layout')
}
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <h1 class="heading1-mobile sm:heading1 text-center">
      {{ t('home.title') }}
    </h1>
    <div class="mt-16">
      <button
        class="btn-primary"
        @click="start"
      >
        <span class="i-custom:about w-6 h-6" />
        <span class="subleading vertical-middle ml-2">
          {{ t('home.button.start_cv') }}
        </span>
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
