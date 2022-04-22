<template>
  <main h-full>
    <Header is-edit="true" />
    <div sm:flex sm:flex-row class="content">
      <!-- <Toolbar sm:w-24 /> -->
      <CVPreview text-center bg-white sm:flex-1 sm:border sm:border-t-0 border-gray-400 />
      <Sidebar sm:w-96 />
    </div>
    <router-view />
  </main>
</template>

<style scoped>
.content {
  height: calc(100% - 80px)
}
</style>
