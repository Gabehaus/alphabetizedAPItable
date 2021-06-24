import React, { useEffect } from "react"

const Flattener = ({ data, headers }) => {
  useEffect(() => {
    // console.log("booby", data[0])

    function flattenData(arr) {
      Object.keys(arr).map(key => {
        if (typeof arr[key] == "string") {
          return <td>{arr[key]}</td>
        } else {
          flattenData(arr[key])
        }
        return null
      })
    }

    // flattenData(data[0])
  })

  return <tr>{data ? data.map((arr, index) => {}) : null}</tr>
}

export default Flattener
