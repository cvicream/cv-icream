<template>
  <main class="h-screen">
    <Header />
    <div class="h-[calc(100%-80px)] p-16 flex flex-col justify-center overflow-auto custom-scrollbar">
      <router-view />
    </div>
  </main>
</template>
