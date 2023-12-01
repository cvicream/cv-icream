import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  shortcuts: [
    ['heading1', 'font-mark font-normal text-6xl leading-[4.875rem]'],
    ['heading1-mobile', 'font-mark font-normal text-size-[32px] leading-[2.75rem]'],
    ['heading2', 'font-mark font-normal text-32 leading-[2.75rem]'],
    ['heading2-mobile', 'font-mark font-normal text-size-[24px] leading-[2rem]'],
    ['leading', 'font-mark font-normal text-xl leading-[2rem]'],
    ['leading2', 'font-mark font-normal text-size-[32px] leading-[2.75rem]'],
    ['subleading', 'font-mark font-normal text-lg leading-[1.375rem]'],
    ['paragraph', 'font-mark font-normal text-base leading-[1.375rem]'],
    ['note', 'font-mark font-normal text-sm leading-[1.125rem]'],
    ['btn-primary', 'h-12 px-10 rounded-xl text-white bg-primary-100 border-1 border-transparent transition duration-300 ease-out sm:hover:border-primary-20'],
    ['btn-secondary', 'h-12 px-10 rounded-xl text-blacks-100 bg-white border-1 border-primary-100 transition duration-300 ease-out sm:hover:bg-primary-10'],
    ['btn-icon-48', 'w-12 h-12 p-2 rounded-full text-blacks-70 bg-white shadow-custom sm:hover:bg-primary-10'],
    ['btn-icon-48-fill', 'w-12 h-12 p-[calc(0.5rem-1px)] rounded-full text-white bg-primary-100 shadow-custom border-1 border-transparent sm:hover:border-primary-20'],
    ['btn-icon-32', 'w-8 h-8 flex flex-shrink-0 justify-center items-center text-blacks-70 rounded-full outline-none sm:hover:bg-primary-10'],
    ['btn-icon-24', 'w-6 h-6 flex flex-shrink-0 justify-center items-center text-blacks-70 rounded-full outline-none sm:hover:bg-primary-10'],
    ['icon-32', 'w-8 h-8 p-1 block text-blacks-70'],
    ['icon-32-fill', 'w-8 h-8 block text-block'],
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer sm:hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out sm:hover:opacity-100 sm:hover:text-teal-600 cursor-pointer'],
    ['btn-radio', 'w-6 h-6 appearance-none border border-blacks-70 rounded-full bg-clip-content p-1 checked:bg-primary-70 cursor-pointer'],
    ['btn-header', 'flex inline-block w-8 h-8 p-2 bg-white rounded-full shadow-custom'],
    ['icon-24', 'w-6 h-6 text-blacks-40 select-none sm:hover:text-blacks-70'],
    ['icon-48', 'w-12 h-12 text-blacks-70 rounded-full border-1 border-transparent border-primary-100 shadow-custom'],
    ['btn-toolbar', 'flex justify-center items-center text-blacks-70 sm:hover:bg-primary-10 sm:hover:rounded-full disabled:bg-white'],
    ['btn-group-toolbar', 'flex justify-center items-center gap-2 bg-white rounded-[69px] shadow-custom px-2 py-2'],
    ['hashtag', 'px-2 py-1 font-normal text-size-[11px] leading-[13px] rounded'],
    ['heading-default', 'font-normal text-size-[40px] leading-[48px]'],
    ['title-default', 'font-normal text-size-[16px] leading-[22px]'],
    ['subtitle-default', 'font-normal text-size-[14px] leading-[20px]'],
    ['paragraph-default', 'font-normal text-size-[12px] leading-[16px] whitespace-pre-wrap'],
    ['heading-large', 'font-normal text-size-[48px] leading-[62px]'],
    ['title-large', 'font-normal text-size-[22px] leading-[30px]'],
    ['subtitle-large', 'font-normal text-size-[18px] leading-[24px]'],
    ['paragraph-large', 'font-normal text-size-[16px] leading-[22px]'],

    ['form-label', 'font-normal text-sm text-blacks-70 leading-[1.125rem] block'],
    ['form-input', 'w-full h-[46px] bg-white rounded-xl appearance-none outline-none font-normal text-base text-blacks-100 disabled:text-blacks-40 placeholder-blacks-40 focus:placeholder-transparent pl-4 pr-2 py-3 border-1 border-transparent sm:hover:border-blacks-100 sm:hover:disabled:border-white focus:text-blacks-100'],
    ['form-textarea', 'w-full h-[130px] bg-white rounded-xl outline-none font-normal text-base text-blacks-100 resize-none disabled:text-blacks-40 placeholder-blacks-40 focus:placeholder-transparent mt-1 px-4 py-3 border-1 border-white transition-all duration-500 sm:hover:border-blacks-100 sm:hover:disabled:border-white focus:text-blacks-100'],
    ['dropdown-menu', 'w-full bg-white border rounded-xl'],
    ['dropdown-item', 'w-full bg-white font-normal font-mark text-blacks-100 text-base leading-[22px] sm:hover:bg-primary-10'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1,
      warn: true,
      collections: {
        custom: FileSystemIconLoader( // class="i-custom:<svg_filename>"
          './src/assets/icons',
          svg => svg.replace('fill="none"', '').replace(/^<svg /, '<svg fill="currentColor" '),
        ),
        origin: FileSystemIconLoader( // class="i-origin:<svg_filename>" which is for logo
          './src/assets/icons',
          svg => svg,
        ),
      },
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        'mark': 'Mark Pro',
        'gill-sans': 'Gill Sans',
        'sans': 'DM Sans',
        'serif': 'DM Serif Display',
        'mono': 'DM Mono',
        'helvetica': 'Helvetica',
        'arial': 'Arial',
        'lato': 'Lato',
        'times-new-roman': 'Times New Roman',
        'georgia': 'Georgia',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: [
    'prose', 'prose-sm', 'm-auto', 'text-left',
    'i-custom:layout-right', 'i-custom:layout-left', 'i-custom:layout-full',
    'i-custom:idea',
    'font-arial', 'font-georgia', 'font-gill-sans', 'font-helvetica', 'font-times-new-roman', 'font-lato',
    'w-[262px]', 'w-[260px]', 'rounded-t-xl', 'rounded-b-xl',
    'i-custom:behance',
    'i-custom:instagram',
    'i-custom:facebook',
    'i-custom:linkedin',
    'i-custom:whatsapp',
    'i-custom:youtube',
    'i-custom:mail',
    'i-custom:twitter',
  ],
  theme: {
    fontSize: {
      10: '10px',
      11: '11px',
      14: '14px',
      20: '20px',
      32: '32px',
      40: '40px',
    },
    colors: {
      primary: { // class="text-primary-100"
        10: 'var(--secondary-color)',
        20: '#FCE8E1',
        40: 'var(--border-color)',
        70: '#F6AF98',
        100: 'var(--primary-color)',
      },
      blacks: { // class="text-blacks-100"
        5: '#F4F4F4',
        10: '#E9E9E9',
        20: '#D3D3D3',
        40: '#A7A7A7',
        60: '#7A7A7A',
        70: '#656565',
        100: '#222222',
      },
      yellow: '#FFF6BC',
      greens: {
        10: '#EDF2EB',
        100: '#507F39',
      },
      success: '#72B355',
      warning: '#DE6D6D',
      payment: '#FFC43A',
    },
    boxShadow: {
      custom: '2px 2px 10px var(--shadow-color)',
    },
  },
})
