import { useEffect, useState } from 'react'
import Toolbar from "./Toolbar"
import Wordbar from "./WordBar"
import { setFocusClass, countWords, setCarretAtEnd, saveEditor, loadEditor } from "./helper"
import "./style/editor-main.scss"
// import { useDispatch, useAppDispatch } from '../hooks';
import { selectTheme, selectIsReadMode, setWordCount, selectShowSendItIcon } from './editorSlice'
import { addWord, getWordSuggestions } from './wordibase'
import { useDispatch, useSelector } from 'react-redux'
import SendIt from './SendIt'

let previosKeyDown: string
let editor: HTMLElement
let selectedWord: string

const onMouseUp = () => {
  const selectedElement = window?.getSelection()?.focusNode?.parentNode
  if (!selectedElement) return

  setFocusClass(editor, selectedElement)
}

window.onkeydown = ({ key }) => {
  // if (previosKeyDown === 'Control' && key === 'Backspace') {
  //   resetEditor()
  // }
  if (!selectedWord) return

  if (key === 'Control') {
    console.log(selectedWord)
    const selectedElement = window?.getSelection()?.focusNode?.parentNode as HTMLElement
    const str = (selectedElement!.textContent as string).trim()
    const items = str.split(' ')

    if (!items.length || !selectedElement) return

    const replaceWord = selectedWord
    if (replaceWord && replaceWord.length) {
      items[items.length - 1] = replaceWord
    }

    console.log("items", items)

    selectedElement.innerHTML = `${items.join(' ')}&nbsp;`
    setCarretAtEnd(selectedElement)
  }

  if (previosKeyDown === 'Control' && key === 'Enter') {
    setCarretAtEnd(editor)
  }

  previosKeyDown = key
}

interface Props {
  urlParam: string | null;
}

const Editor = ({ urlParam }: Props) => {
  const dispatch = useDispatch();
  const isReadMode = useSelector(selectIsReadMode);
  const theme = useSelector(selectTheme);
  const showSendItIcon = useSelector(selectShowSendItIcon);

  const [suggestedWord, setSuggestedWord] = useState<string>('');

  const onKeyDown = (evt: React.SyntheticEvent) => {
    const target = evt.target as HTMLElement;

    const selectedElement = window?.getSelection()?.focusNode?.parentNode as HTMLElement
    if (!selectedElement) return

    setFocusClass(target, selectedElement)

    const str = selectedElement.innerHTML.replace(/&nbsp;/g, '')
    const items = str.split(' ')
    console.log("....", getWordSuggestions(items[items.length - 1]))
    selectedWord = getWordSuggestions(items[items.length - 1])
    setSuggestedWord(selectedWord)
  }

  const sendWordsToTb = () => {
    editor.childNodes.forEach(item => {
      item.childNodes.forEach(() => {
        const txtArr = (item as HTMLElement).innerHTML.replace(/&nbsp;/g, '').split(' ')
        txtArr.forEach((w) => {
          if (!w.match(/[?.!,<]/)) {
            console.log("w", w)
            addWord(w)
          }
        })
      })
    })
  }

  const resetEditor = () => {
    sendWordsToTb()
    const newWords = countWords(editor)
    dispatch(setWordCount(newWords));
    editor.innerHTML = '<div class="editor__line">&nbsp</div>'
    setCarretAtEnd(editor)
  }

  const saveEditorFn = urlParam ? () => saveEditor(editor, urlParam) : null;

  useEffect(() => {
    editor.innerHTML = '<div class="editor__line">&nbsp</div>'

    if (urlParam) loadEditor(urlParam).then(({ data }) => editor.innerHTML = data)
  }, [urlParam])

  const themeClass = theme === 'dark' ? '' : 'theme-white'
  const readModeClass = isReadMode ? ' readMode' : ''

  if (showSendItIcon) {
    return (<div className="editor-container">
      <SendIt />
    </div >)
  }

  return (
    <div className="editor-container">
      <div className={`${themeClass} wrapper`}>
        <Wordbar suggestedWord={suggestedWord} />
        <div className={`editor ${readModeClass}`}>
          <div
            className="editor__page"
            contentEditable="true"
            spellCheck="false"
            suppressContentEditableWarning={true}
            ref={node => {
              editor = node as HTMLElement
            }}
            onKeyDown={(e) => {
              onKeyDown(e)
            }}
            onMouseUp={onMouseUp}
          >
            <div className="editor__line"> </div>
          </div>
        </div>
        <Toolbar saveEditor={saveEditorFn} onResetClick={resetEditor} />
      </div>
    </div>
  )
}

export default Editor
