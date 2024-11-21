import axios from "axios"
import * as cheerio from "cheerio"
import { Context, Row } from "./insiderTypes"
import { formatString, formatStringAsCurrency } from "../utils"

const splitTableRows = (stringToFormat: string) => {
  return stringToFormat.replace(/<\/th>/g, "")
    .replace(/<\/td>/g, "")
    .split("<td>")
}

const formatTableRows = (entries: string[]) => {
  return entries.map(i => {
    return formatString(i)
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
      person: "aa" + formatedRows[3],
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
