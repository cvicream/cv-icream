<template>
  <main h-full>
    <Header is-edit="true" />
    <div sm:flex sm:flex-row class="content">
      <div class="text-center bg-white sm:flex-1 sm:border sm:border-t-0 border-blacks-20 relative">
        <CVPreview />
        <div class="flex justify-center absolute bottom-50px left-0 right-0">
          <Toolbar />
        </div>
      </div>
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
