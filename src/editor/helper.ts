import axios from 'axios'

export const setFocusClass = (element: Element, selectedElement: HTMLElement | ParentNode) => {
  for (const child of element.children) {
    if (child === selectedElement) {
      child.classList.add('focus')
    } else {
      child.classList.remove('focus')
    }
  }
}

export const countWords = (element: HTMLElement): number => {
  let wordCount = 0
  for (const child of element.children) {
    wordCount += child.innerHTML
      .trim()
      .split(' ')
      .filter((el: string) => {
        return el !== '<br>'
      }).length
  }

  return wordCount
}

export const saveEditor = (element: HTMLElement, urlParam: string): void => {
  axios.post(`/api/save-editor/${urlParam}`, { content: element.innerHTML })
}

import { AxiosResponse } from 'axios'

export const loadEditor = (urlParam: string): Promise<AxiosResponse> => {
  return axios.get(`/api/load-editor/${urlParam}`)
}

// Deprecated
export const setCarretAtPosition = (element: HTMLElement, pos: number): void => {
  console.log(pos);

  const as = element.getElementsByClassName('editor__line')[0]
  if (!as) return
  const range = document.createRange()

  const sel = window.getSelection()
  if (!sel) return

  range.setStart(as, pos)
  range.collapse(true)
  sel.removeAllRanges()
  sel.addRange(range)
}

export const setCarretAtEnd = (editor: HTMLElement) => {
  const range = document.createRange()
  range.selectNodeContents(editor)
  range.collapse(false)
  const selection = window.getSelection()
  if (!selection) return

  selection.removeAllRanges()
  selection.addRange(range)
}
