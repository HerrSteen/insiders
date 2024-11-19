import "./style.scss"
import { useSelector } from 'react-redux'
import { selectInsiders } from './insidersSlice'
import useLoadingHook from './UseLoadingHook'
import { Insider, LoadingStatus } from './InsiderTypes'
import { useEffect, useState } from "react"
import { notify } from "./notify"

const TableHead = () => {
  return (
    <thead>
      <tr>
        <td>Datum</td>
        <td>Insturment</td>
        <td>Person</td>
        <td>Titel</td>
        <td>Typ</td>
        <td>Instrumenttyp</td>
        <td>Valuta</td>
        <td>Pris</td>
        <td>Volym</td>
        <td>Total</td>
      </tr>
    </thead>)
}

const createRow = (insider: Insider) => {
  return (
    <tr key={insider.date + insider.instrumentName}>
      <td>{insider.date}</td>
      <td>{insider.instrumentName}</td>
      <td>{insider.person}</td>
      <td>{insider.title}</td>
      <td>{insider.type}</td>
      <td>{insider.instrumentType}</td>
      <td>{insider.currency}</td>
      <td>{insider.price}</td>
      <td>{insider.volume}</td>
      <td>{insider.totalCost}</td>
    </tr>
  )
}

const Insiders: React.FC = () => {
  const status = useLoadingHook("http://localhost:3000/api/get-insiders")
  const insidersList = useSelector(selectInsiders)
  const [nameOfFirstInsider, setNameOfFirstInsider] = useState("")

  useEffect(() => {
    if (!insidersList?.length) return

    const [firstInsider] = insidersList

    const newPerson = firstInsider.person
    console.log("newPerson", newPerson, nameOfFirstInsider)
    if (newPerson !== nameOfFirstInsider) {
      setNameOfFirstInsider(newPerson)

      const header = newPerson
      const body = firstInsider.instrumentName
      notify(header, body)
    }
  }, [insidersList, nameOfFirstInsider])


  if (status === LoadingStatus.FAILED) return <p>Something is not what it should be!</p>
  if (status === LoadingStatus.LOADING) return <p>Loading insiders!</p>
  if (status === LoadingStatus.NOT_LOADED) return <p>Waiting for Loading to start!</p>

  return (
    <div className="insiders">
      <table>
        <TableHead />
        <tbody>
          {insidersList.map((insider: Insider) => {
            return createRow(insider)
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Insiders
