import './App.css'
import Insiders from './Insiders/Insiders'

const getRoute = () => {
  // save this for when we will use router
  // const [_, pathname, param] = window.location.pathname.split("/")
  return <Insiders />
}

const App: React.FC = () => {
  return getRoute()
}

export default App
