import React, { useEffect, useState } from 'react'

const Datatable = ({ data }) => {
  // const [dataPeoples, setPeoples] = useState([]);
  useEffect(() => {
    console.log(data);
    console.log(data[0]);
    console.log(columns);
    // const fetchedData = async()=>{
    //   setPeoples
    // }
  })

  const columns = data[0] && Object.keys(data[0])
  return (
    <table cellPadding={0} cellSpacing={0} >
      <thead>
        <tr> {data[0] && columns.map((heading, i) => <th key={i} >{heading} </th>)} </tr>
      </thead>
      <tbody>
        {data.map((row, i) => <tr key={i} >

          {
            columns.map((column, i) => <td className={`${row[column]} ${row} ${column}`} key={i} >{row[column]} </td>)
          }
        </tr>)}
      </tbody>
    </table>
  )
}

export default Datatable
