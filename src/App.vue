<script setup lang="ts">
import { useToolbarStore } from '~/stores/toolbar'
import { getColor, isMobileDevice, setCssVariable, setStatus } from '~/utils'

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'CV Icream',
  meta: [
    { name: 'description', content: '' },
  ],
})

const toolbar = useToolbarStore()

toolbar.$subscribe((mutation, state) => {
  const color = getColor(state.currentState.color)
  setCssVariable('--primary-color', color.primary)
  setCssVariable('--secondary-color', color.secondary)
  setCssVariable('--shadow-color', color.shadow)
  setCssVariable('--border-color', color.border)
})

setStatus({ isEditing: false })

function hasTouch() {
  return 'ontouchstart' in document.documentElement
         || navigator.maxTouchPoints > 0
         // || navigator.msMaxTouchPoints > 0
}

if (hasTouch() || isMobileDevice()) { // remove all the :hover stylesheets
  try { // prevent exception on browsers not supporting DOM styleSheets properly
    for (const si in document.styleSheets) {
      const styleSheet = document.styleSheets[si]
      const cssRules = styleSheet.cssRules
      if (!cssRules) continue

      for (let ri = cssRules.length - 1; ri >= 0; ri--) {
        const rule = cssRules[ri]
        if (!(rule instanceof CSSStyleRule)) continue

        if (!rule.selectorText) continue

        if (rule.selectorText.match(':hover') || rule.selectorText.match('.group:hover'))
          styleSheet.deleteRule(ri)

        if (!(rule instanceof CSSStyleRule))
          continue
      }
    }
  }
  catch (ex) {}
}

</script>

<template>
  <router-view />
</template>
