<template>
  <main class="h-full">
    <Header />
    <div class="sm:border-t border-blacks-20" />
    <div class="h-[calc(100%-81px)] sm:flex sm:flex-row">
      <Toolbar class="sm:w-24" />
      <div class="sm:border-l border-blacks-20" />
      <CVPreview class="text-center sm:flex-1" />
      <div class="sm:border-l border-blacks-20" />
      <Sidebar>
        <router-view />
      </Sidebar>
    </div>
  </main>
</template>
