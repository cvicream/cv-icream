<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'
import { isEditorEmpty } from '~/utils'
import { DEFAULT_TEMPLATE } from '~/constants'

const props = defineProps({
  element: {
    type: Object,
    required: true,
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
})

const user = useUserStore()
const { about, summary, experience, project, skill, education, certificate, contact, social } = storeToRefs(user)

const toolbar = useToolbarStore()
const { currentState } = storeToRefs(toolbar)

const isHover = ref(false)

const router = useRouter()

function getFontSizeClassName(id: string) {
  return {
    heading: `heading-${id}`,
    title: `title-${id}`,
    subtitle: `subtitle-${id}`,
    paragraph: `paragraph-${id}`,
  }
}

function getEditingStyle(isEditing) {
  let style = 'rounded-xl transition ease-in delay-200 '
  style += isEditing ? 'bg-primary-10' : ''
  return style
}

function getHintText(isEditing, hintTemplate: string) {
  return ((isEditing) ? hintTemplate : '')
}

function showSection(isEditing, hintTemplate: string, content: string) {
  return ((isEditorEmpty(content) ? getHintText(isEditing, hintTemplate) : content))
}

function isObjectEmpty(obj) {
  let isEmpty = true
  const keys = ['title', 'subtitle', 'subtitle1', 'subtitle2', 'paragraph', 'type']
  for (const [key, value] of Object.entries(obj)) {
    if (keys.includes(key) && !isEditorEmpty(value as string)) {
      isEmpty = false
      break
    }
  }
  return isEmpty
}

function redirect(path) {
  if (!props.readOnly) router.push(path)
}
</script>

<template>
  <div
    @mouseover="isHover = readOnly ? false : true"
    @mouseout="isHover = false"
    @mouseup="redirect(`/edit/${element.key}`)"
  >
    <div
      v-if="element.key === 'about'"
      id="about"
      class="p-2 flex items-baseline flex-wrap gap-6 not-break-out sm:hover:bg-primary-10"
      :class="getEditingStyle(about.isEditing)"
    >
      <div
        v-if="about.name"
        class="text-primary-100"
        :class="getFontSizeClassName(currentState.fontSize).heading"
        v-html="isEditorEmpty(about.name) ? DEFAULT_TEMPLATE.about.name : about.name"
      />
      <div
        v-if="about.jobTitle"
        :class="[
          getFontSizeClassName(currentState.fontSize).title,
          isEditorEmpty(about.jobTitle) ? 'text-blacks-40' : 'text-blacks-100'
        ]"
        v-html="isEditorEmpty(about.jobTitle) ? getHintText(about.isEditing, DEFAULT_TEMPLATE.about.jobTitle) : about.jobTitle"
      />
    </div>

    <section
      v-else-if="element.key === 'summary' && summary.isShow"
      id="summary"
      class="p-2 flex flex-col gap-2 not-break-out"
      :class="getEditingStyle(summary.isEditing)"
    >
      <div
        v-if="summary.hashtags && summary.hashtags.length && summary.hashtags.some(tag => !isEditorEmpty(tag))"
        class="flex gap-4"
      >
        <div
          v-for="(item, index) in summary.hashtags.filter((tag, index) => {
            return !!(isEditorEmpty(tag) ? getHintText(summary.isEditing, DEFAULT_TEMPLATE.summary.hashtags[index]) : tag)
          })"
          :key="item"
          class="hashtag bg-primary-10 hashtag-print"
          :class="[
            summary.isEditing || isHover ? 'sm:bg-white' : '',
            getFontSizeClassName(currentState.fontSize).subtitle,
            isEditorEmpty(item) ? 'text-blacks-40' : 'text-blacks-100'
          ]"
          v-html="isEditorEmpty(item) ? getHintText(summary.isEditing, DEFAULT_TEMPLATE.summary.hashtags[index]) : item"
        />
      </div>
      <div
        :class="[
          getFontSizeClassName(currentState.fontSize).paragraph,
          isEditorEmpty(summary.paragraph) ? 'text-blacks-40' : 'text-blacks-100'
        ]"
        v-html="isEditorEmpty(summary.paragraph) ? getHintText(summary.isEditing, DEFAULT_TEMPLATE.summary.paragraph) : summary.paragraph"
      />
    </section>

    <section
      v-else-if="element.key === 'experience' && experience.isShow"
      id="experience"
      class="pt-1 not-break-out"
      :class="getEditingStyle(experience.isEditing)"
    >
      <div
        :class="getFontSizeClassName(currentState.fontSize).subtitle"
        class="px-2 py-1 text-primary-100"
      >
        {{ experience.name ? experience.name : DEFAULT_TEMPLATE.experience.name }}
      </div>
      <div
        v-for="(item, index) in experience.list"
        :key="index"
      >
        <div
          v-if="item.isEditing || !isObjectEmpty(item)"
          :id="`experience-${index}`"
          :class="getEditingStyle(item.isEditing)"
        >
          <div
            v-if="item.isShow"
            class="p-2 flex flex-col gap-1"
          >
            <div
              v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.experience.list[0].title, item.title)"
              :class="[
                getFontSizeClassName(currentState.fontSize).title,
                isEditorEmpty(item.title) ? 'text-blacks-40' : 'text-blacks-100'
              ]"
              v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.experience.list[0].title, item.title)"
            />
            <div
              v-if="item.isEditing || !isEditorEmpty(item.subtitle1) || !isEditorEmpty(item.subtitle2)"
              class="flex justify-between gap-16"
            >
              <div
                v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.experience.list[0].subtitle1, item.subtitle1)
                  || showSection(item.isEditing, DEFAULT_TEMPLATE.experience.list[0].subtitle2, item.subtitle2)
                "
                :class="[
                  getFontSizeClassName(currentState.fontSize).subtitle,
                  'min-w-[40%] max-w-[60%]'
                ]"
                class="text-blacks-60"
                v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.experience.list[0].subtitle1, item.subtitle1)"
              />
              <div
                v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.experience.list[0].subtitle1, item.subtitle1)
                  || showSection(item.isEditing, DEFAULT_TEMPLATE.experience.list[0].subtitle2, item.subtitle2)
                "
                :class="[
                  getFontSizeClassName(currentState.fontSize).subtitle,
                  'min-w-[20%] max-w-[40%]'
                ]"
                class="text-blacks-60 text-right"
                v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.experience.list[0].subtitle2, item.subtitle2)"
              />
            </div>
            <div
              v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.experience.list[0].paragraph, item.paragraph)"
              :class="[
                getFontSizeClassName(currentState.fontSize).paragraph,
                isEditorEmpty(item.paragraph) ? 'text-blacks-40' : 'text-blacks-100'
              ]"
              v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.experience.list[0].paragraph, item.paragraph)"
            />
          </div>
        </div>
      </div>
    </section>

    <section
      v-else-if="element.key === 'project' && project.isShow"
      id="project"
      class="pt-1 not-break-out"
      :class="getEditingStyle(project.isEditing)"
    >
      <div
        :class="getFontSizeClassName(currentState.fontSize).subtitle"
        class="px-2 py-1 text-primary-100"
      >
        {{ project.name ? project.name : DEFAULT_TEMPLATE.project.name }}
      </div>
      <div
        v-for="(item, index) in project.list"
        :key="index"
      >
        <div
          v-if="item.isEditing || !isObjectEmpty(item)"
          :class="getEditingStyle(item.isEditing)"
        >
          <div
            v-if="item.isShow"
            class="p-2 flex flex-col gap-1"
          >
            <div
              v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.project.list[0].title, item.title)"
              :class="[
                getFontSizeClassName(currentState.fontSize).title,
                isEditorEmpty(item.title) ? 'text-blacks-40' : 'text-blacks-100'
              ]"
              class="text-blacks-100"
              v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.project.list[0].title, item.title)"
            />
            <div
              v-if="item.isEditing || !isEditorEmpty(item.subtitle1) || !isEditorEmpty(item.subtitle2)"
              class="flex justify-between gap-16"
            >
              <div
                v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.project.list[0].subtitle1, item.subtitle1)
                  || showSection(item.isEditing, DEFAULT_TEMPLATE.project.list[0].subtitle2, item.subtitle2)
                "
                :class="[
                  getFontSizeClassName(currentState.fontSize).subtitle,
                  'min-w-[40%] max-w-[60%]'
                ]"
                class="text-blacks-60"
                v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.project.list[0].subtitle1, item.subtitle1)"
              />
              <div
                v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.project.list[0].subtitle1, item.subtitle1)
                  || showSection(item.isEditing, DEFAULT_TEMPLATE.project.list[0].subtitle2, item.subtitle2)
                "
                :class="[
                  getFontSizeClassName(currentState.fontSize).subtitle,
                  'min-w-[20%] max-w-[40%]'
                ]"
                class="text-blacks-60 text-right"
                v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.project.list[0].subtitle2, item.subtitle2)"
              />
            </div>
            <div
              v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.project.list[0].paragraph, item.paragraph)"
              :class="[
                getFontSizeClassName(currentState.fontSize).paragraph,
                isEditorEmpty(item.paragraph) ? 'text-blacks-40' : 'text-blacks-100'
              ]"
              v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.project.list[0].paragraph, item.paragraph)"
            />
          </div>
        </div>
      </div>
    </section>

    <section
      v-else-if="element.key === 'contact'"
      id="contact"
      class="pt-1 not-break-out sm:hover:bg-primary-10"
      :class="getEditingStyle(contact.isEditing)"
    >
      <div
        v-if="currentState.layout !== 'layout-full'"
        :class="getFontSizeClassName(currentState.fontSize).subtitle"
        class="text-primary-100 py-1 px-2"
      >
        {{ contact.name ? contact.name : DEFAULT_TEMPLATE.contact.name }}
      </div>
      <div
        v-for="(item, index) in contact.list"
        :key="index"
      >
        <div
          v-if="item.isEditing || !isObjectEmpty(item)"
          :class="getEditingStyle(item.isEditing)"
        >
          <div
            v-if="item.isShow"
            class="p-2 flex flex-col gap-1"
          >
            <div
              v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.contact.list[0].paragraph, item.paragraph)"
              :class="[
                getFontSizeClassName(currentState.fontSize).paragraph,
                isEditorEmpty(item.paragraph) ? 'text-blacks-40' : 'text-blacks-100',
                { 'text-right': currentState.layout === 'layout-full' }
              ]"
              v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.contact.list[0].paragraph, item.paragraph)"
            />
          </div>
        </div>
      </div>
    </section>

    <section
      v-else-if="element.key === 'skill' && skill.isShow"
      id="skill"
      class="pt-1 not-break-out"
      :class="getEditingStyle(skill.isEditing)"
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
      >
        <div
          v-if="item.isEditing || !isObjectEmpty(item)"
          :class="getEditingStyle(item.isEditing)"
        >
          <div
            v-if="item.isShow"
            class="p-2 flex flex-col gap-1"
          >
            <div
              v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.skill.list[0].title,item.title)"
              :class="[
                getFontSizeClassName(currentState.fontSize).title,
                isEditorEmpty(item.title) ? 'text-blacks-40' : 'text-blacks-100'
              ]"
              v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.skill.list[0].title,item.title)"
            />
            <div
              v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.skill.list[0].subtitle,item.subtitle)"
              :class="[
                getFontSizeClassName(currentState.fontSize).subtitle,
                isEditorEmpty(item.subtitle) ? 'text-blacks-40' : 'text-blacks-60'
              ]"
              v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.skill.list[0].subtitle,item.subtitle)"
            />
            <div
              v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.skill.list[0].paragraph,item.paragraph)"
              :class="[
                getFontSizeClassName(currentState.fontSize).paragraph,
                isEditorEmpty(item.paragraph) ? 'text-blacks-40' : 'text-blacks-100'
              ]"
              v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.skill.list[0].paragraph,item.paragraph)"
            />
          </div>
        </div>
      </div>
    </section>

    <section
      v-else-if="element.key === 'certificate' && certificate.isShow"
      id="certificate"
      class="pt-1 not-break-out"
      :class="getEditingStyle(certificate.isEditing)"
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
      >
        <div
          v-if="item.isEditing || !isObjectEmpty(item)"
          :class="getEditingStyle(item.isEditing)"
        >
          <div
            v-if="item.isShow"
            class="p-2 flex flex-col gap-1"
          >
            <div
              v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.certificate.list[0].title, item.title)"
              :class="[
                getFontSizeClassName(currentState.fontSize).title,
                isEditorEmpty(item.title) ? 'text-blacks-40' : 'text-blacks-100'
              ]"
              v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.certificate.list[0].title, item.title)"
            />
            <div
              v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.certificate.list[0].subtitle, item.subtitle)"
              :class="[
                getFontSizeClassName(currentState.fontSize).subtitle,
                isEditorEmpty(item.subtitle) ? 'text-blacks-40' : 'text-blacks-60'
              ]"
              v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.certificate.list[0].subtitle, item.subtitle)"
            />
            <div
              v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.certificate.list[0].paragraph, item.paragraph)"
              :class="[
                getFontSizeClassName(currentState.fontSize).paragraph,
                isEditorEmpty(item.paragraph) ? 'text-blacks-40' : 'text-blacks-100'
              ]"
              v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.certificate.list[0].paragraph, item.paragraph)"
            />
          </div>
        </div>
      </div>
    </section>

    <section
      v-else-if="element.key === 'education' && education.isShow"
      id="education"
      class="pt-1 not-break-out"
      :class="getEditingStyle(education.isEditing)"
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
      >
        <div
          v-if="item.isEditing || !isObjectEmpty(item)"
          :class="getEditingStyle(item.isEditing)"
        >
          <div
            v-if="item.isShow"
            class="p-2 flex flex-col gap-1"
          >
            <div
              v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.education.list[0].title, item.title)"
              :class="[
                getFontSizeClassName(currentState.fontSize).title,
                isEditorEmpty(item.title) ? 'text-blacks-40' : 'text-blacks-100'
              ]"
              v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.education.list[0].title, item.title)"
            />
            <div
              v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.education.list[0].subtitle, item.subtitle)"
              :class="[
                getFontSizeClassName(currentState.fontSize).subtitle,
                isEditorEmpty(item.subtitle) ? 'text-blacks-40' : 'text-blacks-60'
              ]"
              v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.education.list[0].subtitle, item.subtitle)"
            />
            <div
              v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.education.list[0].paragraph, item.paragraph)"
              :class="[
                getFontSizeClassName(currentState.fontSize).paragraph,
                isEditorEmpty(item.paragraph) ? 'text-blacks-40' : 'text-blacks-100'
              ]"
              v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.education.list[0].paragraph, item.paragraph)"
            />
          </div>
        </div>
      </div>
    </section>

    <section
      v-else-if="element.key === 'social' && social.isShow"
      id="social"
      class="pt-1 not-break-out"
      :class="getEditingStyle(social.isEditing)"
    >
      <div
        :class="getFontSizeClassName(currentState.fontSize).subtitle"
        class="text-primary-100 py-1 px-2"
      >
        {{ social.name ? social.name : DEFAULT_TEMPLATE.social.name }}
      </div>
      <div class="p-2 inline-flex flex-col vertical-top">
        <div
          v-for="(item, index) in social.list"
          :key="index"
        >
          <div
            v-if="item.isEditing || !isObjectEmpty(item)"
            :class="getEditingStyle(item.isEditing)"
          >
            <div
              v-if="item.isShow"
              :class="getFontSizeClassName(currentState.fontSize).paragraph"
            >
              <IconElement :icon="social.list[index].icon" />
              <a
                v-if="showSection(item.isEditing, DEFAULT_TEMPLATE.social.list[0].type, item.type)"
                class="text-blacks-100"
                :href="item.link"
                target="_blank"
                v-html="showSection(item.isEditing, DEFAULT_TEMPLATE.social.list[0].type, item.type)"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
  #social {
    .paragraph-default {
      display: flex;
      align-items: center;
      gap: 4px;
      .icon-container {
        width: 12px;
        height: 12px;
        padding: unset;
        .icon-mask {
          position: relative;
          width: 12px;
          height: 12px;
          margin-right: 0px;
          > span {
            position: absolute;
            top: 2px;
            left: 2.5px;
            width:7.5px;
            height: 7.5px;
          }
        }
      }
    }
  }
</style>
