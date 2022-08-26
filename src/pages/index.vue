<script setup lang="ts">
import { computed, ref } from 'vue'
import templateImageDesigner from '~/assets/images/template-designer.png'
import templateImageDeveloper from '~/assets/images/template-developer.png'
import templateImageProductManager from '~/assets/images/template-product-manager.png'
const { t } = useI18n()
const router = useRouter()

const templates = [
  { label: 'Designer', value: 'designer', image: templateImageDesigner },
  { label: 'Developer', value: 'developer', image: templateImageDeveloper },
  { label: 'Product Manager', value: 'productManager', image: templateImageProductManager },
]
const members = [
  {
    name: 'Pei-Shan Yu',
    title: 'UI Designer',
    linkedIn: 'https://www.linkedin.com/in/pei-shan-yu-281812153/',
    email: 'sunshanillustration@gmail.com',
    color: '#FEF4F1',
  },
  {
    name: 'Amber Hsieh',
    title: 'UX Designer',
    linkedIn: 'https://www.linkedin.com/in/amber-hsieh-159a1b115/',
    email: 'yuyouhsieh@gmail.com',
    color: '#FFF7E8',
  },
  {
    name: 'Ryan Hsieh',
    title: 'Full-Stack Developer',
    linkedIn: 'https://www.linkedin.com/in/ryanhsiehtw/',
    email: 'chengyu0827@gmail.com',
    color: '#EDF6F7',
  },
  {
    name: 'Yin-Hsuan Wu',
    title: 'Front-End Developer',
    linkedIn: 'https://www.linkedin.com/in/yin-hsuan-wu-6090b1b7/',
    email: 'yinwu0025@gmail.com',
    color: '#EDF2EB',
  },
  {
    name: 'Yu-Ting Lai',
    title: 'Front-End Developer',
    linkedIn: 'https://www.linkedin.com/in/yu-ting-lai-73a768185/',
    email: 'yutingboom@gmail.com',
    color: '#F1F0F4',
  },
]

const currentTemplate = ref('designer')
const templateImage = computed(() => {
  const template = templates.find(t => t.value === currentTemplate.value)
  return template?.image
})

function start() {
  router.push('/landing')
}

function onTemplateChange(template) {
  currentTemplate.value = template
}
</script>

<template>
  <div>
    <header class="h-[56px] leading-56px text-center bg-white flex justify-between items-center px-6 py-3">
      <a href="/">
        <img class="h-8" src="../assets/images/logo.svg" alt="logo">
      </a>
    </header>
    <div class="border-b border-b-blacks-20" />

    <section class="px-15 py-30 flex justify-center gap-[110px]">
      <div class="flex flex-col gap-6">
        <h1 class="heading1 text-blacks-100">
          Hello! Welcome to CV Icream.
        </h1>
        <p class="leading text-blacks-70">
          A better and more efficient online tool to help you build an eye-catching CV. Let’s make CV building as enjoyable as having ice cream on Sunday afternoon : )
        </p>
        <button
          class="btn-primary max-w-[294px]"
          @click="start"
        >
          <span class="i-custom:about w-6 h-6" />
          <span class="subleading vertical-text-top ml-2">
            {{ t('home.button.start_cv') }}
          </span>
        </button>
      </div>
      <div class="">
        <img src="../assets/images/imac-orange.png" alt="iMac">
      </div>
    </section>

    <section class="px-15 py-30 bg-blacks-10">
      <h1 class="heading1 text-blacks-100 text-center">
        Create Your CV in an Easy 4 Steps.
      </h1>
      <div class="flex mt-30">
        <div />
        <div class="flex flex-col gap-8">
          <div class="flex">
            <div class="w-8 h-8 p-[10px] mt-[6px] bg-primary-20 rounded-full">
              <span class="step-point w-3 h-3 block bg-primary-100 rounded-full" />
            </div>
            <div class="ml-8">
              <h2 class="heading2 text-blacks-100">
                Step1: Choose Your Template
              </h2>
              <p class="paragraph text-blacks-70 mt-3">
                Choose the best fit for you from various layouts and templates.
              </p>
            </div>
          </div>
          <div class="flex">
            <div class="w-8 h-8 p-[10px] mt-[6px] bg-primary-20 rounded-full">
              <span class="step-point w-3 h-3 block bg-primary-100 rounded-full" />
            </div>
            <div class="ml-8">
              <h2 class="heading2 text-blacks-100">
                Step2: Fill in Your Details
              </h2>
              <p class="paragraph text-blacks-70 mt-3">
                Fill in your personal details and working experiences to create your unique CV.
              </p>
            </div>
          </div>
          <div class="flex">
            <div class="w-8 h-8 p-[10px] mt-[6px] bg-primary-20 rounded-full">
              <span class="step-point w-3 h-3 block bg-primary-100 rounded-full" />
            </div>
            <div class="ml-8">
              <h2 class="heading2 text-blacks-100">
                Step3: Style Your CV
              </h2>
              <p class="paragraph text-blacks-70 mt-3">
                Style your CV with various font family and colour selection to give it personal touch.
              </p>
            </div>
          </div>
          <div class="flex">
            <div class="w-8 h-8 p-[10px] mt-[6px] bg-primary-20 rounded-full">
              <span class="w-3 h-3 block bg-primary-100 rounded-full" />
            </div>
            <div class="ml-8">
              <h2 class="heading2 text-blacks-100">
                Step4: Download it!
              </h2>
              <p class="paragraph text-blacks-70 mt-3">
                Export your CV as a PDF with optimised file and best size.
              </p>
            </div>
          </div>
        </div>
        <div>
          <img src="../assets/images/step1.png" alt="step">
        </div>
        <div />
      </div>
    </section>

    <section class="px-15 py-30">
      <h1 class="heading1 text-blacks-100 text-center">
        Various Templates for You to Play
      </h1>
      <p class="leading text-blacks-100 text-center mt-4">
        We provide various templates with different professional contents for you to explore and choose the perfect match for you.
      </p>
      <div class="flex justify-center mt-25">
        <button
          v-for="template in templates"
          :key="template.value"
          class="heading2 tex t-blacks-100 flex-1 py-6 border-b-2 border-blacks-20 transition duration-500 hover:bg-primary-10"
          :class="{ 'border-b-4 border-primary-100': currentTemplate === template.value }"
          @click="onTemplateChange(template.value)"
        >
          {{ template.label }}
        </button>
      </div>
      <div class="mt-16 px-25">
        <img :src="templateImage" alt="template">
      </div>
    </section>

    <section class="px-15 py-30 bg-blacks-10">
      <h1 class="heading1 text-blacks-100 text-center">
        Meet Our Team
      </h1>
      <div class="mt-30 flex gap-8">
        <div class="p-6 bg-primary-10 rounded-[24px]">
          <img src="../assets/images/team1.png" alt="team">
        </div>
        <div class="flex flex-col gap-5">
          <div
            v-for="member in members"
            :key="member.email"
            class="px-8 py-5 rounded-[24px]"
            :style="{ 'background-color': member.color }"
          >
            <div class="flex justify-between items-center">
              <span class="leading text-blacks-100">{{ member.name }}</span>
              <div class="flex gap-3">
                <a :href="member.linkedIn" target="_blank" class="p-[6px] bg-white rounded-full hover:bg-primary-10">
                  <span class="i-custom:linkedin w-6 h-6 text-blacks-70" />
                </a>
                <a :href="`mailto:${member.email}`" class="p-[6px] bg-white rounded-full hover:bg-primary-10">
                  <span class="i-custom:email w-6 h-6 text-blacks-70" />
                </a>
              </div>
            </div>
            <p class="subleading text-blacks-70 mt-2">
              {{ member.title }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <footer class="px-15 py-30">
      <div class="p-16 bg-primary-10 rounded-[32px]">
        <img class="h-16" src="../assets/images/logo.svg" alt="logo">
        <h2 class="heading2 text-primary-100 mt-6">
          Start Build Your CV Today !
        </h2>
        <p class="text-blacks-40 mt-16">
          Copyright ©2022 CV Icream
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.step-point {
  position: relative;
}
.step-point::before {
  position: absolute;
  content: '';
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  height: 100px;
  border-left-width: 4px;
  border-style: dashed;
  @apply border-primary-40;
}
.step-point::after {
  position: absolute;
  content: '';
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  height: 40px;
  border-left-width: 4px;
  border-style: solid;
  @apply border-primary-100;
}
</style>
