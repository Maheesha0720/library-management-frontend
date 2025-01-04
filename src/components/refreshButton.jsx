import React from 'react'

export default function refreshButton() {
    const refreshPage = () => {
        setRefresh((prev) => !prev);
      };
  return (
    
    <div>
        <button onClick={refreshPage} className="btn-refresh"><img src={iconRefresh} alt="."  style={{width:"20px"}}/> Refresh Data</button>
    </div>
  )
}
