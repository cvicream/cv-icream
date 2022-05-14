<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

const user = useUserStore()
const { about, summary, experience } = storeToRefs(user)
</script>

<template>
  <div class="w-[210mm] h-[297mm] flex-shrink-0 p-6 mx-auto shadow-custom invisible sm:visible">
    <div class="p-2 flex items-baseline gap-4">
      <span class="font-normal text-primary-100 text-4xl leading-[41px]">{{ about.name }}</span>
      <span class="font-normal text-blacks-100 text-sm leading-4">{{ about.jobTitle }}</span>
    </div>
    <div class="flex">
      <div class="flex flex-col gap-4 w-[75%]">
        <section v-show="summary.isShow" class="p-2 flex flex-col gap-2">
          <div class="flex gap-4">
            <span
              v-for="item in summary.hashtags.filter(tag => !!tag)"
              :key="item"
              class="hashtag text-primary-100 bg-primary-10"
            >
              {{ item }}
            </span>
          </div>
          <p class="paragraph-default text-blacks-70">
            {{ summary.paragraph }}
          </p>
        </section>
        <section>
          <div class="px-2 py-1 subtitle-default text-primary-100">
            {{ experience.name }}
          </div>
          <div
            v-for="(item, index) in experience.list"
            :key="index"
            class="p-2 flex flex-col gap-1"
          >
            <span class="title-default text-blacks-100">
              {{ item.title }}
            </span>
            <div class="flex justify-between">
              <span class="subtitle-default text-blacks-40">
                {{ item.subtitle1 }}
              </span>
              <span class="subtitle-default text-blacks-40">
                {{ item.subtitle2 }}
              </span>
            </div>
            <p class="paragraph-default text-blacks-70">
              {{ item.paragraph }}
            </p>
          </div>
        </section>
      </div>
      <div class="px-2 w-[25%]">
        <section class="pb-2">
          <div class="py-1 subtitle-default text-primary-100">
            SKILL
          </div>
          <div class="pt-2 pb-1 subtitle-default text-blacks-40">
            Tool
          </div>
          <div class="paragraph-default  text-blacks-70">
            Webflow
          </div>

          <div class="pt-1">
            <div class="py-2 subtitle-default text-blacks-40">
              Language
              <div class=" paragraph-default text-blacks-70">
                English (fluent)
              </div>
            </div>
          </div>
        </section>
        <section>
          <div class="py-1">
            <div class="subtitle-default text-primary-100">
              EDUCATION
            </div>
          </div>
          <div class="py-2 pb-1">
            <div class="title-default text-blacks-100">
              MA Illustration and Book Arts
            </div>
            <span class="subtitle-default text-blacks-40">
              Anglia Ruskin University
            </span>

            <p class="paragraph-default  text-blacks-70">
              Graduated/ Jan 2021
              Cambridge, UK
            </p>
          </div>
        </section>
        <section>
          <div class="pt-5 py-1 subtitle-default text-primary-100">
            CONTACT
          </div>
          <div class="">
            <div class="pt-2 pb-1 subtitle-default text-blacks-40">
              Personal
            </div>
            <div class="mt-px paragraph-default text-blacks-70 break-words">
              <p>+4475 9100 8940</p>
              <p>sunshanillustration@gmail.com</p>
              56 Blackhorse Drive,
              Old Stratford, Milton Keynes,
              MK19 6FH, UK
            </div>
          </div>
          <div class="pt-2" />
          <div class="pt-2 pb-1 subtitle-default text-blacks-40">
            Social
          </div>
          <div class="paragraph-default flex flex-col text-blacks-70">
            <a href="https://www.linkedin.com/feed/">
              LinkedIn
            </a>
            <a href="https://www.behance.net/">
              Behance
            </a>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
