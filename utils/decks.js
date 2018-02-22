import { AsyncStorage } from 'react-native'
import initialDeckData from '../config/initialState'


export const STORAGE_KEY = 'RS:fuck'

function setDummyData () {
   // const { run, bike, swim, sleep, eat } = getMetricMetaInfo()
    let dummyData = initialDeckData
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData))
    return dummyData
}

export function formatDeckResults (results) {
    return results === null
      ? setDummyData()
      : JSON.parse(results)
}