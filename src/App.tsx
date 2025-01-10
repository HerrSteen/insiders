import './App.css'
import Editor from './editor/Editor'
import Insiders from './Insiders/Insiders'

const getRoute = () => {
  // save this for when we will use router
  const [_, pathname, param] = window.location.pathname.split("/")

  if (pathname === 'editor') {
    return <Editor urlParam={param} />
  }
  return <Insiders />
}

const App: React.FC = () => {
  return getRoute()
}

export default App
