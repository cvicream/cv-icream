<template>
  <main h-full>
    <Header is-edit="true" />
    <div sm:flex sm:flex-row class="content">
      <div class="text-center bg-white sm:flex-1 sm:border sm:border-t-0 border-blacks-20">
        <CVPreview />
        <div class="fixed items-center bottom-1/4 z-1">
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
