<template>
  <div class="flex justify-between items-center">
    <h2 class="flex items-center">
      <span class="i-custom:summary w-8 h-8 text-blacks-70" />
      <span class="font-normal text-xl text-blacks-100 leading-6 ml-2">Summary</span>
    </h2>
    <ToggleSwitch checked />
  </div>
  <div>
    <h3 class="font-normal text-lg text-blacks-100 leading-[1.375rem] mt-7">
      Summary
    </h3>
    <form class="bg-primary-10 rounded-xl mt-3 px-4 py-6 flex flex-col gap-6">
      <div>
        <label
          class="font-normal text-sm text-blacks-70 leading-[1.125rem] block"
        >
          Hashtag 1
        </label>
        <input
          type="text"
          name="hashtag1"
          placeholder="# TeamPlayer"
          class="w-full bg-white rounded-xl outline-none font-normal text-base text-blacks-40 placeholder-blacks-40 leading-[1.375rem] block mt-1 px-4 py-3"
        >
      </div>
      <div>
        <label
          class="font-normal text-sm text-blacks-70 leading-[1.125rem] block"
        >
          Hashtag 2
        </label>
        <input
          type="text"
          name="hashtag2"
          placeholder="# SelfMotivated"
          class="w-full bg-white rounded-xl outline-none font-normal text-base text-blacks-40 placeholder-blacks-40 leading-[1.375rem] block mt-1 px-4 py-3"
        >
      </div>
      <div>
        <label
          class="font-normal text-sm text-blacks-70 leading-[1.125rem] block"
        >
          Hashtag 3
        </label>
        <input
          type="text"
          name="hashtag3"
          placeholder="# CanDoAttitude"
          class="w-full bg-white rounded-xl outline-none font-normal text-base text-blacks-40 placeholder-blacks-40 leading-[1.375rem] block mt-1 px-4 py-3"
        >
      </div>
      <div>
        <label
          class="font-normal text-sm text-blacks-70 leading-[1.125rem] block"
        >
          Summary
        </label>
        <textarea
          name="summary"
          rol="10"
          cols="50"
          class="w-full bg-white rounded-xl outline-none font-normal text-base text-blacks-40 placeholder-blacks-40 leading-[1.375rem] block mt-1 px-4 py-3"
        >As a 2yr experienced UI designer, I see myself as a self-motivated and passionate learner, who makes progress every single day. With a can-do attitude, I try my best to experience the whole process of user interface and experience design, from stakeholder and user interviews, UI mock-ups and specifications, to interactive prototypes. With my educational training from science background and visual storytelling, I believe I am a nice candidate with strong systemic thinking and enjoyable visual design ability, to be considered for your team. With getting inspired from talking to different people from diverse cultures and gathering designs from daily life, my strength is to be a good team player and be able to connect dots and build the connection from what I have learned and experienced from various fields.</textarea>
      </div>
    </form>
  </div>
</template>

<route lang="yaml">
meta:
  layout: edit
</route>
