<template>
  <main class="h-screen">
    <Header />
    <div class="h-[calc(100%-80px)] sm:p-16 p-4 flex flex-col justify-center overflow-auto custom-scrollbar">
      <router-view />
    </div>
  </main>
</template>
