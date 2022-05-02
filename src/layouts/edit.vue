<template>
  <main class="h-full">
    <Header />
    <div class="sm:border-t border-blacks-20" />
    <div class="sm:h-[calc(100%-81px)] sm:relative">
      <div class="w-full h-full sm:w-[calc(100%-390px)] sm:flex">
        <Toolbar class="sm:w-24" />
        <div class="sm:border-l border-blacks-20" />
        <CVPreview class="text-center sm:flex-1" />
      </div>
      <Sidebar />
    </div>
  </main>
</template>
