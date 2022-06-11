<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'

const user = useUserStore()
const { about, summary, experience, project, skill, education, certificate, contact } = storeToRefs(user)

const toolbar = useToolbarStore()
const { currentState } = storeToRefs(toolbar)

</script>

<template>
  <div
    id="cv-preview"
    class="w-full h-full flex-shrink-0 p-6 shadow-custom"
    :class="currentState.fontFamily"
  >
    <div
      class="p-2 flex items-baseline gap-4"
      :class="{ 'ml-[25%]': currentState.layout === 2 }"
    >
      <span
        v-if="about.name"
        :style="{'--text-colour-code': currentState.primaryColour}"
        class="font-normal text-set-colour text-4xl leading-[41px]"
      >
        {{ about.name }}
      </span>
      <span
        v-if="about.jobTitle"
        class="font-normal text-blacks-100 text-sm leading-4"
      >
        {{ about.jobTitle }}
      </span>
    </div>
    <div :class="{ 'flex': currentState.layout !== 3 }">
      <div
        class="flex flex-col gap-4"
        :class="{ 'w-[75%]': currentState.layout !== 3, 'order-2': currentState.layout === 2 }"
      >
        <section v-show="summary.isShow" class="p-2 flex flex-col gap-2">
          <div
            v-if="summary.hashtags && summary.hashtags.length"
            class="flex gap-4"
          >
            <span
              v-for="item in summary.hashtags.filter(tag => !!tag)"
              :key="item"
              :style="{
                '--text-colour-code': currentState.primaryColour,
                '--bg-colour-code': currentState.secondaryColour
              }"
              class="hashtag text-set-colour bg-set-colour"
            >
              {{ item }}
            </span>
          </div>
          <p
            :class="currentState.paragraphScale"
            class="text-blacks-70"
          >
            {{ summary.paragraph }}
          </p>
        </section>
        <section v-if="experience.isShow">
          <div
            :style="{'--text-colour-code': currentState.primaryColour}"
            :class="currentState.subtitleScale"
            class="px-2 py-1 text-set-colour"
          >
            {{ experience.name }}
          </div>
          <div v-for="(item, index) in experience.list" :key="index">
            <div
              v-if="item.isShow"
              class="p-2 flex flex-col gap-1"
            >
              <span
                :class="currentState.titleScale"
                class="text-blacks-100"
              >
                {{ item.title }}
              </span>
              <div class="flex justify-between">
                <span
                  :class="currentState.subtitleScale"
                  class="text-blacks-40"
                >
                  {{ item.subtitle1 }}
                </span>
                <span
                  :class="currentState.subtitleScale"
                  class="text-blacks-40"
                >
                  {{ item.subtitle2 }}
                </span>
              </div>
              <p
                :class="currentState.paragraphScale"
                class="text-blacks-70"
              >
                {{ item.paragraph }}
              </p>
            </div>
          </div>
        </section>
        <section v-if="project.isShow">
          <div
            :style="{'--text-colour-code': currentState.primaryColour}"
            :class="currentState.subtitleScale"
            class="px-2 py-1 text-set-colour"
          >
            {{ project.name }}
          </div>
          <div v-for="(item, index) in project.list" :key="index">
            <div
              v-if="item.isShow"
              class="p-2 flex flex-col gap-1"
            >
              <span
                :class="currentState.titleScale"
                class="text-blacks-100"
              >
                {{ item.title }}
              </span>
              <div class="flex justify-between">
                <span
                  :class="currentState.subtitleScale"
                  class="text-blacks-40"
                >
                  {{ item.subtitle1 }}
                </span>
                <span
                  :class="currentState.subtitleScale"
                  class="text-blacks-40"
                >
                  {{ item.subtitle2 }}
                </span>
              </div>
              <p
                :class="currentState.paragraphScale"
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
        :class="{ 'w-[25%]': currentState.layout !== 3, 'order-1': currentState.layout === 2}"
      >
        <section
          v-if="skill.isShow"
          class="pb-2"
        >
          <div
            :style="{'--text-colour-code': currentState.primaryColour}"
            :class="currentState.subtitleScale"
            class="py-1 text-set-colour"
          >
            {{ skill.name }}
          </div>
          <div v-for="(item, index) in skill.list" :key="index">
            <div
              v-if="item.isShow"
              :class="currentState.subtitleScale"
              class="pt-2 pb-1 text-blacks-40"
            >
              {{ item.subtitle1 }}
            </div>
            <div
              v-if="item.isShow"
              :class="currentState.paragraphScale"
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
              :style="{'--text-colour-code': currentState.primaryColour}"
              :class="currentState.subtitleScale"
              class="text-set-colour"
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
                :class="currentState.titleScale"
                class="text-blacks-100"
              >
                {{ item.title }}
              </div>
              <span
                :class="currentState.subtitleScale"
                class="text-blacks-40"
              >
                {{ item.subtitle1 }}
              </span>

              <div
                :class="currentState.paragraphScale"
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
              :style="{'--text-colour-code': currentState.primaryColour}"
              :class="currentState.subtitleScale"
              class="text-set-colour"
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
                :class="currentState.titleScale"
                class="text-blacks-100"
              >
                {{ item.title }}
              </div>
              <span
                :class="currentState.subtitleScale"
                class="text-blacks-40"
              >
                {{ item.subtitle1 }}
              </span>
              <div
                :class="currentState.paragraphScale"
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
            :style="{'--text-colour-code': currentState.primaryColour}"
            :class="currentState.subtitleScale"
            class="pt-5 py-1 text-set-colour"
          >
            {{ contact.name }}
          </div>
          <div v-for="(item, index) in contact.list" :key="index">
            <div
              v-if="item.isShow"
              class=""
            >
              <div
                :class="currentState.subtitleScale"
                class="pt-2 pb-1 text-blacks-40"
              >
                {{ item.subtitle1 }}
              </div>
              <div
                :class="currentState.paragraphScale"
                class="mt-px text-blacks-70 break-words"
              >
                <p>  {{ item.paragraph }}</p>
              </div>
            </div>
            <div class="pt-2" />
            <div
              :class="currentState.paragraphScale"
              class="pt-2 pb-1 text-blacks-40"
            >
              Social
            </div>
            <div
              :class="currentState.paragraphScale"
              class="flex flex-col text-blacks-70"
            >
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
