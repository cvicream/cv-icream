<template>
  <div class="flex justify-between items-center">
    <h2 class="flex items-center">
      <span class="i-custom:contact w-8 h-8 text-blacks-70" />
      <span class="font-normal text-xl text-blacks-100 leading-6 ml-2">Contact</span>
      <span class="ml-1 cursor-pointer" title="Edit">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M18.1694 5.3749C18.067 5.333 17.9572 5.31192 17.8466 5.31288C17.7359 5.31384 17.6266 5.33683 17.5249 5.3805C17.4232 5.42418 17.3313 5.48766 17.2544 5.56725L17.2443 5.57758L10.3333 12.4885V13.6667H11.5115L18.4224 6.75574L18.4327 6.74559C18.5123 6.66871 18.5758 6.57676 18.6195 6.47509C18.6632 6.37342 18.6862 6.26407 18.6871 6.15342C18.6881 6.04277 18.667 5.93304 18.6251 5.83062C18.5832 5.72821 18.5213 5.63517 18.4431 5.55692C18.3648 5.47868 18.2718 5.4168 18.1694 5.3749ZM17.8321 3.64627C18.164 3.64339 18.4932 3.70664 18.8005 3.83235C19.1077 3.95805 19.3868 4.14368 19.6216 4.37841C19.8563 4.61314 20.0419 4.89227 20.1676 5.19951C20.2933 5.50675 20.3566 5.83595 20.3537 6.1679C20.3508 6.49985 20.2819 6.8279 20.1508 7.13291C20.0209 7.43547 19.8324 7.70934 19.5963 7.93882L12.4459 15.0892C12.2896 15.2455 12.0777 15.3333 11.8567 15.3333H9.5C9.03976 15.3333 8.66667 14.9602 8.66667 14.5V12.1433C8.66667 11.9223 8.75446 11.7104 8.91074 11.5541L16.0611 4.40367C16.2906 4.16758 16.5645 3.97912 16.8671 3.84915C17.1721 3.71812 17.5001 3.64916 17.8321 3.64627ZM5.23223 6.06556C5.70107 5.59672 6.33696 5.33333 7 5.33333H11.1667C11.6269 5.33333 12 5.70642 12 6.16666C12 6.6269 11.6269 6.99999 11.1667 6.99999H7C6.77899 6.99999 6.56702 7.08779 6.41074 7.24407C6.25446 7.40035 6.16667 7.61231 6.16667 7.83333V17C6.16667 17.221 6.25446 17.433 6.41074 17.5892C6.56702 17.7455 6.77899 17.8333 7 17.8333H16.1667C16.3877 17.8333 16.5996 17.7455 16.7559 17.5892C16.9122 17.433 17 17.221 17 17V12.8333C17 12.3731 17.3731 12 17.8333 12C18.2936 12 18.6667 12.3731 18.6667 12.8333V17C18.6667 17.663 18.4033 18.2989 17.9344 18.7678C17.4656 19.2366 16.8297 19.5 16.1667 19.5H7C6.33696 19.5 5.70107 19.2366 5.23223 18.7678C4.76339 18.2989 4.5 17.663 4.5 17V7.83333C4.5 7.17028 4.76339 6.5344 5.23223 6.06556Z" fill="#A7A7A7" />
        </svg>
      </span>
    </h2>
    <ToggleSwitch checked />
  </div>
  <h3 class="font-normal text-lg text-blacks-100 leading-[1.375rem] mt-7">
    Contact 1
  </h3>
  <form class="bg-primary-10 rounded-xl mt-3 px-4 py-6 flex flex-col gap-6">
    <div>
      <label
        class="font-normal text-sm text-blacks-70 leading-[1.125rem] block"
      >
        Title
      </label>
      <input
        type="text"
        name="title"
        placeholder="MA Illustration and Book Arts"
        class="w-full bg-white rounded-xl outline-none font-normal text-base text-blacks-40 placeholder-blacks-40 leading-[1.375rem] block mt-1 px-4 py-3"
      >
    </div>
    <div>
      <label
        class="font-normal text-sm text-blacks-70 leading-[1.125rem] block"
      >
        Subtitle
      </label>
      <input
        type="text"
        name="subtitle"
        placeholder="Personal"
        class="w-full bg-white rounded-xl outline-none font-normal text-base text-blacks-40 placeholder-blacks-40 leading-[1.375rem] block mt-1 px-4 py-3"
      >
    </div>
    <div>
      <label
        class="font-normal text-sm text-blacks-70 leading-[1.125rem] block"
      >
        Paragraph
      </label>
      <textarea
        name="paragraph"
        rol="10"
        cols="50"
        class="w-full bg-white rounded-xl outline-none font-normal text-base text-blacks-40 placeholder-blacks-40 leading-[1.375rem] block mt-1 px-4 py-3"
      >+4475 9100 8940&#10;sunshanillustration@gmail.com&#10;56 Blackhorse Drive,&#10;Old Stratford, Milton Keynes,&#10;MK19 6FH, UK</textarea>
    </div>
  </form>
  <button class="w-full bg-primary-10 rounded-xl font-normal text-lg text-blacks-40 leading-[1.375rem] flex justify-center items-center mt-6 py-3">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.16667C12.4602 6.16667 12.8333 6.53977 12.8333 7.00001V11.1667H17C17.4602 11.1667 17.8333 11.5398 17.8333 12C17.8333 12.4602 17.4602 12.8333 17 12.8333H12.8333V17C12.8333 17.4602 12.4602 17.8333 12 17.8333C11.5398 17.8333 11.1667 17.4602 11.1667 17V12.8333H7C6.53976 12.8333 6.16666 12.4602 6.16666 12C6.16666 11.5398 6.53976 11.1667 7 11.1667H11.1667V7.00001C11.1667 6.53977 11.5398 6.16667 12 6.16667Z" fill="#A7A7A7" />
    </svg>
    Add contact
  </button>
</template>

<route lang="yaml">
meta:
  layout: edit
</route>
