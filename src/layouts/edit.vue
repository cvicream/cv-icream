<template>
  <main h-full>
    <Header is-edit="true" />
    <div sm:flex sm:flex-row class="content sm:h-[calc(100%-81px)] sm:relative">
      <div class="w-full px-45 py-16 bg-white relative sm:w-[calc(100%-390px)] sm:flex sm:border sm:border-t-0 border-blacks-20">
        <CVPreview />
        <div class="flex justify-center absolute bottom-50px left-0 right-0">
          <Toolbar />
        </div>
      </div>
      <Sidebar />
    </div>
  </main>
</template>
