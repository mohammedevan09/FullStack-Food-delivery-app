import React from 'react'
import { Dna } from 'react-loader-spinner'

const MainLoader = () => {
  return (
    <div className="flex items-center justify-center container">
      <Dna
        visible={true}
        height="230"
        width="230"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  )
}

export default MainLoader
