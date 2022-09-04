<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { DEFAULT_TEMPLATE, HIDDEN_INFORMATION, TEMPLATE_LIST_ITEM } from '~/constants'

const user = useUserStore()
const { social } = storeToRefs(user)

const isEditName = ref(false)
const nameInput = ref<HTMLInputElement | null>(null)
const componentKey = ref(0) // force Editor component to re-render

function forceRerender() {
  componentKey.value += 1
}

function onEditNameClick() {
  isEditName.value = !isEditName.value
  if (nameInput.value) {
    if (isEditName.value) {
      nameInput.value.disabled = false
      nameInput.value.focus()
      nameInput.value.select()
    }
    else {
      nameInput.value.disabled = true
    }
  }
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

function addItem() {
  user.$patch((state) => {
    const newItem = JSON.parse(JSON.stringify(TEMPLATE_LIST_ITEM))
    state.social.list.push(newItem)
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
}
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="flex items-center">
      <span class="i-custom:social icon-32" />
      <input
        ref="nameInput"
        v-model="social.name"
        type="text"
        maxlength="15"
        class="max-w-[132px] h-6 leading text-blacks-100 text-ellipsis whitespace-nowrap overflow-hidden bg-transparent outline-none ml-2"
        :title="social.name"
        :disabled="!isEditName"
      >
      <button class="ml-1" @click="onEditNameClick">
        <span
          class="icon-24"
          :class="isEditName ? 'i-custom:ok' : 'i-custom:edit'"
        />
      </button>
    </h2>
    <ToggleSwitch
      :checked="social.isShow"
      @click="toggleShowAll"
    />
  </div>
  <div class="flex flex-col gap-6 pr-2 -mr-3 overflow-y-scroll custom-scrollbar">
    <p v-if="!social.isShow" class="paragraph text-blacks-40">
      {{ HIDDEN_INFORMATION }}
    </p>
    <p v-else class="paragraph text-blacks-70">
      Share your social media platforms, such as LinkedIn profile, the portfolio of your works, or your own website.
    </p>
    <div
      v-for="(item, index) in social.list"
      :key="componentKey + '-' + index"
      class="group"
      @focusin="() => focusIn(index)"
      @focusout="() => focusOut(index)"
    >
      <div class="flex justify-between items-center">
        <div>
          <h3 v-if="social.name" class="subleading text-blacks-100">
            {{ social.name[0]?.toUpperCase() + social.name.slice(1).toLowerCase() + ' ' + (index + 1) }}
          </h3>
        </div>
        <div
          class="invisible flex items-center gap-3"
          :class="{ 'group-hover:visible': social.isShow }"
        >
          <button v-if="social.list.length > 1" @click="toggleShowItem(index)">
            <span
              class="icon-24"
              :class="item.isShow ? 'i-custom:show' : 'i-custom:hide'"
            />
          </button>
          <button @click="duplicateItem(index)">
            <span class="i-custom:variant icon-24" />
          </button>
          <button v-if="social.list.length > 1" @click="deleteItem(index)">
            <span class="i-custom:delete icon-24" />
          </button>
        </div>
      </div>
      <div
        class="rounded-xl mt-3 px-4 py-6 flex flex-col gap-6 relative"
        :class="[(item.isShow ? 'bg-primary-10': 'bg-blacks-10')]"
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
          <label class="note text-blacks-70">Type</label>
          <Editor
            v-model="item.type"
            class-name="h-[46px]"
            :enable="item.isShow"
            :placeholder="DEFAULT_TEMPLATE.social.list[0].type"
            :is-single-line="true"
          />
        </div>
        <div :class="item.isCollapsed ? 'hidden' : 'flex flex-col gap-6'">
          <div>
            <label class="note text-blacks-70">Link</label>
            <input
              v-model="item.link"
              class="form-input"
              :enable="item.isShow"
              :placeholder="DEFAULT_TEMPLATE.social.list[0].link"
              :is-single-line="true"
            >
          </div>
        </div>
      </div>
    </div>
    <button
      class="w-full rounded-xl text-blacks-40 inline-flex justify-center items-center py-3 border-transparent border-1 group"
      :class="social.isShow ? 'bg-primary-10 hover:border-primary-100 ' : 'bg-blacks-10'"
      :disabled="!social.isShow"
      @click="addItem"
    >
      <span
        class="i-custom:add w-6 h-6 text-blacks-40"
        :class="social.isShow && 'group-hover:text-blacks-70'"
      />
      <span class="subleading" :class="social.isShow && 'group-hover:text-blacks-100'">
        Add {{ social.name.toLowerCase() }}
      </span>
    </button>
  </div>
</template>

<route lang="yaml">
meta:
  layout: edit
</route>
