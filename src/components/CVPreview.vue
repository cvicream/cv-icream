<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'
import { isEditorEmpty } from '~/utils'
import { DEFAULT_TEMPLATE } from '~/constants'

const props = defineProps<{
  id: string
}>()

const id = ref(props.id || 'cv-preview')

const user = useUserStore()
const { about, summary, experience, project, skill, education, certificate, contact, social } = storeToRefs(user)

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

function getHintText(isEditing, hintTemplate: string) {
  return ((isEditing) ? hintTemplate : '')
}

function showSection(isEditing, hintTemplate: string, content: string) {
  return ((isEditorEmpty(content) ? getHintText(isEditing, hintTemplate) : content))
}

</script>

<template>
  <div class="title-default subtitle-default paragraph-default title-large subtitle-large paragraph-large" />
  <div
    :id="id"
    class="w-full h-full bg-white flex-shrink-0 p-6 shadow-custom cv-preview"
  >
    <div
      class="w-full h-full"
      :class="currentState.fontFamily"
    >
      <div class="flex justify-between">
        <div
          class="p-2 flex items-baseline flex-wrap gap-4 not-break-out"
          :class="currentState.layout === 'layout-left' ? `ml-[25%] ${getEditingStyle(about.isEditing)}` : getEditingStyle(about.isEditing)"
        >
          <div
            v-if="about.name"
            class="font-normal text-primary-100 text-size-[36px] leading-[41px]"
            v-html="isEditorEmpty(about.name) ? DEFAULT_TEMPLATE.about.name : about.name"
          />
          <div
            v-if="about.jobTitle"
            class="font-normal text-blacks-100 text-size-[14px] leading-[16px]"
            v-html="isEditorEmpty(about.jobTitle) ? getHintText(about.isEditing, DEFAULT_TEMPLATE.about.jobTitle) : about.jobTitle"
          />
        </div>
        <!-- Contact section for layout-full -->
        <Section
          v-if="currentState.layout === 'layout-full'"
        >
          <div
            v-for="(item, index) in contact.list"
            :key="index"
            :class="getEditingStyle(item.isEditing)"
          >
            <div
              v-if="item.isShow"
              class="p-2 gap-2"
            >
              <div
                v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.contact.list[0].paragraph, item.paragraph)"
                :class="getFontSizeClassName(currentState.fontSize).paragraph"
                class="mt-px text-blacks-70"
                v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.contact.list[0].paragraph, item.paragraph)"
              />
            </div>
          </div>
        </Section>
      </div>
      <div :class="{ 'flex': currentState.layout !== 'layout-full' }">
        <div
          class="flex flex-col gap-4 not-break-out"
          :class="{ 'w-[75%]': currentState.layout !== 'layout-full', 'order-2': currentState.layout === 'layout-left' }"
        >
          <section
            v-show="summary.isShow"
            class="p-2 flex flex-col gap-2 not-break-out"
            :class="getEditingStyle(summary.isEditing)"
          >
            <div
              v-if="summary.hashtags && summary.hashtags.length"
              class="flex gap-4"
            >
              <div
                v-for="(item, index) in summary.hashtags.filter((tag, index) => {
                  return !!(isEditorEmpty(tag) ? getHintText(summary.isEditing, DEFAULT_TEMPLATE.summary.hashtags[index]) : tag)
                })"
                :key="item"
                class="hashtag text-primary-100 bg-primary-10"
                :class="summary.isEditing ? 'bg-white' : 'bg-primary-10'"
                v-html="isEditorEmpty(item) ? getHintText(summary.isEditing, DEFAULT_TEMPLATE.summary.hashtags[index]) : item"
              />
            </div>
            <div
              :class="getFontSizeClassName(currentState.fontSize).paragraph"
              class="text-blacks-70"
              v-html="isEditorEmpty(summary.paragraph) ? getHintText(summary.isEditing, DEFAULT_TEMPLATE.summary.paragraph) : summary.paragraph"
            />
          </section>
          <section v-if="experience.isShow" class="not-break-out">
            <div
              :class="getFontSizeClassName(currentState.fontSize).subtitle"
              class="px-2 py-1 text-primary-100"
            >
              {{ experience.name ? experience.name : DEFAULT_TEMPLATE.experience.name }}
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
                  v-html="isEditorEmpty(item.title) ?
                    getHintText(item.isEditing, DEFAULT_TEMPLATE.experience.list[0].title) : item.title"
                />
                <div class="flex justify-between">
                  <div
                    :class="getFontSizeClassName(currentState.fontSize).subtitle"
                    class="text-blacks-40"
                    v-html="isEditorEmpty(item.subtitle1) ?
                      getHintText(item.isEditing, DEFAULT_TEMPLATE.experience.list[0].subtitle1) : item.subtitle1"
                  />
                  <div
                    :class="getFontSizeClassName(currentState.fontSize).subtitle"
                    class="text-blacks-40"
                    v-html="isEditorEmpty(item.subtitle2) ?
                      getHintText(item.isEditing, DEFAULT_TEMPLATE.experience.list[0].subtitle2) : item.subtitle2"
                  />
                </div>
                <div
                  :class="getFontSizeClassName(currentState.fontSize).paragraph"
                  class="text-blacks-70"
                  v-html="isEditorEmpty(item.paragraph) ?
                    getHintText(item.isEditing, DEFAULT_TEMPLATE.experience.list[0].paragraph) : item.paragraph"
                />
              </div>
            </div>
          </section>
          <section v-if="project.isShow" class="not-break-out">
            <div
              :class="getFontSizeClassName(currentState.fontSize).subtitle"
              class="px-2 py-1 text-primary-100"
            >
              {{ project.name ? project.name : DEFAULT_TEMPLATE.project.name }}
            </div>
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
                  v-html="isEditorEmpty(item.title) ?
                    getHintText(item.isEditing, DEFAULT_TEMPLATE.project.list[0].title) : item.title"
                />
                <div class="flex justify-between">
                  <div
                    :class="getFontSizeClassName(currentState.fontSize).subtitle"
                    class="text-blacks-40"
                    v-html="isEditorEmpty(item.subtitle1) ?
                      getHintText(item.isEditing, DEFAULT_TEMPLATE.project.list[0].subtitle1) : item.subtitle1"
                  />
                  <div
                    :class="getFontSizeClassName(currentState.fontSize).subtitle"
                    class="text-blacks-40"
                    v-html="isEditorEmpty(item.subtitle2) ?
                      getHintText(item.isEditing, DEFAULT_TEMPLATE.project.list[0].subtitle2) : item.subtitle2"
                  />
                </div>
                <div
                  :class="getFontSizeClassName(currentState.fontSize).paragraph"
                  class="text-blacks-70"
                  v-html="isEditorEmpty(item.paragraph) ?
                    getHintText(item.isEditing, DEFAULT_TEMPLATE.project.list[0].paragraph) : item.paragraph"
                />
              </div>
            </div>
          </section>
        </div>
        <div
          :class="{ 'w-[25%]': currentState.layout !== 'layout-full', 'order-1': currentState.layout === 'layout-left' }"
        >
          <!-- Contact section for layout-left and layout right -->
          <section
            v-if="currentState.layout !== 'layout-full'"
            class="pb-2 not-break-out"
          >
            <div
              :class="getFontSizeClassName(currentState.fontSize).subtitle"
              class="text-primary-100 py-1 px-2"
            >
              {{ contact.name ? contact.name : DEFAULT_TEMPLATE.contact.name }}
            </div>
            <div
              v-for="(item, index) in contact.list"
              :key="index"
              :class="getEditingStyle(item.isEditing)"
            >
              <div
                v-if="item.isShow"
                class="p-2 gap-2"
              >
                <div
                  v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.contact.list[0].paragraph, item.paragraph)"
                  :class="getFontSizeClassName(currentState.fontSize).paragraph"
                  class="mt-px text-blacks-70"
                  v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.contact.list[0].paragraph, item.paragraph)"
                />
              </div>
            </div>
          </section>
          <section
            v-if="skill.isShow"
            class="py-2 not-break-out"
          >
            <div
              :class="getFontSizeClassName(currentState.fontSize).subtitle"
              class="py-1 px-2 text-primary-100"
            >
              {{ skill.name ? skill.name : DEFAULT_TEMPLATE.skill.name }}
            </div>
            <div
              v-for="(item, index) in skill.list"
              :key="index"
              :class="getEditingStyle(item.isEditing)"
            >
              <div
                v-if="item.isShow"
                class="p-2 gap-2"
              >
                <div
                  v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.skill.list[0].title,item.title)"
                  :class="getFontSizeClassName(currentState.fontSize).title"
                  class="text-blacks-100"
                  v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.skill.list[0].title,item.title)"
                />
                <div
                  v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.skill.list[0].subtitle,item.subtitle)"
                  :class="getFontSizeClassName(currentState.fontSize).subtitle"
                  class="text-blacks-40 pb-1"
                  v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.skill.list[0].subtitle,item.subtitle)"
                />
                <div
                  v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.skill.list[0].paragraph,item.paragraph)"
                  :class="getFontSizeClassName(currentState.fontSize).paragraph"
                  class="text-blacks-70"
                  v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.skill.list[0].paragraph,item.paragraph)"
                />
              </div>
            </div>
          </section>
          <section
            v-if="certificate.isShow"
            class="py-2 not-break-out"
          >
            <div
              :class="getFontSizeClassName(currentState.fontSize).subtitle"
              class="text-primary-100 py-1 px-2"
            >
              {{ certificate.name ? certificate.name : DEFAULT_TEMPLATE.certificate.name }}
            </div>
            <div
              v-for="(item, index) in certificate.list"
              :key="index"
              :class="getEditingStyle(item.isEditing)"
            >
              <div
                v-if="item.isShow"
                class="p-2 gap-2"
              >
                <div
                  v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.certificate.list[0].title, item.title)"
                  :class="getFontSizeClassName(currentState.fontSize).title"
                  class="text-blacks-100"
                  v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.certificate.list[0].title, item.title)"
                />
                <div
                  v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.certificate.list[0].subtitle, item.subtitle)"
                  :class="getFontSizeClassName(currentState.fontSize).subtitle"
                  class="text-blacks-40"
                  v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.certificate.list[0].subtitle, item.subtitle)"
                />
                <div
                  v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.certificate.list[0].paragraph, item.paragraph)"
                  :class="getFontSizeClassName(currentState.fontSize).paragraph"
                  class="text-blacks-70"
                  v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.certificate.list[0].paragraph, item.paragraph)"
                />
              </div>
            </div>
          </section>
          <section
            v-if="education.isShow"
            class="py-2 not-break-out"
          >
            <div
              :class="getFontSizeClassName(currentState.fontSize).subtitle"
              class="text-primary-100 py-1 px-2"
            >
              {{ education.name ? education.name : DEFAULT_TEMPLATE.education.name }}
            </div>
            <div
              v-for="(item, index) in education.list"
              :key="index"
              :class="getEditingStyle(item.isEditing)"
            >
              <div
                v-if="item.isShow"
                class="p-2 gap-2"
              >
                <div
                  v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.education.list[0].title, item.title)"
                  :class="getFontSizeClassName(currentState.fontSize).title"
                  class="text-blacks-100 pb-1"
                  v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.education.list[0].title, item.title)"
                />
                <div
                  v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.education.list[0].subtitle, item.subtitle)"
                  :class="getFontSizeClassName(currentState.fontSize).subtitle"
                  class="text-blacks-40 pb-1"
                  v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.education.list[0].subtitle, item.subtitle)"
                />
                <div
                  v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.education.list[0].paragraph, item.paragraph)"
                  :class="getFontSizeClassName(currentState.fontSize).paragraph"
                  class="text-blacks-70"
                  v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.education.list[0].paragraph, item.paragraph)"
                />
              </div>
            </div>
          </section>

          <section
            v-if="social.isShow"
            class="py-2 not-break-out"
          >
            <div
              :class="getFontSizeClassName(currentState.fontSize).subtitle"
              class="text-primary-100 py-1 px-2 pb-2"
            >
              {{ social.name ? social.name : DEFAULT_TEMPLATE.social.name }}
            </div>
            <div
              v-for="(item, index) in social.list"
              :key="index"
              :class="getEditingStyle(item.isEditing)"
            >
              <div
                v-if="item.isShow"
                class="px-2"
                :class="getFontSizeClassName(currentState.fontSize).paragraph"
              >
                <a
                  v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.social.list[0].type, item.type)"
                  class="text-blacks-70"
                  :href="item.link"
                  target="_blank"
                  v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.social.list[0].type, item.type)"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.cv-preview ol {
  @apply pl-3;
  list-style: none;
  counter-reset: li;
}
.cv-preview ol li {
  counter-increment: li;
}
.cv-preview ol li::before {
  content: counter(li) '. ';
  display: inline-block;
  width: 0.75rem;
  margin-left: -0.75rem;
}

.cv-preview ul {
  @apply pl-3;
  list-style: none;
}
.cv-preview ul li::before {
  content: '•';
  display: inline-block;
  width: 0.75rem;
  margin-left: -0.75rem;
}

.cv-preview .ql-indent-1 {
  @apply pl-3;
}
.cv-preview .ql-indent-2 {
  @apply pl-6;
}
.cv-preview .ql-indent-3 {
  @apply pl-9;
}
.cv-preview .ql-indent-4 {
  @apply pl-12;
}
.cv-preview .ql-indent-5 {
  @apply pl-15;
}
.cv-preview .ql-indent-6 {
  @apply pl-18;
}
.cv-preview .ql-indent-7 {
  @apply pl-21;
}
.cv-preview .ql-indent-8 {
  @apply pl-24;
}
.cv-preview .ql-indent-9 {
  @apply pl-27;
}
.cv-preview .ql-indent-10 {
  @apply pl-30;
}

.cv-preview a {
  text-decoration: underline;
}
</style>
