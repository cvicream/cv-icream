<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

const user = useUserStore()
const { about, summary, experience, project, skill, education, certificate, contact } = storeToRefs(user)
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
        <section v-if="experience.isShow">
          <div class="px-2 py-1 subtitle-default text-primary-100">
            {{ experience.name }}
          </div>
          <div v-for="(item, index) in experience.list" :key="index">
            <div
              v-if="item.isShow"
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
          </div>
        </section>
        <section v-if="project.isShow">
          <div class="px-2 py-1 subtitle-default text-primary-100">
            {{ project.name }}
          </div>
          <div v-for="(item, index) in project.list" :key="index">
            <div
              v-if="item.isShow"
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
          </div>
        </section>
      </div>
      <div class="px-2 w-[25%]">
        <section
          v-if="skill.isShow"
          class="pb-2"
        >
          <div class="py-1 subtitle-default text-primary-100">
            {{ skill.name }}
          </div>
          <div v-for="(item, index) in skill.list" :key="index">
            <div
              v-if="item.isShow"
              class="pt-2 pb-1 subtitle-default text-blacks-40"
            >
              {{ item.subtitle1 }}
            </div>
            <div
              v-if="item.isShow"
              class="paragraph-default  text-blacks-70"
            >
              <span style="white-space: pre-wrap;">
                {{ item.paragraph }}
              </span>
            </div>
          </div>

          <!--<div class="pt-1">
            <div class="py-2 subtitle-default text-blacks-40">
              Language
              <div class=" paragraph-default text-blacks-70">
                English (fluent)
              </div>
            </div>
          </div>-->
        </section>
        <section>
          <div class="py-1">
            <div
              v-if="certificate.isShow"
              class="subtitle-default text-primary-100"
            >
              {{ certificate.name }}
            </div>
          </div>
          <div v-for="(item, index) in certificate.list" :key="index">
            <div
              v-if="item.isShow"
              class="py-2 pb-1"
            >
              <div class="title-default text-blacks-100">
                {{ item.title }}
              </div>
              <span class="subtitle-default text-blacks-40">
                {{ item.subtitle1 }}
              </span>

              <div class="paragraph-default  text-blacks-70">
                <span style="white-space: pre-wrap;">
                  {{ item.paragraph }}
                </span>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div class="py-1">
            <div
              v-if="education.isShow"
              class="subtitle-default text-primary-100"
            >
              {{ education.name }}
            </div>
          </div>
          <div v-for="(item, index) in education.list" :key="index">
            <div
              v-if="item.isShow"
              class="py-2 pb-1"
            >
              <div class="title-default text-blacks-100">
                {{ item.title }}
              </div>
              <span class="subtitle-default text-blacks-40">
                {{ item.subtitle1 }}
              </span>
              <div class="paragraph-default  text-blacks-70">
                <span style="white-space: pre-wrap;">
                  {{ item.paragraph }}
                </span>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div
            v-if="contact.isShow"
            class="pt-5 py-1 subtitle-default text-primary-100"
          >
            {{ contact.name }}
          </div>
          <div v-for="(item, index) in contact.list" :key="index">
            <div
              v-if="item.isShow"
              class=""
            >
              <div class="pt-2 pb-1 subtitle-default text-blacks-40">
                {{ item.subtitle1 }}
              </div>
              <div class="mt-px paragraph-default text-blacks-70 break-words">
                <p>  {{ item.paragraph }}</p>
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
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
