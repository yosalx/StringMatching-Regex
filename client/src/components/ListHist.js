import React from 'react'
import ElmtHist from './ElmtHist'

const ListHist = ({ logList }) => {
  return (
    <>
        {logList.map((log, index) => (
            <ElmtHist key={index} log={log} />
        ))}
    </>
  )
}

export default ListHist