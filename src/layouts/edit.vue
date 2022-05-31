<template>
  <main h-screen>
    <Header :is-edit="true" />
    <div class="relative sm:flex sm:flex-row h-[calc(100%-160px)] overflow-hidden sm:h-[calc(100%-80px)]">
      <Sidebar />
      <div class="px-4 py-11 my-[20px] overflow-auto custom-scrollbar sm:w-[calc(100%-394px)] sm:flex">
        <div class="w-[595px] min-w-[595px] h-[842px] h-[842px] mx-auto">
          <CVPreview />
        </div>
        <div class="flex justify-center fixed bottom-0 left-0 right-0 z-2 sm:bottom-8 sm:right-[390px] sm:z-0">
          <Toolbar />
        </div>
      </div>
    </div>
  </main>
</template>
