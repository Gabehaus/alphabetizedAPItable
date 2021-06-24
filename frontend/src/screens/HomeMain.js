import React, { useEffect, useState } from "react"

import axios from "axios"

import Flattener from "../components/Flattener"

const HomeMain = () => {
  // const [data, setData] = useState("")
  const [flattenedHeaders, setFlattenedHeaders] = useState([])
  const [locationArray, setLocationArray] = useState([])

  useEffect(() => {
    function makeLocationArray(arr) {
      arr.map(thing => {
        setLocationArray(prevLoc => [...prevLoc, thing.location])
        return null
      })

      // console.log("locArr ", locationArray)
    }

    function getData() {
      axios
        .get("https://randomuser.me/api/?results=20")
        .then(res => {
          // setData(res.data.results)
          makeLocationArray(res.data.results)
        })
        .catch(err => console.log("error", err))
    }

    getData()
  }, [])

  useEffect(() => {
    function flattenData(arr) {
      Object.keys(arr).map(key => {
        if (typeof arr[key] !== "object") {
          setFlattenedHeaders(prev => [...prev, key])
        } else {
          flattenData(arr[key])
        }
        return null
      })
    }

    if (locationArray.length === 20) {
      flattenData(locationArray[1])
    }
  }, [locationArray])

  useEffect(() => {
    console.log("flattenedHeaders", flattenedHeaders)
  }, [flattenedHeaders])

  return flattenedHeaders && locationArray ? (
    <table>
      <tbody>
        <tr>
          {flattenedHeaders.map(elem => {
            return <th key={elem}>{elem}</th>
          })}
        </tr>
        <Flattener data={locationArray} headers={flattenedHeaders} />
      </tbody>
    </table>
  ) : (
    <div>no data</div>
  )
}

export default HomeMain
