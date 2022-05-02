<template>
  <div class="w-110 h-20 text-center flex justify-between px-4 py-4 rounded-xl shadow-custom">
    <div class="btn-group-toolbar w-22 h-12">
      <button class="btn-toolbar i-custom:undo w-8 h-8">
        <!-- <span class="hover:flex hover:inline-block hover:w-8 hover:h-8 hover:p-2 hover:rounded-full hover:shadow-custom hover:bg-primary-10" /> -->
      </button>
      <button class="btn-toolbar i-custom:redo w-8 h-8" />
    </div>
    <div class="btn-group-toolbar w-42 h-12">
      <button class="btn-toolbar i-custom:template w-8 h-8" />
      <button class="btn-toolbar w-8 h-8">
        <span class="icon-colour" />
      </button>
      <button class="btn-toolbar i-custom:font-size w-8 h-8" />
      <button class="btn-toolbar i-custom:font-family w-8 h-8" />
    </div>
    <div class="btn-group-toolbar w-22 h-12">
      <button class="btn-toolbar i-custom:note w-8 h-8" />
      <button class="btn-toolbar i-custom:feedback w-8 h-8" />
    </div>
  </div>
</template>

<style scoped>
.icon-colour {
  width: 24px;
  height: 24px;
  padding: 1px;
  background-color: rgb(241, 139, 107, 1);
  border-radius: 50%;
  box-shadow:
    0 0 0 0.4px rgb(255, 255, 255, 1),
    0 0 0 2.4px rgb(252, 232, 225, 1);
}
</style>
