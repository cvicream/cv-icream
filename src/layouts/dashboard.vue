<template>
  <main class="h-full">
    <Header />
    <div class="h-[calc(100%-57px)] custom-scrollbar bg-blacks-5 overflow-auto">
      <router-view />
      <div class="mt-8 p-25 text-center">
        <span class="i-origin:logo-background w-[140px] h-[38px]" />
        <p class="paragraph text-blacks-40 mt-3">
          {{ `Copyright ©${new Date().getFullYear()} CV Icream` }}
        </p>
      </div>
    </div>
  </main>
</template>
