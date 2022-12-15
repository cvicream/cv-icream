<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <main class="h-full sm:p-16 p-4 flex flex-col justify-center items-center text-primary-100 gap-20 bg-primary-10">
    <router-view />
    <div>
      <button class="btn-primary" @click="router.back()">
        {{ t('button.back') }}
      </button>
    </div>
  </main>
</template>
