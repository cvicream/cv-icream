<script setup lang="ts">
import type { Step, Survey } from '~/types'

const emit = defineEmits(['submit'])

const props = defineProps<{
  steps: Step[]
}>()

const stepIndex = ref(0)
const survey = ref<Survey>({})
const showOtherInput = ref(false)
const otherValue = ref('')

const currentStep = computed(() => props.steps[stepIndex.value])
watch(currentStep, (newValue, oldValue) => {
  if (otherValue.value) {
    const result = survey.value[oldValue.id].filter(el => !el.startsWith('Others_'))
    result.push(`Others_${otherValue.value}`)
    survey.value[oldValue.id] = result
  }
  showOtherInput.value = false
  otherValue.value = survey.value[newValue.id]?.find(el => !el.startsWith('Others_')) || ''
})

const canSelect = computed(() => {
  const dataLen = survey.value[currentStep.value.id]?.length
  const maximumChoice = currentStep.value.multi?.maximumChoice
  if (dataLen && maximumChoice)
    return dataLen < maximumChoice
  return true
})

function getProgressBarClasses(index: number) {
  const classes: string[] = ['rounded-full border-2.5 border-primary-20 w-[24px] h-[24px] cursor-not-allowed']
  if (index <= stepIndex.value)
    classes.push('bg-primary-100 cursor-pointer')

  return classes.join(' ')
}

function onNext() {
  if (survey.value[currentStep.value.id].length)
    stepIndex.value += 1
}

function onBack() {
  stepIndex.value -= 1
}

function onChangeStep(index: number) {
  if (index <= stepIndex.value)
    stepIndex.value = index
}

function clickOption(value: string, checked: boolean) {
  const data: string[] = survey.value[currentStep.value.id] || []
  let options: string[] = []

  if (value === 'Others') {
    if (!checked) {
      showOtherInput.value = false
      options = data.filter(el => !el.startsWith('Others_'))
    }
    else {
      showOtherInput.value = true
      options = [...data, 'Others_']
    }
  }
  else {
    if (!checked)
      options = data.filter(el => el !== value)
    else
      options = [...data, value]
  }
  survey.value = {
    ...survey.value,
    [currentStep.value.id]: options,
  }
}

function onSubmit() {
  const result = survey.value[currentStep.value.id].filter(el => !el.startsWith('Others_'))
  result.push(`Others_${otherValue.value}`)
  survey.value[currentStep.value.id] = result
  emit('submit', survey.value)
}

</script>

<template>
  <div class="min-w-[352px] bg-white text-center flex flex-col gap-[48px] items-center">
    <div class="flex items-center w-[321px]">
      <template
        v-for="(item, index) in steps"
        :key="item.id"
      >
        <div :class="getProgressBarClasses(index)" @click="onChangeStep(index)" />
        <div v-if="index !== steps.length -1" class="flex-1 h-[1px] border-1 border-blacks-20" />
      </template>
    </div>
    <div class="flex justify-center items-start text-center">
      <div>
        <div class="leading">
          {{ currentStep.title }}
        </div>
        <div class="note text-blacks-60">
          {{ currentStep.description }}
        </div>
      </div>
    </div>
    <div class="text-left flex flex-col gap-5 text-blacks-70">
      <template v-for="option in currentStep.options" :key="`${currentStep.id}_${option.value}`">
        <WizardOption :option="option" :can-select="canSelect" @click-option="clickOption" />
      </template>
      <Transition name="others">
        <div v-if="showOtherInput" class="min-w-[321px] border-1 rounded-xl border-blacks-20 w-100% cursor-pointer p-[12px]">
          <input v-model="otherValue" placeholder="*Your answer..." type="text" class="w-100% h-100% outline-none">
        </div>
      </Transition>
    </div>
    <div class="flex flex-col gap-5">
      <button
        v-if="stepIndex === steps.length - 1"
        :disabled="!survey[currentStep.id]?.length"
        class="w-[294px] btn-primary disabled:btn-disabled"
        @click="onSubmit"
      >
        <span class="subleading vertical-text-top ml-2">
          Submit
        </span>
      </button>
      <button
        v-if="stepIndex !== steps.length - 1"
        :disabled="!survey[currentStep.id]?.length"
        class="w-[294px] btn-primary disabled:btn-disabled"
        @click="onNext"
      >
        <span class="subleading vertical-text-top ml-2">
          Next
        </span>
      </button>
      <button
        v-if="stepIndex !== 0"
        class="w-[294px] btn-secondary"
        @click="onBack"
      >
        <span class="subleading vertical-text-top ml-2">
          Back
        </span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.progress-bar-circle {
  border-radius: 50%;
  position: absolute;
  z-index: 1;
  top: calc(v-bind('top') * 100%);
  left: calc(v-bind('left') * 100%);
}
.others-enter-active,
.others-leave-active {
  transition: all 0.3s ease;
}

.others-enter-from,
.others-leave-to {
  transform: translateY(-40px);
  opacity: 0;
}
</style>
