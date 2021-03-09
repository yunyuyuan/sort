import IconSvg from '@/icons/IconSvg'

// register globally
export function registerIconSvgComponent(app) {
  app.component('svg-icon', IconSvg)
}