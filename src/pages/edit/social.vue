<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'
import { DEFAULT_TEMPLATE, HIDDEN_INFORMATION, TEMPLATE_LIST_ITEM } from '~/constants'

const user = useUserStore()
const { social } = storeToRefs(user)
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
    state.social.list[index].isEditing = true
  })
}

function focusOut(index) {
  user.$patch((state) => {
    state.social.list[index].isEditing = false
  })
}

function toggleShowAll() {
  user.$patch((state) => {
    state.social.isShow = !state.social.isShow
    state.social.list.forEach(item => item.isShow = state.social.isShow)
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
    if (index === null) { state.social.list.push(newItem) }
    else {
      state.social.list.splice(index, 0, newItem)
      forceRerender()
    }
  })
}

function toggleCollapseItem(index: number) {
  user.$patch((state) => {
    state.social.list[index].isCollapsed = !state.social.list[index].isCollapsed
  })
}

function toggleShowItem(index: number) {
  user.$patch((state) => {
    state.social.list[index].isShow = !state.social.list[index].isShow
  })
}

function duplicateItem(index: number) {
  user.$patch((state) => {
    state.social.list[index].isEditing = false
    const currentItem = JSON.parse(JSON.stringify(state.social.list[index]))
    state.social.list.splice(index, 0, currentItem)
  })
  forceRerender()
}

function deleteItem(index: number) {
  if (user.social.list.length <= 1) return

  user.$patch((state) => {
    state.social.list.splice(index, 1)
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
    state.social.list[index1].isEditing = false
    state.social.list[index2].isEditing = false
    const tmp = state.social.list[index2]
    state.social.list[index2] = state.social.list[index1]
    state.social.list[index1] = tmp
  })
  forceRerender()
}
</script>

<template>
  <div class="flex items-center gap-2">
    <span class="i-custom:social icon-32" />
    <div class="flex-1 h-8 overflow-hidden">
      <input
        v-if="isEditName"
        ref="nameInput"
        v-model="social.name"
        type="search"
        class="w-full h-full leading text-blacks-100 bg-transparent outline-none"
        :title="social.name"
        @keyup.enter="onEditNameClick"
      >
      <div
        v-else
        class="w-full h-full flex items-center leading leading-6 text-blacks-100 text-ellipsis whitespace-nowrap overflow-hidden bg-transparent"
        :title="social.name"
      >
        {{ social.name }}
      </div>
    </div>
    <button @click="onEditNameClick">
      <span
        class="icon-24"
        :class="isEditName ? 'i-custom:ok' : 'i-custom:edit'"
      />
    </button>
    <ToggleSwitch
      :checked="social.isShow"
      @click="toggleShowAll"
    />
  </div>
  <div class="flex-grow flex flex-col pr-2 -mr-3 overflow-y-auto custom-scrollbar last-child-pb-4">
    <p v-if="!social.isShow" class="paragraph text-blacks-40">
      {{ HIDDEN_INFORMATION }}
    </p>
    <p v-else class="paragraph text-blacks-70">
      Share your social media platforms, such as LinkedIn profile, the portfolio of your work, or your own website.
    </p>
    <div
      v-for="(item, index) in social.list"
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
          <h3 v-if="social.name" class="subleading text-blacks-100 text-ellipsis whitespace-nowrap overflow-hidden">
            {{ social.name }}
          </h3>
          <span class="subleading text-blacks-100">{{ index + 1 }}</span>
        </div>
        <div
          class="flex items-center gap-3 ml-3"
          :class="{
            'invisible': !isMobileScreen,
            'group-hover:visible': social.isShow
          }"
        >
          <Tooltip
            v-if="index !== 0 && social.list.length > 1"
            placement="bottom"
            text="Move up"
          >
            <button @click="swap(index, index - 1)">
              <span class="i-custom:move-up icon-24" />
            </button>
          </Tooltip>
          <Tooltip
            v-if="(index !== social.list.length - 1) && social.list.length > 1"
            placement="bottom"
            text="Move down"
          >
            <button @click="swap(index, index + 1)">
              <span class="i-custom:move-down icon-24" />
            </button>
          </Tooltip>
          <Tooltip
            placement="left"
            text="More Actions..."
          >
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
                <button v-if="social.list.length > 1" class="flex items-center px-4 py-3 hover:bg-primary-10" @click="toggleShowItem(index)">
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
                <button v-if="social.list.length > 1" class="flex items-center px-4 py-3 hover:bg-primary-10" @click="showDeleteBlockMessage(index)">
                  <span class="i-custom:delete w-6 h-6 text-blacks-70" />
                  <span class="paragraph text-blacks-100 ml-2">Delete</span>
                </button>
              </div>
            </div>
          </Tooltip>
        </div>
      </div>
      <div
        class="rounded-xl px-4 pt-2 pb-6 flex flex-col relative"
        :class="[
          (item.isShow ? 'bg-primary-10': 'bg-blacks-10'),
          (item.isCollapsed ? 'mt-1' : 'mt-3')
        ]"
      >
        <div class="flex justify-end">
          <Tooltip
            placement="left"
            :text="item.isCollapsed ? 'Expand block' : 'Collapse block'"
          >
            <button
              class="w-6 h-6"
              @click.prevent="toggleCollapseItem(index)"
            >
              <span
                class="icon-24"
                :class="item.isCollapsed ? 'i-origin:open' : 'i-origin:close'"
              />
            </button>
          </Tooltip>
        </div>
        <div class="-mt-2">
          <label class="block note text-blacks-70">Type</label>
          <Editor
            v-model="item.type"
            class-name="h-[46px] mt-1"
            :enable="item.isShow"
            :placeholder="DEFAULT_TEMPLATE.social.list[0].type"
            :is-single-line="true"
          />
        </div>
        <div
          class="mt-6"
          :class="item.isCollapsed ? 'hidden' : 'flex flex-col gap-6'"
        >
          <div>
            <label class="block note text-blacks-70">Link</label>
            <input
              v-model="item.link"
              type="search"
              class="form-input mt-1"
              :class="{'bg-blacks-5': !social.isShow}"
              :enable="item.isShow"
              :placeholder="DEFAULT_TEMPLATE.social.list[0].link"
              :is-single-line="true"
            >
          </div>
        </div>
      </div>
    </div>
    <button
      v-if="social.isShow"
      class="w-full rounded-xl text-blacks-40 inline-flex justify-center items-center p-3 mt-6 border-transparent border-1 group bg-primary-10 hover:border-primary-100"
      :disabled="!social.isShow"
      @click="addItem(null)"
    >
      <span
        class="i-custom:add w-6 h-6 text-blacks-40 flex-shrink-0"
        :class="social.isShow && 'group-hover:text-blacks-70'"
      />
      <span class="subleading text-ellipsis whitespace-nowrap overflow-hidden" :class="social.isShow && 'group-hover:text-blacks-100'">
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
