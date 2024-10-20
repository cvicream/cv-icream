<script setup lang="ts">
import type { Step, Survey } from '~/types'

const emit = defineEmits(['submit'])
const router = useRouter()

const props = defineProps<{
  steps: Step[]
}>()

const stepIndex = ref(0)
const survey = ref<Survey>({})
const showOtherInput = ref(false)
const showModal = ref(false)
const otherValue = ref('')
const hasEmptyValue = ref(false)

const currentStep = computed(() => props.steps[stepIndex.value])
const getOtherOptionStyles = computed(() => {
  const styles: string[] = ['sm:min-w-[351px] border-1 rounded-xl w-100% cursor-pointer p-[12px]']
  if (hasEmptyValue.value)
    styles.push('border-warning-20')
  else
    styles.push('border-blacks-20 ')

  return styles.join(' ')
})
watch(currentStep, (newValue, oldValue) => {
  document.querySelector('.custom-scrollbar')?.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  hasEmptyValue.value = false
  if (otherValue.value) {
    const result = survey.value[oldValue.id].filter(el => !el.startsWith('Others_'))
    result.push(`Others_${otherValue.value}`)
    survey.value[oldValue.id] = result
  }
  if (stepIndex.value === props.steps.length) {
    emit('submit', survey.value)
    return
  }

  let newOtherValue = survey.value[newValue.id]?.find(el => el.startsWith('Others_')) || ''
  if (newOtherValue) {
    newOtherValue = newOtherValue.split('Others_')[1]
    showOtherInput.value = true
    otherValue.value = newOtherValue
    return
  }
  showOtherInput.value = false
  otherValue.value = ''
})

const canSelect = computed(() => {
  const dataLen = survey.value[currentStep.value.id]?.length
  const maximumChoice = currentStep.value.multi?.maximumChoice
  if (dataLen && maximumChoice)
    return dataLen < maximumChoice
  return true
})

function isSelected(value: any) {
  return value !== 'Others'
    ? !!survey.value[currentStep.value.id]?.includes(value)
    : !!survey.value[currentStep.value.id]?.find(el => el.startsWith('Others_'))
}

function getProgressBarClasses(index: number) {
  const classes: string[] = ['rounded-full border-2.5 border-primary-20 w-[24px] h-[24px] cursor-not-allowed']
  if (index <= stepIndex.value)
    classes.push('bg-primary-100 cursor-pointer')

  return classes.join(' ')
}

function onNext() {
  if (survey.value[currentStep.value.id]?.find(el => el.startsWith('Others_')) && !otherValue.value) {
    hasEmptyValue.value = true
    return
  }
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

function toggleModal() { showModal.value = !showModal.value }

</script>

<template>
  <Modal
    v-if="showModal"
    class="select-none"
    title="Wait, your feedback matters!"
    subtitle="It takes 30 seconds to help us create a better CV editing experience for you."
    @close="toggleModal"
  >
    <div class="flex flex-col gap-[24px]">
      <div class="flex flex-col gap-5 sm:gap-6 mt-8 sm:flex-row sm:justify-between">
        <button
          class="btn-secondary px-0 w-[164px]"
          @click="router.push('/dashboard')"
        >
          <span class="subleading">
            Skip for now
          </span>
        </button>
        <button
          class="btn-primary px-0 w-[164px]"
          @click="toggleModal"
        >
          <span class="subleading">
            Sure, I'll help!
          </span>
        </button>
      </div>
    </div>
  </Modal>
  <div class="min-w-[352px] bg-white text-center flex flex-col gap-[48px] items-center">
    <div class="flex items-center w-100%  sm:w-[468px]">
      <template
        v-for="(item, index) in steps"
        :key="item.id"
      >
        <div :class="getProgressBarClasses(index)" @click="onChangeStep(index)" />
        <div v-if="index !== steps.length -1" class="flex-1 h-[1px] border-1 border-blacks-20" />
      </template>
    </div>
    <div class="flex justify-center items-start text-center">
      <div class="flex flex-col gap-[5px]">
        <div class="heading2-mobile sm:heading2">
          {{ currentStep.title }}
        </div>
        <div class="note text-blacks-60">
          {{ currentStep.description }}
        </div>
      </div>
    </div>
    <div class="text-left flex flex-col gap-[16px] text-blacks-70">
      <div v-if="stepIndex === 0" class="skip text-right cursor-pointer" @click="toggleModal">
        Skip
      </div>
      <template v-for="option in currentStep.options" :key="`${currentStep.id}_${option.value}`">
        <WizardOption :option="option" :can-select="canSelect" :selected="isSelected(option.value)" @click-option="clickOption" />
      </template>
      <Transition name="others">
        <div v-if="showOtherInput" :class="getOtherOptionStyles">
          <input v-model="otherValue" placeholder="*Your answer..." type="text" class="w-100% h-100% outline-none paragraph">
        </div>
      </Transition>
      <div v-if="showOtherInput && hasEmptyValue" class="text-warning mt-[-12px] note">
        This answer is required.
      </div>
      <div class="flex flex-col gap-5 mt-[32px]">
        <button
          :disabled="!survey[currentStep.id]?.length"
          class="btn-primary disabled:btn-disabled"
          @click="onNext"
        >
          <span class="subleading vertical-text-top ml-2">
            {{ stepIndex === steps.length - 1 ? 'Submit' : 'Next' }}
          </span>
        </button>
        <button
          v-if="stepIndex !== 0"
          class="btn-secondary"
          @click="onBack"
        >
          <span class="subleading vertical-text-top ml-2">
            Back
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
