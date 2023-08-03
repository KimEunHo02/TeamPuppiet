import React from 'react'

const Boxs = (boxs) => {

    const Box = {
        border: '2px solid white',
        weight: '1920px',
        height: '100px',
        padding: '20px',
        backgroundColor: 'lightgray',
        textAlign: 'center'
    }

    const box1 = {

      border: '3px solid #cccccc',
      borderRadius: '10px',
      margin: '0 auto',
      padding: '20px',
      textAlign: 'justify',
      fontSize: '19px'
    }

    const box2 = {
      border: '3px solid #cccccc',
      margin: '0 auto',
      padding: '20px',
      textAlign: 'center',
      fontSize: '19px',
      fontWeight: 'bold'
  
    }

  return (
    <div style = {Box}></div>
  )
}

export default Boxs