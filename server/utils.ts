
const insertSpaceToString = (insertIndex: number, stringToInsertTo: string) => {
  const firstPart = stringToInsertTo.substring(0, insertIndex)
  const secondPart = stringToInsertTo.substring(insertIndex, stringToInsertTo.length)
  return `${firstPart} ${secondPart}`
}

// Download number format library...
export const formatStringAsCurrency = (numberToFormat: string | number): string => {
  if (!numberToFormat) {
    return ""
  }

  // Bättre kan jag än denna kod
  if (typeof numberToFormat === "number") {
    numberToFormat = numberToFormat.toString()
  }

  if (numberToFormat.length === 8) {
    const returnValue = insertSpaceToString(5, numberToFormat)
    return insertSpaceToString(2, returnValue)
  }

  if (numberToFormat.length === 7) {
    return insertSpaceToString(4, numberToFormat)
  }

  if (numberToFormat.length === 6) {
    return insertSpaceToString(3, numberToFormat)
  }

  if (numberToFormat.length === 5) {
    return insertSpaceToString(2, numberToFormat)
  }

  return numberToFormat
}

export const formatString = (stringToFormat: string): string => {
  return stringToFormat.replace(/&#xF6;/g, "ö")
    .replace(/&#xE4;/g, "ä")
    .replace(/&#xE9;/g, "å")
    .replace(/&#xC5;/g, "å")
    .replace(/&#xC5;/g, "å")
    .replace(/&#xE5;/g, "å")
    .replace(/&#xA0;/g, " ")
    .replace(/&amp;/g, "&")


    .replace(",", ".")
    .replace(/&nbsp;/g, "")
    .trim()
}
