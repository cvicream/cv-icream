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
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 cursor-pointer'],
    ['btn-radio', 'w-6 h-6 appearance-none border border-blacks-70 rounded-full bg-clip-content p-[3px] m-0 checked:bg-primary-70 cursor-pointer'],
    ['btn-header', 'flex inline-block w-12 h-12 p-2 bg-white rounded-full shadow-custom'],
    ['icon-header', 'inline-block w-8 h-8 text-blacks-70 cursor-pointer'],
    ['icon-48', 'w-12 h-12 text-blacks-70'],
    ['icon-32', 'w-8 h-8 text-blacks-70'],
    ['icon-24', 'w-6 h-6 text-blacks-40 hover:text-blacks-70'],
    ['btn-toolbar', 'flex justify-center items-center text-blacks-70 hover:bg-primary-10 hover:rounded-full'],
    ['btn-group-toolbar', 'flex justify-center items-center gap-2 bg-white rounded-[69px] shadow-custom px-2 py-2'],
    ['hashtag', 'px-2 py-1 font-gill-sans font-normal text-11 leading-[13px] rounded'],
    ['heading-default', 'font-gill-sans font-normal text-4xl leading-[41px]'],
    ['title-default', 'font-gill-sans font-normal text-sm leading-4'],
    ['subtitle-default', 'font-gill-sans font-normal text-11 leading-[13px]'],
    ['paragraph-default', 'font-gill-sans font-normal text-10 leading-[13px]'],
    ['heading-large', 'font-gill-sans font-normal text-4xl leading-[41px]'],
    ['title-large', 'font-gill-sans font-normal text-base leading-[19px]'],
    ['subtitle-large', 'font-gill-sans font-normal text-sm leading-4'],
    ['paragraph-large', 'font-gill-sans font-normal text-xs leading-[14px]'],
    ['h1', 'font-mark font-normal text-6xl leading-[78px]'],
    ['h1-mobile', 'font-mark font-normal text-40 leading-[52px]'],
    ['h2', 'font-mark font-normal text-32 leading-[44px]'],
    ['leading', 'font-mark font-normal text-xl leading-[24px]'],
    ['subleading', 'font-mark font-normal text-lg leading-[22px]'],
    ['paragraph', 'font-mark font-normal text-base leading-[22px]'],
    ['note', 'font-mark font-normal text-sm leading-[18px]'],
    ['form-label', 'font-normal text-sm text-blacks-70 leading-[1.125rem] block'],
    ['form-input', 'w-full h-[46px] bg-white rounded-xl outline-none font-normal text-base text-blacks-100 disabled:text-blacks-40 placeholder-blacks-40 focus:placeholder-transparent mt-1 pl-4 pr-2 py-3 border-1 border-transparent hover:border-blacks-100 hover:disabled:border-white focus:text-blacks-100'],
    ['form-textarea', 'w-full h-[130px] bg-white rounded-xl outline-none font-normal text-base text-blacks-100 resize-none disabled:text-blacks-40 placeholder-blacks-40 focus:placeholder-transparent mt-1 px-4 py-3 border-1 border-white hover:border-blacks-100 hover:disabled:border-white focus:text-blacks-100'],
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
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
  theme: {
    fontSize: {
      10: '10px',
      11: '11px',
      32: '32px',
      40: '40px',
    },
    colors: {
      primary: { // class="text-primary-100"
        10: '#fef4f1',
        20: '#fce8e1',
        40: '#fad1c4',
        70: '#f6af98',
        100: '#f18b6b',
      },
      blacks: { // class="text-blacks-100"
        10: 'rgba(34, 34, 34, 0.1)',
        20: '#d3d3d3',
        40: '#a7a7a7',
        70: '#656565',
        100: '#222222',
      },
      success: '#72b355',
      warning: '#de6d6d',
    },
    boxShadow: {
      custom: '2px 2px 10px rgba(241, 139, 107, 0.2)',
    },
  },
})
