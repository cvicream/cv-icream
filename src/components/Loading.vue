<template>
  <div class="loader flex-inline gap-3 flex-shrink-0">
    <span class="w-2.5 h-2.5 bg-white rounded-full" />
    <span class="w-2.5 h-2.5 bg-white rounded-full" />
    <span class="w-2.5 h-2.5 bg-white rounded-full" />
  </div>
</template>

<style scoped>
.loader span {
  animation: moving 1s linear infinite;
}
.loader span:nth-child(2) {
  animation-delay: 0.33s;
}
.loader span:nth-child(3) {
  animation-delay: 0.66s;
}

@keyframes moving {
  33%  { opacity: 0.2; }
  66%  { opacity: 0.5; }
  100% { opacity: 0.8; }
}
</style>
