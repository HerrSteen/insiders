export const getWordCount = (): number => {
  const value = localStorage.getItem('wordCount')
  if (!value) return 0
  return Number(value)
}

const setWordCount = (value: number) => {
  const convertedValue = value.toString()
  localStorage.setItem('wordCount', convertedValue)
}

const loadWordDB = (): string[] => {
  const value = localStorage.getItem('wordDB')
  if (!value) return []
  return JSON.parse(value)
}

const setWordDB = (value: string): void => {
  value = JSON.stringify(value)
  localStorage.setItem('wordDB', value)
}

const setValue = (key: string, value: string): void => {
  value = JSON.stringify(value)
  localStorage.setItem(key, value)
}

const getValue = (key: string): string => {
  const value = localStorage.getItem(key)
  if (!value) return ""
  return JSON.parse(value)
}

export default {
  getValue,
  setValue,
  getWordCount,
  setWordCount,
  loadWordDB,
  setWordDB,
}
