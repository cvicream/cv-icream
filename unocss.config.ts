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
    ['heading1-mobile', 'font-mark font-normal text-40 leading-[3.25rem]'],
    ['heading2', 'font-mark font-normal text-32 leading-[2.75rem]'],
    ['leading', 'font-mark font-normal text-xl leading-[1.5rem]'],
    ['subleading', 'font-mark font-normal text-lg leading-[1.375rem]'],
    ['paragraph', 'font-mark font-normal text-base leading-[1.375rem]'],
    ['note', 'font-mark font-normal text-sm leading-[1.125rem]'],
    ['btn-primary', 'h-12 px-10 py-3 rounded-xl text-white bg-primary-100 border-1 border-transparent transition duration-300 ease-out hover:border-primary-20'],
    ['btn-secondary', 'h-12 px-10 py-3 rounded-xl text-blacks-100 bg-white border-1 border-primary-100 transition duration-300 ease-out hover:bg-primary-10'],
    ['btn-icon-48', 'w-12 h-12 p-2 rounded-full text-blacks-70 bg-white shadow-custom hover:bg-primary-10'],
    ['btn-icon-48-fill', 'w-12 h-12 p-[calc(0.5rem-1px)] rounded-full text-white bg-primary-100 shadow-custom border-1 border-transparent hover:border-primary-20'],
    ['btn-icon-32', 'w-8 h-8 p-1 text-blacks-70 rounded-full hover:bg-primary-10'],
    ['btn-icon-24', 'w-6 h-6 text-blacks-40 hover:text-blacks-70'],
    ['icon-32', 'w-8 h-8 block text-blacks-70'],
    ['icon-32-fill', 'w-8 h-8 block text-white'],
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 cursor-pointer'],
    ['btn-radio', 'w-6 h-6 appearance-none border border-blacks-70 rounded-full bg-clip-content p-1 checked:bg-primary-70 cursor-pointer'],
    ['btn-header', 'flex inline-block w-12 h-12 p-2 bg-white rounded-full shadow-custom'],
    ['icon-24', 'w-6 h-6 text-blacks-40 hover:text-blacks-70'],
    ['btn-toolbar', 'flex justify-center items-center text-blacks-70 hover:bg-primary-10 hover:rounded-full'],
    ['btn-group-toolbar', 'flex justify-center items-center gap-2 bg-white rounded-[69px] shadow-custom px-2 py-2'],
    ['hashtag', 'px-2 py-1 font-normal text-11 leading-[13px] rounded'],
    ['heading-default', 'font-normal text-4xl leading-[41px]'],
    ['title-default', 'font-normal text-14 leading-[1.125rem]'],
    ['subtitle-default', 'font-normal text-11 leading-[0.8125rem]'],
    ['paragraph-default', 'font-normal text-10 leading-[0.8125rem]'],
    ['heading-large', 'font-normal text-4xl leading-[41px]'],
    ['title-large', 'font-normal text-base leading-[1.1875rem]'],
    ['subtitle-large', 'font-normal text-14 leading-[1.125rem]'],
    ['paragraph-large', 'font-normal text-xs leading-[0.875rem]'],
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
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
  theme: {
    fontSize: {
      10: '0.625rem',
      11: '0.6875rem',
      12: '0.75rem',
      13: '0.8125rem',
      14: '0.8750rem',
      15: '0.9375rem',
      16: '1rem',
      17: '1.0625rem',
      18: '1.125rem',
      19: '1.1875rem',
      32: '32px',
      40: '40px',
      // titleDefault: ['0.8750rem', '1.125rem'],
      // subtitleDefault: ['0.6875rem', '0.8125rem'],
      // paragraphDefault: ['0.625rem', '0.8125rem'],
      // titleLarge: ['1rem', '1.1875rem'],
      // subtitleLarge: ['0.8750rem', '1.125rem'],
      // paragraphLarge: ['0.750rem', '0.875rem'],
    },
    colors: {
      primary: { // class="text-primary-100"
        10: 'var(--secondary-color)',
        20: '#fce8e1',
        40: '#fad1c4',
        70: '#f6af98',
        100: 'var(--primary-color)',
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
      custom: '2px 2px 10px var(--shadow-color)',
    },
  },
})
