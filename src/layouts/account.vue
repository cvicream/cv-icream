<template>
  <main class="h-full">
    <Header />
    <div class="flex flex-col items-center overflow-auto custom-scrollbar h-[calc(100%-56px)]">
      <router-view />
      <div class="flex flex-col gap-[12px] items-center my-[100px]">
        <span class="i-origin:logo-cvicream w-[140px] h-[37px]" />
        <span class="typrgraphy text-blacks-40">
          Copyright ©2024 CV Icream
        </span>
      </div>
    </div>
  </main>
</template>
