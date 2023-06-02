<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'
import { DEFAULT_TEMPLATE, HIDDEN_INFORMATION, TEMPLATE_LIST_ITEM } from '~/constants'

const user = useUserStore()
const { experience } = storeToRefs(user)
const toolbar = useToolbarStore()
const { isMobileScreen } = storeToRefs(toolbar)

const isEditName = ref(false)
const nameInput = ref<HTMLInputElement | null>(null)
const componentKey = ref(0) // force Editor component to re-render
const deleteBlockVisible = ref(false)
const deleteIdx = ref(0)
const isMoreActionOpen = ref<number[]>([])

function forceRerender() {
  componentKey.value += 1
}

watch(nameInput, () => {
  if (nameInput.value && isEditName.value) {
    nameInput.value.focus()
    nameInput.value.select()
  }
})

onMounted(() => {
  window.addEventListener('click', closeAction, false)
})

onUnmounted(() => {
  window.removeEventListener('click', closeAction)
})

function onEditNameClick() {
  isEditName.value = !isEditName.value
}

function focusIn(index) {
  user.$patch((state) => {
    state.experience.list[index].isEditing = true
  })
}

function focusOut(index) {
  user.$patch((state) => {
    state.experience.list[index].isEditing = false
  })
}

function toggleShowAll() {
  user.$patch((state) => {
    state.experience.isShow = !state.experience.isShow
    state.experience.list.forEach(item => item.isShow = state.experience.isShow)
  })
}

function toggleMoreAction(index: number | null) {
  if (index === null || isMoreActionOpen.value.includes(index))
    isMoreActionOpen.value = []
  else
    isMoreActionOpen.value = [index]
}

function closeAction() {
  isMoreActionOpen.value = []
}

function addItem(index: number | null) {
  user.$patch((state) => {
    const newItem = JSON.parse(JSON.stringify(TEMPLATE_LIST_ITEM))
    if (index === null) { state.experience.list.push(newItem) }
    else {
      state.experience.list.splice(index, 0, newItem)
      forceRerender()
    }
  })
}

function toggleCollapseItem(index: number) {
  user.$patch((state) => {
    state.experience.list[index].isCollapsed = !state.experience.list[index].isCollapsed
  })
}

function toggleShowItem(index: number) {
  user.$patch((state) => {
    state.experience.list[index].isShow = !state.experience.list[index].isShow
  })
}

function duplicateItem(index: number) {
  user.$patch((state) => {
    state.experience.list[index].isEditing = false
    const currentItem = JSON.parse(JSON.stringify(state.experience.list[index]))
    state.experience.list.splice(index, 0, currentItem)
  })
  forceRerender()
}

function deleteItem(index: number) {
  if (user.experience.list.length <= 1) return

  user.$patch((state) => {
    state.experience.list.splice(index, 1)
  })
  forceRerender()
}

function toggleDeleteBlockModal() {
  deleteBlockVisible.value = !deleteBlockVisible.value
}

function showDeleteBlockMessage(index: number) {
  toggleDeleteBlockModal()
  deleteIdx.value = index
}

function deleteBlock(index: number) {
  toggleDeleteBlockModal()
  deleteItem(index)
}

function swap(index1, index2) {
  user.$patch((state) => {
    state.experience.list[index1].isEditing = false
    state.experience.list[index2].isEditing = false
    const tmp = state.experience.list[index2]
    state.experience.list[index2] = state.experience.list[index1]
    state.experience.list[index1] = tmp
  })
  forceRerender()
}
</script>

<template>
  <div class="flex items-center gap-2">
    <span class="i-custom:experience icon-32" />
    <div class="flex-1 h-8 overflow-hidden">
      <input
        v-if="isEditName"
        ref="nameInput"
        v-model="experience.name"
        type="text"
        class="w-full h-full leading text-blacks-100 bg-transparent outline-none"
        :title="experience.name"
        @keyup.enter="onEditNameClick"
      >
      <div
        v-else
        class="w-full h-full flex items-center leading leading-6 text-blacks-100 text-ellipsis whitespace-nowrap overflow-hidden bg-transparent"
        :title="experience.name"
      >
        {{ experience.name }}
      </div>
    </div>
    <button @click="onEditNameClick">
      <span
        class="icon-24"
        :class="isEditName ? 'i-custom:ok' : 'i-custom:edit'"
      />
    </button>
    <ToggleSwitch
      :checked="experience.isShow"
      @click="toggleShowAll"
    />
  </div>
  <div class="flex-grow flex flex-col pr-2 -mr-3 overflow-y-auto custom-scrollbar last-child-pb-4">
    <p v-if="!experience.isShow" class="paragraph text-blacks-40">
      {{ HIDDEN_INFORMATION }}
    </p>
    <p v-else class="paragraph text-blacks-70">
      Tell people more about your work experiences. Share more insights to impress you future employers!
    </p>
    <div
      v-for="(item, index) in experience.list"
      :key="componentKey + '-' + index"
      class="transition ease-in-out"
      :class="[
        { group: !isMobileScreen },
        item.isCollapsed ? 'mt-2' : 'mt-6'
      ]"
      @focusin="() => focusIn(index)"
      @focusout="() => focusOut(index)"
    >
      <div class="flex justify-between items-center">
        <div class="flex gap-1 overflow-hidden invisible">
          <h3 v-if="experience.name" class="subleading text-blacks-100 text-ellipsis whitespace-nowrap overflow-hidden">
            {{ experience.name }}
          </h3>
          <span class="subleading text-blacks-100">{{ index + 1 }}</span>
        </div>
        <div
          class="flex items-center gap-3 ml-3"
          :class="{
            'invisible': !isMobileScreen,
            'group-hover:visible': experience.isShow
          }"
        >
          <button v-if="index !== 0 && experience.list.length > 1" @click="swap(index, index - 1)">
            <span class="i-custom:move-up icon-24" />
          </button>
          <button v-if="(index !== experience.list.length - 1) && experience.list.length > 1" @click="swap(index, index + 1)">
            <span class="i-custom:move-down icon-24" />
          </button>
          <div class="relative">
            <button>
              <span
                class="icon-24"
                :class="isMoreActionOpen.includes(index) ? 'i-custom:cancel' : 'i-custom:more'"
                @click.stop="toggleMoreAction(index)"
              />
            </button>
            <div
              v-show="isMoreActionOpen.includes(index)"
              class="absolute right-0 mt-2 w-[262px] bg-white border border-blacks-100 rounded-xl shadow-custom z-1 flex flex-col overflow-hidden"
              @click="toggleMoreAction(null)"
            >
              <button v-if="experience.list.length > 1" class="flex items-center px-4 py-3 hover:bg-primary-10" @click="toggleShowItem(index)">
                <span
                  class="w-6 h-6 text-blacks-70"
                  :class="item.isShow ? 'i-custom:show' : 'i-custom:hide'"
                />
                <span class="paragraph text-blacks-100 ml-2">{{ item.isShow ? 'Hide on CV' : 'Show on CV' }}</span>
              </button>
              <button class="flex items-center px-4 py-3 hover:bg-primary-10" @click="addItem(index + 1)">
                <span class="i-custom:add w-6 h-6 text-blacks-70" />
                <span class="paragraph text-blacks-100 ml-2">Add New</span>
              </button>
              <button class="flex items-center px-4 py-3 hover:bg-primary-10" @click="duplicateItem(index)">
                <span class="i-custom:variant w-6 h-6 text-blacks-70" />
                <span class="paragraph text-blacks-100 ml-2">Duplicate</span>
              </button>
              <button v-if="experience.list.length > 1" class="flex items-center px-4 py-3 hover:bg-primary-10" @click="showDeleteBlockMessage(index)">
                <span class="i-custom:delete w-6 h-6 text-blacks-70" />
                <span class="paragraph text-blacks-100 ml-2">Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="rounded-xl px-4 py-6 flex flex-col gap-6 relative"
        :class="[
          (item.isShow ? 'bg-primary-10': 'bg-blacks-10'),
          (item.isCollapsed ? 'mt-1' : 'mt-3')
        ]"
      >
        <button
          class="absolute top-4 right-4"
          @click.prevent="toggleCollapseItem(index)"
        >
          <span
            class="icon-24"
            :class="item.isCollapsed ? 'i-origin:open' : 'i-origin:close'"
          />
        </button>
        <div>
          <label class="block note text-blacks-70">Title</label>
          <Editor
            v-model="item.title"
            class-name="h-[46px] mt-1"
            :enable="item.isShow"
            :placeholder="DEFAULT_TEMPLATE.experience.list[0].title"
          />
        </div>
        <div :class="item.isCollapsed ? 'hidden' : 'flex flex-col gap-6'">
          <div>
            <label class="block note text-blacks-70">Subtitle (align left)</label>
            <Editor
              v-model="item.subtitle1"
              class-name="h-[46px] mt-1"
              :enable="item.isShow"
              :placeholder="DEFAULT_TEMPLATE.experience.list[0].subtitle1"
            />
          </div>
          <div>
            <label class="block note text-blacks-70">Subtitle (align right)</label>
            <Editor
              v-model="item.subtitle2"
              class-name="h-[46px] mt-1"
              :enable="item.isShow"
              :placeholder="DEFAULT_TEMPLATE.experience.list[0].subtitle2"
            />
          </div>
          <div>
            <label class="block note text-blacks-70">Description</label>
            <Editor
              v-model="item.paragraph"
              class-name="h-[130px] mt-1"
              :enable="item.isShow"
              :placeholder="DEFAULT_TEMPLATE.experience.list[0].paragraph"
            />
          </div>
        </div>
      </div>
    </div>
    <button
      v-if="experience.isShow"
      class="w-full rounded-xl text-blacks-40 inline-flex justify-center items-center p-3 mt-6 border-transparent border-1 group bg-primary-10 hover:border-primary-100"
      :disabled="!experience.isShow"
      @click="addItem(null)"
    >
      <span
        class="i-custom:add w-6 h-6 text-blacks-40 flex-shrink-0"
        :class="experience.isShow && 'group-hover:text-blacks-70'"
      />
      <span class="subleading text-ellipsis whitespace-nowrap overflow-hidden" :class="experience.isShow && 'group-hover:text-blacks-100'">
        Add
      </span>
    </button>
  </div>
  <DeleteBlockModal
    :visible="deleteBlockVisible"
    :delete-idx="deleteIdx"
    :toggle="toggleDeleteBlockModal"
    :delete-item="deleteBlock"
  />
</template>

<route lang="yaml">
meta:
  layout: edit
</route>
