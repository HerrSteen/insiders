//import localStorage from '../localStorage'
//import wordDB from './wordDB.json'

declare global {
  interface Window {
    words: string[];
  }
}

let words: string[] = []
//const savedWords = localStorage.loadWordDB()
const savedWords: string[] = []


words = [...savedWords]
window.words = words
// localStorage.setWordDB([])

const buildRegExp = (word) => {
  if (word.length === 1) {
    return `^[${word}].*`
  }

  const wordArr = word.split('').slice(1)
  const inner = wordArr.map((c) => `.*[${c}]`)
  return `^[${word[0]}]${inner.join('')}`
}

export const filterWords = (word: string) => {
  const regexpStr = buildRegExp(word)
  const reg = new RegExp(regexpStr, 'i')

  return words
    .filter((x) => {
      return reg.test(x.word)
    })
    .sort((a, b) => {
      if (a.count < b.count) return 1
      if (a.count > b.count) return -1
      return 0
    })
    .map((x) => x.word)
}

export const findWord = word => {
  return words.find(x => x.word === word)
}

export const getWordSuggestions = (word: string) => {
  word = word.toLowerCase()
  return filterWords(word).splice(0, 1)
}

export const getInsertableWord = (word) => {
  word = word.toLowerCase()

  const z = filterWords(word)
  if (!z.length) return null
  return [z[0]]
}

export const addWord = word => {
  if (!word || word === '' || word.length <= 2) return
  word = word.toLowerCase()
  const w = findWord(word)

  if (w) {
    w.count++
    return
  }

  words.push({
    word,
    count: 1
  })
}
