import axios from "axios"
import * as cheerio from "cheerio"
import { Context, Row } from "./insiderTypes"

const insertSpaceToString = (insertIndex: number, stringToInsertTo: string) => {
  const firstPart = stringToInsertTo.substring(0, insertIndex)
  const secondPart = stringToInsertTo.substring(insertIndex, stringToInsertTo.length)
  return `${firstPart} ${secondPart}`
}

const formatStringAsCurrency = (numberToFormat: string | number): string => {
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

const splitTableRows = (stringToFormat: string) => {
  return stringToFormat.replace(/<\/th>/g, "")
    .replace(/<\/td>/g, "")
    .split("<td>")
}

const formatTableRows = (entries: string[]) => {
  return entries.map(i => {
    return i.replace(/&#xF6;/g, "ö")
      .replace(/&#xE4;/g, "ä")
      .replace(/&#xE9;/g, "å")
      .replace(/&#xC5;/g, "å")
      .replace(/&#xC5;/g, "å")
      .replace(/&#xE5;/g, "å")
      .replace(/&#xA0;/g, " ")
      .replace(",", ".")
      .replace(/&nbsp;/g, "")
      .trim()
  })
}

export const insidersController = async (ctx: Context): Promise<void> => {
  const response = await axios("https://marknadssok.fi.se/publiceringsklient");
  const { data } = response;
  const $ = cheerio.load(data);
  const mainTable = $(".table tr");

  const rows: Row[] = [];

  mainTable.each((index, item) => {
    const tableRows = splitTableRows($(item).html() as string);
    const formatedRows = formatTableRows(tableRows)
    const volumeForCalculation = formatedRows[11] ? formatedRows[11].replace(" ", "") : ""
    const orderCost = Math.floor(Number(volumeForCalculation) * Number(formatedRows[13]));

    const row = {
      date: formatedRows[1],
      instrumentName: formatedRows[2],
      person: formatedRows[3],
      title: formatedRows[4],
      type: formatedRows[6],
      instrumentType: formatedRows[8],
      volume: formatStringAsCurrency(formatedRows[11]),
      price: formatedRows[13],
      currency: formatedRows[14],
      totalCost: formatStringAsCurrency(orderCost),
    }

    rows.push(row)
  })

  rows.shift()

  const filteredRows = rows.filter(r => {
    return r.type === "Förvärv" || r.type === "Avyttring"
  })

  ctx.body = filteredRows
}
