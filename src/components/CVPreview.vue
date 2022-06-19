<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'

const user = useUserStore()
const { about, summary, experience, project, skill, education, certificate, contact } = storeToRefs(user)

const toolbar = useToolbarStore()
const { currentState } = storeToRefs(toolbar)

function getFontSizeClassName(id: string) {
  return {
    title: `title-${id}`,
    subtitle: `subtitle-${id}`,
    paragraph: `paragraph-${id}`,
  }
}
</script>

<template>
  <div class="title-default subtitle-default paragraph-default title-large subtitle-large paragraph-large" />
  <div
    id="cv-preview"
    class="w-full h-full flex-shrink-0 p-6 shadow-custom"
    :class="currentState.fontFamily"
  >
    <div
      class="p-2 flex items-baseline gap-4"
      :class="{ 'ml-[25%]': currentState.layout === 'layout-left' }"
    >
      <span
        v-if="about.name"
        class="font-normal text-primary-100 text-size-[36px] leading-[41px]"
      >
        {{ about.name }}
      </span>
      <span
        v-if="about.jobTitle"
        class="font-normal text-blacks-100 text-size-[14px] leading-[16px]"
      >
        {{ about.jobTitle }}
      </span>
    </div>
    <div :class="{ 'flex': currentState.layout !== 'layout-full' }">
      <div
        class="flex flex-col gap-4"
        :class="{ 'w-[75%]': currentState.layout !== 'layout-full', 'order-2': currentState.layout === 'layout-left' }"
      >
        <section v-show="summary.isShow" class="p-2 flex flex-col gap-2">
          <div
            v-if="summary.hashtags && summary.hashtags.length"
            class="flex gap-4"
          >
            <span
              v-for="item in summary.hashtags.filter(tag => !!tag)"
              :key="item"
              class="hashtag text-primary-100 bg-primary-10"
            >
              {{ item }}
            </span>
          </div>
          <p
            :class="getFontSizeClassName(currentState.fontSize).paragraph"
            class="text-blacks-70"
          >
            {{ summary.paragraph }}
          </p>
        </section>
        <section v-if="experience.isShow">
          <div
            :class="getFontSizeClassName(currentState.fontSize).subtitle"
            class="px-2 py-1 text-primary-100"
          >
            {{ experience.name }}
          </div>
          <div v-for="(item, index) in experience.list" :key="index">
            <div
              v-if="item.isShow"
              class="p-2 flex flex-col gap-1"
            >
              <span
                :class="getFontSizeClassName(currentState.fontSize).title"
                class="text-blacks-100"
              >
                {{ item.title }}
              </span>
              <div class="flex justify-between">
                <span
                  :class="getFontSizeClassName(currentState.fontSize).subtitle"
                  class="text-blacks-40"
                >
                  {{ item.subtitle1 }}
                </span>
                <span
                  :class="getFontSizeClassName(currentState.fontSize).subtitle"
                  class="text-blacks-40"
                >
                  {{ item.subtitle2 }}
                </span>
              </div>
              <p
                :class="getFontSizeClassName(currentState.fontSize).paragraph"
                class="text-blacks-70"
              >
                {{ item.paragraph }}
              </p>
            </div>
          </div>
        </section>
        <section v-if="project.isShow">
          <div
            :class="getFontSizeClassName(currentState.fontSize).subtitle"
            class="px-2 py-1 text-primary-100"
          >
            {{ project.name }}
          </div>
          <div v-for="(item, index) in project.list" :key="index">
            <div
              v-if="item.isShow"
              class="p-2 flex flex-col gap-1"
            >
              <span
                :class="getFontSizeClassName(currentState.fontSize).title"
                class="text-blacks-100"
              >
                {{ item.title }}
              </span>
              <div class="flex justify-between">
                <span
                  :class="getFontSizeClassName(currentState.fontSize).subtitle"
                  class="text-blacks-40"
                >
                  {{ item.subtitle1 }}
                </span>
                <span
                  :class="getFontSizeClassName(currentState.fontSize).subtitle"
                  class="text-blacks-40"
                >
                  {{ item.subtitle2 }}
                </span>
              </div>
              <p
                :class="getFontSizeClassName(currentState.fontSize).paragraph"
                class="text-blacks-70"
              >
                {{ item.paragraph }}
              </p>
            </div>
          </div>
        </section>
      </div>
      <div
        class="px-2"
        :class="{ 'w-[25%]': currentState.layout !== 'layout-full', 'order-1': currentState.layout === 'layout-left' }"
      >
        <section
          v-if="skill.isShow"
          class="pb-2"
        >
          <div
            :class="getFontSizeClassName(currentState.fontSize).subtitle"
            class="py-1 text-primary-100"
          >
            {{ skill.name }}
          </div>
          <div v-for="(item, index) in skill.list" :key="index">
            <div
              v-if="item.isShow"
              :class="getFontSizeClassName(currentState.fontSize).subtitle"
              class="pt-2 pb-1 text-blacks-40"
            >
              {{ item.subtitle1 }}
            </div>
            <div
              v-if="item.isShow"
              :class="getFontSizeClassName(currentState.fontSize).paragraph"
              class="text-blacks-70"
            >
              <span style="white-space: pre-wrap;">
                {{ item.paragraph }}
              </span>
            </div>
          </div>
        </section>
        <section>
          <div class="py-1">
            <div
              v-if="certificate.isShow"
              :class="getFontSizeClassName(currentState.fontSize).subtitle"
              class="text-primary-100"
            >
              {{ certificate.name }}
            </div>
          </div>
          <div v-for="(item, index) in certificate.list" :key="index">
            <div
              v-if="item.isShow"
              class="py-2 pb-1"
            >
              <div
                :class="getFontSizeClassName(currentState.fontSize).title"
                class="text-blacks-100"
              >
                {{ item.title }}
              </div>
              <span
                :class="getFontSizeClassName(currentState.fontSize).subtitle"
                class="text-blacks-40"
              >
                {{ item.subtitle1 }}
              </span>

              <div
                :class="getFontSizeClassName(currentState.fontSize).paragraph"
                class="text-blacks-70"
              >
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
              :class="getFontSizeClassName(currentState.fontSize).subtitle"
              class="text-primary-100"
            >
              {{ education.name }}
            </div>
          </div>
          <div v-for="(item, index) in education.list" :key="index">
            <div
              v-if="item.isShow"
              class="py-2 pb-1"
            >
              <div
                :class="getFontSizeClassName(currentState.fontSize).title"
                class="text-blacks-100"
              >
                {{ item.title }}
              </div>
              <span
                :class="getFontSizeClassName(currentState.fontSize).subtitle"
                class="text-blacks-40"
              >
                {{ item.subtitle1 }}
              </span>
              <div
                :class="getFontSizeClassName(currentState.fontSize).paragraph"
                class="text-blacks-70"
              >
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
            :class="getFontSizeClassName(currentState.fontSize).subtitle"
            class="pt-5 py-1 text-primary-100"
          >
            {{ contact.name }}
          </div>
          <div v-for="(item, index) in contact.list" :key="index">
            <div
              v-if="item.isShow"
              class=""
            >
              <div
                :class="getFontSizeClassName(currentState.fontSize).subtitle"
                class="pt-2 pb-1 text-blacks-40"
              >
                {{ item.subtitle1 }}
              </div>
              <div
                :class="getFontSizeClassName(currentState.fontSize).paragraph"
                class="mt-px text-blacks-70 break-words"
              >
                <p>  {{ item.paragraph }}</p>
              </div>
            </div>
            <!-- <div class="pt-2" />
            <div
              :class="getFontSizeClassName(currentState.fontSize).paragraph"
              class="pt-2 pb-1 text-blacks-40"
            >
              Social
            </div>
            <div
              :class="getFontSizeClassName(currentState.fontSize).paragraph"
              class="flex flex-col text-blacks-70"
            >
              <a href="https://www.linkedin.com/feed/">
                LinkedIn
              </a>
              <a href="https://www.behance.net/">
                Behance
              </a>
            </div>
          </div> -->
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
