<template>
  <div class="w-full h-20 text-center bg-white flex justify-between gap-4 px-4 py-4 border-t-1 border-blacks-20 sm:w-auto sm:border-0 sm:rounded-xl sm:shadow-custom">
    <div class="btn-group-toolbar w-22 h-12">
      <div class="btn-toolbar">
        <button class="i-custom:undo w-8 h-8" />
      </div>
      <div class="btn-toolbar">
        <button class="i-custom:redo w-8 h-8" />
      </div>
    </div>
    <div class="btn-group-toolbar w-42 h-12">
      <DropdownMenu label="Layout" icon="i-custom:template">
        <div class="btn-toolbar">
          <button class="i-custom:template icon-48" />
        </div>
        <div class="btn-toolbar">
          <button class="i-custom:template icon-48" />
        </div>
      </DropdownMenu>
      <div class="btn-toolbar w-8 h-8">
        <div class="icon-colour" />
      </div>
      <div class="btn-toolbar">
        <button class="i-custom:font-size w-8 h-8" />
      </div>
      <div class="btn-toolbar">
        <button class="i-custom:font-family w-8 h-8" />
      </div>
    </div>
    <div class="btn-group-toolbar w-22 h-12">
      <div class="btn-toolbar">
        <button class="i-custom:note w-8 h-8" />
      </div>
      <div class="btn-toolbar">
        <button class="i-custom:feedback w-8 h-8" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon-colour {
  width: 19.2px;
  height: 19.2px;
  background-color: rgb(241, 139, 107, 1);
  border-radius: 50%;
  box-shadow:
    0 0 0 0.4px rgb(255, 255, 255, 1),
    0 0 0 2.4px rgb(252, 232, 225, 1);
}
</style>
