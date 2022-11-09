<script setup lang="ts">
import { Console } from 'console'
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

// if (1) { // remove all the :hover stylesheets
//   try { // prevent exception on browsers not supporting DOM styleSheets properly
//     for (const si in document.styleSheets) {
//       const styleSheet = document.styleSheets[si]
//       const cssRules = styleSheet.cssRules
//       if (!cssRules) continue

//       for (let ri = cssRules.length - 1; ri >= 0; ri--) {
//         const rule = cssRules[ri]

//         if (!(rule instanceof CSSStyleRule)) continue

//         if (!rule.selectorText) continue
//         if (rule.selectorText.match(':hover') || rule.selectorText.match('.group-hover'))
//           styleSheet.deleteRule(ri)

//         if (!(rule instanceof CSSStyleRule))
//           continue
//       }

//       for (let ri = cssRules.length - 1; ri >= 0; ri--) {
//         const rule = cssRules[ri]

//         if (!(rule instanceof CSSStyleRule)) continue

//         if (!rule.selectorText) continue
//         if (rule.selectorText.match(':hover'))
//           styleSheet.deleteRule(ri)

//         if (!(rule instanceof CSSStyleRule))
//           continue
//       }
//     }
//   }
//   catch (ex) {}
// }

(function() {
  let isTouch = false // var to indicate current input type (is touch versus no touch)
  let isTouchTimer
  let curRootClass = '' // var indicating current document root class ("can-touch" or "")

  function addtouchclass(e) {
    clearTimeout(isTouchTimer)
    isTouch = true
    if (!curRootClass.match(':hover')) { // add "can-touch' class if it's not already present
      curRootClass = ':hover'
      document.documentElement.classList.add(curRootClass)
    }
    isTouchTimer = setTimeout(() => { isTouch = false }, 500) // maintain "istouch" state for 500ms so removetouchclass doesn't get fired immediately following a touch event
  }

  function removetouchclass(e) {
    if (!isTouch && curRootClass.match(':hover')) { // remove 'can-touch' class if not triggered by a touch event and class is present
      isTouch = false
      curRootClass = ''
      document.documentElement.classList.remove(':hover')
    }
  }

  document.addEventListener('touchstart', addtouchclass, false) // this event only gets called when input type is touch
  document.addEventListener('mouseenter', addtouchclass, false) // this event only gets called when input type is touch
  document.addEventListener('touchmove', removetouchclass, false) // this event gets called when input type is everything from touch to mouse/ trackpad
  document.addEventListener('mouseover', removetouchclass, false) // this event gets called when input type is everything from touch to mouse/ trackpad
  document.addEventListener('click', removetouchclass, false) // this event gets called when input type is everything from touch to mouse/ trackpad
})()

</script>

<template>
  <router-view />
</template>
