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

function getEditingStyle(isEditing) {
  let style = 'border rounded-xl transition ease-in delay-200 '
  style += isEditing ? 'bg-primary-10 border-primary-40' : 'border-transparent'
  return style
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
      :class="currentState.layout === 'layout-left' ? `ml-[25%] ${getEditingStyle(about.isEditing)}` : getEditingStyle(about.isEditing)"
    >
      <div
        v-if="about.name"
        class="font-normal text-primary-100 text-size-[36px] leading-[41px]"
        v-html="about.name"
      />
      <div
        v-if="about.jobTitle"
        class="font-normal text-blacks-100 text-size-[14px] leading-[16px]"
        v-html="about.jobTitle"
      />
    </div>
    <div :class="{ 'flex': currentState.layout !== 'layout-full' }">
      <div
        class="flex flex-col gap-4"
        :class="{ 'w-[75%]': currentState.layout !== 'layout-full', 'order-2': currentState.layout === 'layout-left' }"
      >
        <section
          v-show="summary.isShow"
          class="p-2 flex flex-col gap-2"
          :class="getEditingStyle(summary.isEditing)"
        >
          <div
            v-if="summary.hashtags && summary.hashtags.length"
            class="flex gap-4"
          >
            <div
              v-for="item in summary.hashtags.filter(tag => !!tag)"
              :key="item"
              class="hashtag text-primary-100 bg-primary-10"
              v-html="item"
            />
          </div>
          <div
            :class="getFontSizeClassName(currentState.fontSize).paragraph"
            class="text-blacks-70"
            v-html="summary.paragraph"
          />
        </section>
        <section v-if="experience.isShow">
          <div
            :class="getFontSizeClassName(currentState.fontSize).subtitle"
            class="px-2 py-1 text-primary-100"
          >
            {{ experience.name }}
          </div>
          <div
            v-for="(item, index) in experience.list"
            :key="index"
            :class="getEditingStyle(item.isEditing)"
          >
            <div
              v-if="item.isShow"
              class="p-2 flex flex-col gap-1"
            >
              <div
                :class="getFontSizeClassName(currentState.fontSize).title"
                class="text-blacks-100"
                v-html="item.title"
              />
              <div class="flex justify-between">
                <div
                  :class="getFontSizeClassName(currentState.fontSize).subtitle"
                  class="text-blacks-40"
                  v-html="item.subtitle1"
                />
                <div
                  :class="getFontSizeClassName(currentState.fontSize).subtitle"
                  class="text-blacks-40"
                  v-html="item.subtitle2"
                />
              </div>
              <div
                :class="getFontSizeClassName(currentState.fontSize).paragraph"
                class="text-blacks-70"
                v-html="item.paragraph"
              />
            </div>
          </div>
        </section>
        <section v-if="project.isShow">
          <div
            :class="getFontSizeClassName(currentState.fontSize).subtitle"
            class="px-2 py-1 text-primary-100"
            v-html="project.name"
          />
          <div
            v-for="(item, index) in project.list"
            :key="index"
            :class="getEditingStyle(item.isEditing)"
          >
            <div
              v-if="item.isShow"
              class="p-2 flex flex-col gap-1"
            >
              <div
                :class="getFontSizeClassName(currentState.fontSize).title"
                class="text-blacks-100"
                v-html="item.title"
              />
              <div class="flex justify-between">
                <div
                  :class="getFontSizeClassName(currentState.fontSize).subtitle"
                  class="text-blacks-40"
                  v-html="item.subtitle1"
                />
                <div
                  :class="getFontSizeClassName(currentState.fontSize).subtitle"
                  class="text-blacks-40"
                  v-html="item.subtitle2"
                />
              </div>
              <div
                :class="getFontSizeClassName(currentState.fontSize).paragraph"
                class="text-blacks-70"
                v-html="item.paragraph"
              />
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
          <div
            v-for="(item, index) in skill.list"
            :key="index"
            :class="getEditingStyle(item.isEditing)"
          >
            <div
              v-if="item.isShow"
              class="py-2"
            >
              <div
                :class="getFontSizeClassName(currentState.fontSize).title"
                class="text-blacks-100"
                v-html="item.title"
              />
              <div
                :class="getFontSizeClassName(currentState.fontSize).subtitle"
                class="text-blacks-40 pb-1"
                v-html="item.subtitle"
              />
              <div
                :class="getFontSizeClassName(currentState.fontSize).paragraph"
                class="text-blacks-70"
                v-html="item.paragraph"
              />
            </div>
          </div>
        </section>
        <section
          v-if="certificate.isShow"
          class="py-2"
        >
          <div
            :class="getFontSizeClassName(currentState.fontSize).subtitle"
            class="text-primary-100 py-1"
          >
            {{ certificate.name }}
          </div>
          <div
            v-for="(item, index) in certificate.list"
            :key="index"
            :class="getEditingStyle(item.isEditing)"
          >
            <div
              v-if="item.isShow"
              class="py-2"
            >
              <div
                :class="getFontSizeClassName(currentState.fontSize).title"
                class="text-blacks-100"
                v-html="item.title"
              />
              <span
                :class="getFontSizeClassName(currentState.fontSize).subtitle"
                class="text-blacks-40"
                v-html="item.subtitle"
              />
              <div
                :class="getFontSizeClassName(currentState.fontSize).paragraph"
                class="text-blacks-70"
                v-html="item.paragraph"
              />
            </div>
          </div>
        </section>
        <section
          v-if="education.isShow"
          class="py-2"
        >
          <div
            :class="getFontSizeClassName(currentState.fontSize).subtitle"
            class="text-primary-100 py-1"
          >
            {{ education.name }}
          </div>
          <div
            v-for="(item, index) in education.list"
            :key="index"
            :class="getEditingStyle(item.isEditing)"
          >
            <div
              v-if="item.isShow"
              class="py-2"
            >
              <div
                :class="getFontSizeClassName(currentState.fontSize).title"
                class="text-blacks-100 pb-1"
                v-html="item.title"
              />
              <div
                :class="getFontSizeClassName(currentState.fontSize).subtitle"
                class="text-blacks-40 pb-1"
                v-html="item.subtitle"
              />
              <div
                :class="getFontSizeClassName(currentState.fontSize).paragraph"
                class="text-blacks-70"
                v-html="item.paragraph"
              />
            </div>
          </div>
        </section>
        <section
          v-if="contact.isShow"
          class="py-2"
        >
          <div
            :class="getFontSizeClassName(currentState.fontSize).subtitle"
            class="text-primary-100 py-1"
          >
            {{ contact.name }}
          </div>
          <div
            v-for="(item, index) in contact.list"
            :key="index"
            :class="getEditingStyle(item.isEditing)"
          >
            <div
              v-if="item.isShow"
              class="py-2"
            >
              <div
                :class="getFontSizeClassName(currentState.fontSize).title"
                class="text-blacks-100 pb-1"
                v-html="item.title"
              />
              <div
                :class="getFontSizeClassName(currentState.fontSize).subtitle"
                class="pb-1 text-blacks-40"
                v-html="item.subtitle"
              />
              <div
                :class="getFontSizeClassName(currentState.fontSize).paragraph"
                class="mt-px text-blacks-70"
                v-html="item.paragraph"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
