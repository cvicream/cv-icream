<template>
  <main h-full>
    <Header />
    <div class="content">
      <router-view />
    </div>
  </main>
</template>

<style scoped>
.content {
  height: calc(100% - 80px)
}
</style>
