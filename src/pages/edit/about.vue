<template>
  <h2 class="flex items-center">
    <span class="i-custom:about w-8 h-8 text-blacks-70" />
    <span class="font-normal text-xl text-blacks-100 leading-6 ml-2">About</span>
  </h2>
  <h3 class="font-normal text-lg text-blacks-100 leading-[1.375rem] mt-7">
    About
  </h3>
  <form class="bg-primary-10 rounded-xl mt-3 px-4 py-6 flex flex-col gap-6">
    <div>
      <label
        class="font-normal text-sm text-blacks-70 leading-[1.125rem] block"
      >
        Name
      </label>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        class="w-full bg-white rounded-xl outline-none font-normal text-base text-blacks-40 placeholder-blacks-40 leading-[1.375rem] block mt-1 px-4 py-3"
      >
    </div>
    <div>
      <label
        class="font-normal text-sm text-blacks-70 leading-[1.125rem] block"
      >
        Job Title
      </label>
      <input
        type="text"
        name="title"
        placeholder="Job Title"
        class="w-full bg-white rounded-xl outline-none font-normal text-base text-blacks-40 placeholder-blacks-40 leading-[1.375rem] block mt-1 px-4 py-3"
      >
    </div>
  </form>
</template>

<route lang="yaml">
meta:
  layout: edit
</route>
