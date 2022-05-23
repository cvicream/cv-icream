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
    <div class="btn-group-toolbar w-42 h-12 relative">
      <DropdownMenu label="Layout" icon="i-custom:template text-blacks-70">
        <div class="btn-toolbar w-12 h-12">
          <button class="i-custom:template-right w-8 h-8" />
        </div>
        <div class="btn-toolbar w-12 h-12">
          <button class="i-custom:template-left w-8 h-8" />
        </div>
        <div class="btn-toolbar w-12 h-12">
          <button class="i-custom:template-full w-8 h-8" />
        </div>
      </DropdownMenu>
      <DropdownMenu label="Colour" icon="icon-colour">
        <div class="btn-toolbar w-12 h-12">
          <button class="icon-colour icon-48" />
        </div>
        <div class="btn-toolbar w-12 h-12">
          <button class="icon-colour-yellow icon-48" />
        </div>
      </DropdownMenu>
      <DropdownMenu label="Font Size" icon="i-custom:font-size text-blacks-70">
        <div class="btn-toolbar w-12 h-12">
          <button class="i-custom:font-size w-6 h-6" />
        </div>
        <div class="btn-toolbar w-12 h-12">
          <button class="i-custom:font-size  w-8 h-8" />
        </div>
      </DropdownMenu>
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

<style>
:root {
  --default-color: #F18B6BFF;
  --yellow-color:  #FAAA1EFF;
  --green-color:   #507F39FF;
  --blue-color:    #4BA1B4FF;
  --indigo-color:  #005B84FF;
  --purple-color:  #766E8EFF;
  --black-color:   #222222FF;
}

.icon-colour {
  width: 19.2px;
  height: 19.2px;
  background-color: var(--default-color);
  border-radius: 50%;
  box-shadow:
    0 0 0 0.4px #FFFFFFFF,
    0 0 0 2.4px rgb(252, 232, 225, 1);
}

.icon-colour-yellow {
  width: 19.2px;
  height: 19.2px;
  background-color: var(--yellow-color);
  border-radius: 50%;
  box-shadow:
    0 0 0 0.4px #FFFFFFFF,
    0 0 0 2.4px calc(var(--yellow-color)- var(#0x33))
}

</style>
