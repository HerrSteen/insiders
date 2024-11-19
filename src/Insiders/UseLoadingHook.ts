import axios from 'axios'
import { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { updateInsiders } from './insidersSlice'
import { LoadingStatus } from './InsiderTypes'

const useLoadingHook = (url: string): LoadingStatus => {
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.NOT_LOADED)
  const dispatch = useDispatch()

  useEffect(() => {
    const loadInsiders = async () => {
      try {
        const { data } = await axios(url)
        setStatus(LoadingStatus.LOADED)
        dispatch(updateInsiders(data))
        console.log("Loaded")
      } catch (e) {
        console.error("Loading insiders", e)
        setStatus(LoadingStatus.FAILED)
      }
    }

    loadInsiders();
    const loadingInterval = setInterval(loadInsiders, 3000);

    return () => clearInterval(loadingInterval);
  }, [dispatch, url])

  return status
}

export default useLoadingHook
